#!/usr/bin/env python3
"""Envuelve los colores claros fijos de los estilos en línea (JSX) en variables
`--dm-*` con el color original como reserva: `'#ffffff'` → `'var(--dm-surface, #ffffff)'`.

Las variables solo se definen en modo oscuro (theme-dark.css), así que el modo
claro se pinta exactamente igual. Uso único; se deja para repetirlo si se añaden
componentes:  python3 scripts/wrap_inline_light_colors.py [--check]
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKIP = {'src/components/dashboards/eac2/EntEac2Workbench.jsx'}  # no está enlazado en ninguna ruta

BACKGROUND = {
    '#ffffff': 'surface', '#fff': 'surface', '#f8fafc': 'surface-soft', '#f1f5f9': 'surface-muted', '#e2e8f0': 'surface-strong',
    '#eff6ff': 'tint-blue', '#dbeafe': 'tint-blue', '#f0fdf4': 'tint-green', '#dcfce7': 'tint-green', '#ecfdf5': 'tint-green',
    '#fef3c7': 'tint-amber', '#fffbeb': 'tint-amber', '#fee2e2': 'tint-red', '#fef2f2': 'tint-red', '#fce7f3': 'tint-pink',
    '#e0f2fe': 'tint-sky',
}
BORDER = {
    '#cbd5e1': 'border', '#e2e8f0': 'border', '#f1f5f9': 'border',
    '#86efac': 'border-green', '#bbf7d0': 'border-green', '#bfdbfe': 'border-blue', '#93c5fd': 'border-blue',
    '#fcd34d': 'border-amber', '#fde68a': 'border-amber', '#fca5a5': 'border-red', '#fecaca': 'border-red',
}
TEXT = {
    '#0f172a': 'text-strong', '#1e293b': 'text-strong', '#111827': 'text-strong',
    '#334155': 'text', '#475569': 'text', '#374151': 'text', '#1f2937': 'text',
    '#15803d': 'text-green', '#166534': 'text-green', '#16a34a': 'text-green',
    '#1d4ed8': 'text-blue', '#1e40af': 'text-blue', '#2563eb': 'text-blue',
    '#b45309': 'text-amber', '#92400e': 'text-amber', '#991b1b': 'text-red', '#b91c1c': 'text-red',
}
PROP_VALUE = re.compile(r"(\b\w+\s*:\s*)((?:[^,{}()]|\([^)]*\))+)")
HEX = re.compile(r'#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b')


def table_for(prop):
    if prop == 'color':
        return TEXT
    if prop.startswith('border'):
        return BORDER
    if prop.startswith('background'):
        return BACKGROUND
    return None


def rewrite(source):
    count = 0

    def fix_value(match):
        nonlocal count
        head, value = match.group(1), match.group(2)
        table = table_for(head.split(':')[0].strip())
        if table is None or 'var(' in value:
            return match.group(0)

        def wrap(hex_match):
            nonlocal count
            name = table.get(hex_match.group(0).lower())
            if not name:
                return hex_match.group(0)
            count += 1
            return f'var(--dm-{name}, {hex_match.group(0)})'

        return head + HEX.sub(wrap, value)

    return PROP_VALUE.sub(fix_value, source), count


def main():
    check = '--check' in sys.argv
    total = 0
    for path in sorted((ROOT / 'src').rglob('*.jsx')):
        rel = str(path.relative_to(ROOT))
        if rel in SKIP:
            continue
        original = path.read_text()
        updated, count = rewrite(original)
        if count:
            total += count
            print(f'{rel}: {count}')
            if not check:
                path.write_text(updated)
    print(f'total: {total}')
    return 1 if check and total else 0


if __name__ == '__main__':
    sys.exit(main())
