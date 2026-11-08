# 🗄️ MiCampus · Arquitectura del Sistema de Datos (`/data`)

Este directorio centraliza todos los modelos, materias, lecciones y fuentes del campus agrupados por dominio de forma modular y descriptiva.

---

## 🗂️ Estructura de Directorios

```text
public/data/
├── README.md                      <-- Arquitectura del sistema de datos
│
├── ioc/                           <-- [1] Ecosistema IOC DAW Oficial
│   │
│   ├── gestion/                   <-- Fichas de gestión administrativa de cada materia (landing, EACs, profesores)
│   │   ├── ent.json               (Entornos de Desarrollo)
│   │   ├── desp.json              (Despliegue de Aplicaciones Web)
│   │   ├── digi.json              (Digitalización Aplicada)
│   │   ├── int.json               (Diseño de Interfaces Web)
│   │   └── ipo2.json              (Itinerario Personal para la Empleabilidad II)
│   │
│   └── lecciones/                 <-- Libros y temarios teóricos completos (scroll infinito)
│       ├── entornos.json          (Teoría completa de ENT)
│       ├── despliegue.json        (Teoría completa de DESP)
│       ├── digitalizacion.json    (Teoría completa de DIGI)
│       ├── interfaces.json        (Teoría completa de INT)
│       └── ipo2_curso.json        (Teoría completa de IPO2)
│
├── extra/                         <-- [2] Cursos y Materias Complementarias (No IOC)
│   ├── springboot_guia.json       (Manual Enterprise & Lecciones de Spring Boot)
│   ├── php_sql_course.json        (Campus SEPE: Certificado PHP & SQL)
│   ├── python_basics.json         (SEPE: Machine Learning & Python Básico)
│   └── plan_tutorias.json         (Accenture: Plan y Calendario de Tutorías)
│
├── calendars/                     <-- [3] Sistema Centralizado de Calendarios (.ics)
│   ├── source/                    (Fuentes individuales: ACC, ENT, DES, DIG, etc.)
│   └── exports/                   (HUB_PERSONALIZADO.ics, calendario_miCampus.ics, todo.ics)
│
├── tasks.json                     <-- To-Do Global, radar de entregas y fechas límite
└── search_index.json              <-- Índice global para el buscador modal (Ctrl+K)
```

---

## 🎯 Principio de Única Fuente de Verdad (Single Source of Truth)
* **Cero archivos sueltos ni duplicados:** Cada modelo de datos reside exclusivamente en su carpeta correspondiente.
* **Fichas de Gestión IOC:** `/data/ioc/gestion/` contiene la configuración administrativa, profesorado y entregas EAC.
* **Temarios Curriculares IOC:** `/data/ioc/lecciones/` contiene el contenido lectivo y teórico completo.
* **Cursos Complementarios:** `/data/extra/` contiene los cursos y guías externas (SEPE, Spring Boot, Tutorías).
* **Calendarios:** `/data/calendars/exports/` contiene las exportaciones .ics unificadas.
