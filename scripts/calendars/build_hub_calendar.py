"""
============================================================================
@package     MiCampus.Calendars
@module      BuildHubCalendar
@description Generador y limpiador de calendarios unificados iCalendar (.ics).
             - Lee todos los archivos .ics de data/calendars/source/
             - Filtra automáticamente eventos de ruido ("Inicio EAC", "Publicación enunciado", "Apertura")
             - Elimina duplicados por UID
             - Exporta calendario_miCampus.ics listo para descargar desde la web o sincronizar en Mac
============================================================================
"""

import re
from pathlib import Path

NOISE_PATTERNS = [
    r'Inicio\s+EAC',
    r'Inicio\s+PEC',
    r'Inicio\s+EAF',
    r'Inicio\s+Quiz',
    r'Publicaci[oó]n\s+del\s+enunciado',
    r'Apertura\s+del\s+Quiz',
    r'Obertura',
    r'Inici\s+EAC',
    r'Inici\s+PEC',
]

def is_noise_event(event_block: str) -> bool:
    summary_match = re.search(r'SUMMARY:([^\r\n]+)', event_block, re.IGNORECASE)
    summary = summary_match.group(1) if summary_match else ''
    for pat in NOISE_PATTERNS:
        if re.search(pat, summary, re.IGNORECASE):
            return True
    return False

def build_hub_calendar():
    project_root = Path(__file__).resolve().parents[2]
    source_dir = project_root / 'data' / 'calendars' / 'source'
    source_dir.mkdir(parents=True, exist_ok=True)

    output_dir = project_root / 'data' / 'calendars' / 'exports'
    output_dir.mkdir(parents=True, exist_ok=True)

    spa_output_dir = project_root / 'public' / 'data' / 'calendars' / 'exports'
    spa_output_dir.mkdir(parents=True, exist_ok=True)

    output_files = [
        output_dir / 'calendario_miCampus.ics',
        output_dir / 'HUB_PERSONALIZADO.ics',
        output_dir / 'todo.ics',
        spa_output_dir / 'calendario_miCampus.ics',
        spa_output_dir / 'HUB_PERSONALIZADO.ics',
        spa_output_dir / 'todo.ics'
    ]

    all_events = []
    seen_uids = set()
    removed_noise = 0

    for filepath in sorted(source_dir.glob('*.ics')):
        try:
            content = filepath.read_text(encoding='utf-8', errors='ignore')
        except Exception as e:
            print(f"Error leyendo {filepath.name}: {e}")
            continue

        events = re.findall(r'BEGIN:VEVENT[\s\S]*?END:VEVENT', content)
        for ev in events:
            if is_noise_event(ev):
                removed_noise += 1
                continue

            uid_match = re.search(r'UID:([^\r\n]+)', ev)
            uid = uid_match.group(1).strip() if uid_match else None

            if uid and uid in seen_uids:
                continue
            if uid:
                seen_uids.add(uid)

            all_events.append(ev)

    header = """BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MiCampus//Calendario Unificado IOC-UOC//ES
X-WR-CALNAME:🎯 Calendario MiCampus
X-WR-CALDESC:Calendario Unificado de MiCampus (IOC / UOC) sin fechas de ruido, con colores por asignatura y alertas.
X-WR-TIMEZONE:Europe/Madrid
CALSCALE:GREGORIAN
"""

    footer = "\nEND:VCALENDAR\n"
    final_content = header + "\n" + "\n".join(all_events) + footer

    for out_file in output_files:
        out_file.write_text(final_content, encoding='utf-8')

    print(f"✅ Calendario MiCampus compilado: {len(all_events)} eventos útiles ({removed_noise} eventos de 'Inicio/Apertura' eliminados).")

if __name__ == '__main__':
    build_hub_calendar()
