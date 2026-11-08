/**
 * ============================================================================
 * @package     MiCampus.Backend
 * @module      Server
 * @description Servidor API ligero para la gestión de entregas (IOC y UOC),
 *              copias de seguridad en local y generación automática del calendario .ics.
 * ============================================================================
 */

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    name: 'MiCampus API (IOC & UOC)',
    status: 'ok',
    frontend: 'http://localhost:5173',
    endpoints: ['/api/eac/status', '/api/upload/:subjectId']
  });
});

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const IOC_SUBJECTS_DIR = path.join(PUBLIC_DIR, 'data', 'ioc', 'gestion');
const UOC_SUBJECTS_DIR = path.join(PUBLIC_DIR, 'data', 'uoc', 'gestion');
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');
const CALENDARS_PUBLIC_DIR = path.join(PUBLIC_DIR, 'data', 'calendars', 'exports');
const CALENDARS_ROOT_DIR = path.join(__dirname, '..', 'data', 'calendars', 'exports');

[IOC_SUBJECTS_DIR, UOC_SUBJECTS_DIR, UPLOADS_DIR, CALENDARS_PUBLIC_DIR, CALENDARS_ROOT_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subjectId = req.params.subjectId;
    const dest = path.join(UPLOADS_DIR, subjectId);
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

function findSubjectFile(subjectId) {
  const iocPath = path.join(IOC_SUBJECTS_DIR, `${subjectId}.json`);
  if (fs.existsSync(iocPath)) return iocPath;
  const uocPath = path.join(UOC_SUBJECTS_DIR, `${subjectId}.json`);
  if (fs.existsSync(uocPath)) return uocPath;
  return null;
}

function generateCalendar() {
  let icsContent = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//MiCampus//NONSGML v1.0//EN\r\n`;

  [IOC_SUBJECTS_DIR, UOC_SUBJECTS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    files.forEach(file => {
      const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf-8'));
      const subjectId = (data.id || '').toUpperCase();

      (data.eacs || []).forEach(eac => {
        if (eac.status === 'pending' && eac.dueDate) {
          const dateStr = eac.dueDate.replace(/-/g, '');
          icsContent += `BEGIN:VEVENT\r\n`;
          icsContent += `UID:${eac.id}-${data.id}@micampus.local\r\n`;
          icsContent += `DTSTAMP:20261006T000000Z\r\n`;
          icsContent += `DTSTART;VALUE=DATE:${dateStr}\r\n`;
          icsContent += `SUMMARY:Entrega ${eac.title} [${subjectId}]\r\n`;
          icsContent += `DESCRIPTION:Entrega pendiente de ${data.title}\r\n`;
          icsContent += `STATUS:CONFIRMED\r\n`;
          icsContent += `BEGIN:VALARM\r\n`;
          icsContent += `TRIGGER:-P2D\r\n`;
          icsContent += `ACTION:DISPLAY\r\n`;
          icsContent += `DESCRIPTION:Recordatorio de entrega de ${subjectId}\r\n`;
          icsContent += `END:VALARM\r\n`;
          icsContent += `END:VEVENT\r\n`;
        }
      });
    });
  });

  icsContent += `END:VCALENDAR\r\n`;
  fs.writeFileSync(path.join(CALENDARS_PUBLIC_DIR, 'todo.ics'), icsContent);
  fs.writeFileSync(path.join(CALENDARS_ROOT_DIR, 'todo.ics'), icsContent);
}

app.post('/api/upload/:subjectId', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ message: 'Archivo subido correctamente', filename: req.file.filename });
});

app.put('/api/eac/status', (req, res) => {
  const { subjectId, eacId, status } = req.body;
  if (!subjectId || !eacId || !status) return res.status(400).json({ error: 'Faltan parámetros' });

  const filePath = findSubjectFile(subjectId);
  if (!filePath) return res.status(404).json({ error: 'Asignatura no encontrada' });

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  let found = false;

  (data.eacs || []).forEach(eac => {
    if (eac.id === eacId) {
      eac.status = status;
      found = true;
    }
  });

  if (!found) return res.status(404).json({ error: 'Entrega no encontrada' });

  const total = data.eacs.length;
  const done = data.eacs.filter(e => e.status === 'done').length;
  data.progress = total > 0 ? Math.round((done / total) * 100) : 0;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  generateCalendar();

  res.json({ message: 'Estado actualizado y calendario regenerado', progress: data.progress });
});

try {
  generateCalendar();
} catch (e) {}

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Motor de entregas activo en http://localhost:${PORT}`);
});
