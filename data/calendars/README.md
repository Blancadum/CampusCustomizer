# 📅 MiCampus · Arquitectura del Sistema de Calendarios

```java
/**
 * ============================================================================
 * @package     MiCampus.Calendars
 * @module      CalendarHub
 * @description Sistema centralizado de gestión, combinación y exportación
 *              de calendarios iCalendar (.ics) para el ecosistema MiCampus.
 *
 * @author      Blanca
 * @version     2.0.0
 * @since       2026-10-08
 * ============================================================================
 */
```

---

## 🗂️ Estructura de Directorios

```text
data/calendars/
├── README.md                          <-- Esta documentación de arquitectura
│
├── source/                            <-- [1] Fuentes individuales (.ics)
│   ├── ACC.ics                        (Accenture: Spring Boot y GenAI)
│   ├── ENT.ics                        (IOC DAW: Entornos de Desarrollo)
│   ├── DES.ics                        (IOC DAW: Despliegue de Aplicaciones Web)
│   ├── DIG.ics                        (IOC DAW: Diseño de Interfaces Web)
│   ├── INT.ics                        (IOC DAW: Desarrollo de Interfaces Web)
│   ├── IPO.ics                        (IOC DAW: Interacción Persona-Ordenador)
│   ├── SERV.ics                       (SEPE: Servidor Web PHP & SQL)
│   ├── PAFS.ics                       (IOC DAW: Proyecto Final)
│   ├── ML.ics                         (SEPE: Machine Learning & Python)
│   └── SALUD.ics                      (Módulo Transversal: Prevención y Salud)
│
└── exports/                           <-- [2] Calendarios finales exportados (.ics)
    ├── calendario_miCampus.ics        (Macro-calendario unificado con los 172 eventos)
    ├── todo.ics                       (Calendario dinámico con alarmas de EACs pendientes)
    └── HUB_PERSONALIZADO.ics          (Alias retrocompatible para links anteriores)
```

---

## ⚙️ Motores y Scripts Asociados

### 1. `scripts/calendars/build_hub_calendar.py`
* **Función:** Lee recursivamente todos los calendarios de `source/`, descarta eventos duplicados por `UID` y compila el macro-calendario **`calendario_miCampus.ics`**.
* **Destino:** Se copia tanto a `data/calendars/exports/` como a `micampus-spa/public/data/calendars/exports/` para que el botón **📅 Sincroniza** de la web lo descargue directamente.

### 2. `backend/server.js` (Micro-API Node.js)
* **Función:** Escucha las acciones del usuario en la SPA (cuando marcas una EAC como `Done`).
* **Destino:** Regenera en tiempo real **`todo.ics`** excluyendo las actividades ya entregadas para que las notificaciones del móvil/calendario de Mac se apaguen solas.

---

```java
/**
 * @typedef {Object} CalendarExport
 * @property {string} filename       - Nombre del archivo ICS
 * @property {string} path           - Ruta pública accesible vía HTTP
 * @property {number} eventCount     - Cantidad de eventos procesados
 * @property {string} frequency      - Frecuencia de actualización (Estático vs Dinámico)
 */
```
