#!/usr/bin/env bash
# ==============================================================================
# Sincronizador Automático de Calendario macOS — MiCampus (IOC & UOC)
# ==============================================================================

cd "$(dirname "$0")"

echo ""
echo "=================================================================="
echo "🎯  MICAMPUS — SINCRONIZADOR DE CALENDARIO MAC (IOC & UOC)"
echo "=================================================================="
echo ""

echo "1️⃣  Limpiando y compilando eventos del calendario (.ics)..."
if [ -f "scripts/calendars/build_hub_calendar.py" ]; then
    python3 scripts/calendars/build_hub_calendar.py
fi

echo "2️⃣  Verificando calendario '🎯 MiCampus' en tu app Calendario de Mac..."
osascript <<'EOF'
tell application "Calendar"
    set calName to "🎯 MiCampus"
    set calExists to false
    repeat with c in calendars
        if name of c is calName then
            set calExists to true
            exit repeat
        end if
    end repeat
    if not calExists then
        make new calendar with properties {name:calName, color:{24000, 18000, 58000}}
    end if
end tell
EOF

ICS_FILE="$(pwd)/public/data/calendars/exports/calendario_miCampus.ics"
if [ ! -f "$ICS_FILE" ]; then
    ICS_FILE="$(pwd)/public/data/calendars/exports/todo.ics"
fi

if [ -f "$ICS_FILE" ]; then
    echo ""
    echo "3️⃣  Abriendo eventos en tu app Calendario..."
    open -a Calendar "$ICS_FILE"
    osascript -e 'display notification "Entregas de IOC y UOC sincronizadas sin fechas de ruido." with title "🎯 MiCampus" subtitle "Calendario Actualizado"'
    echo "✅ ¡Listo! Selecciona el calendario '🎯 MiCampus' en la ventana emergente."
else
    echo "❌ No se encontró el archivo .ics exportado."
fi

echo ""
read -p "Presiona [ENTER] para cerrar esta ventana..."
