#!/usr/bin/env python3
"""Genera src/assets/css/global/theme-dark-workbench.css.

Las guías de EAC (Workbench) tienen su paleta clara escrita a mano. Este script
lee sus hojas de estilo y, para cada declaración con un color claro fijo,
escribe la equivalente oscura bajo [data-theme="dark"]. No modifica las hojas
originales. Volver a ejecutarlo si cambian:

    python3 scripts/build_dark_workbench.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCES = [
    ROOT / 'src/components/dashboards/eac2/DespEac2Workbench.css',
    ROOT / 'src/components/dashboards/eac2/EntEac2Workbench.css',
]
OUTPUT = ROOT / 'src/assets/css/global/theme-dark-workbench.css'

# Superficies y rellenos claros -> superficies oscuras / tintes translúcidos.
BACKGROUND = {
    '#ffffff': '#18202c', '#fff': '#18202c', '#f8fafc': '#161d28', '#f6f7fb': '#0f141c',
    '#f1f5f9': '#1f2937', '#e2e8f0': '#273244', '#cbd5e1': '#334155',
    '#eff6ff': 'rgba(96, 165, 250, 0.10)', '#dbeafe': 'rgba(96, 165, 250, 0.22)', '#bfdbfe': 'rgba(96, 165, 250, 0.24)',
    '#f0fdf4': 'rgba(52, 211, 153, 0.10)', '#dcfce7': 'rgba(52, 211, 153, 0.16)', '#bbf7d0': 'rgba(52, 211, 153, 0.24)',
    '#fef3c7': 'rgba(251, 191, 36, 0.16)', '#fffbeb': 'rgba(251, 191, 36, 0.10)', '#fde68a': 'rgba(251, 191, 36, 0.24)',
    '#fce7f3': 'rgba(244, 114, 182, 0.14)', '#fef2f2': 'rgba(248, 113, 113, 0.10)', '#fee2e2': 'rgba(248, 113, 113, 0.16)',
    '#e0f2fe': 'rgba(56, 189, 248, 0.14)', '#ecfdf5': 'rgba(52, 211, 153, 0.10)',
}
# Bordes claros -> bordes sutiles sobre oscuro.
BORDER = {
    '#ffffff': 'rgba(148, 163, 184, 0.2)', '#f1f5f9': 'rgba(148, 163, 184, 0.16)', '#e2e8f0': 'rgba(148, 163, 184, 0.2)',
    '#cbd5e1': 'rgba(148, 163, 184, 0.3)', '#94a3b8': 'rgba(148, 163, 184, 0.45)',
    '#bfdbfe': 'rgba(96, 165, 250, 0.35)', '#93c5fd': 'rgba(96, 165, 250, 0.45)',
    '#bbf7d0': 'rgba(52, 211, 153, 0.35)', '#86efac': 'rgba(52, 211, 153, 0.45)',
    '#fde68a': 'rgba(251, 191, 36, 0.35)', '#fcd34d': 'rgba(251, 191, 36, 0.45)',
}
# Textos oscuros -> textos claros del mismo tono.
TEXT = {
    '#0f172a': '#e8edf4', '#1e293b': '#e8edf4', '#334155': '#c3cbd6', '#475569': '#b4bdca', '#64748b': '#94a0b2',
    '#1e3a8a': '#bfdbfe', '#1e40af': '#93c5fd', '#1d4ed8': '#93c5fd', '#2563eb': '#93c5fd',
    '#166534': '#86efac', '#15803d': '#6ee7b7', '#16a34a': '#6ee7b7', '#065f46': '#6ee7b7',
    '#0369a1': '#7dd3fc', '#0284c7': '#7dd3fc',
    '#92400e': '#fcd34d', '#b45309': '#fcd34d', '#9d174d': '#f9a8d4', '#be185d': '#f9a8d4',
    '#991b1b': '#fca5a5', '#b91c1c': '#fca5a5',
}
WHITE_RGBA = re.compile(r'rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0?\.(9\d*|8\d*)\s*\)')
HEX = re.compile(r'#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b')


def table_for(prop):
    if prop in ('color', '-webkit-text-fill-color'):
        return TEXT
    if prop.startswith('border') or prop == 'outline' or prop == 'outline-color':
        return BORDER
    if prop.startswith('background'):
        return BACKGROUND
    return None


def translate(prop, value):
    table = table_for(prop)
    if table is None:
        return None
    new = HEX.sub(lambda m: table.get(m.group(0).lower(), m.group(0)), value)
    if table is BACKGROUND:
        new = WHITE_RGBA.sub('rgba(24, 32, 44, 0.94)', new)
    return new if new != value else None


def split_rules(css):
    """Devuelve [(contexto_at_rule, selector, cuerpo)] recorriendo llaves anidadas."""
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    out, stack, buf, i = [], [], '', 0
    while i < len(css):
        ch = css[i]
        if ch == '{':
            stack.append(buf.strip())
            buf = ''
        elif ch == '}':
            header = stack.pop() if stack else ''
            body = buf
            buf = ''
            if not header.startswith('@'):
                context = [h for h in stack if h.startswith('@')]
                out.append((tuple(context), header, body))
        else:
            buf += ch
        i += 1
    return out


def scope(selector):
    parts = [s.strip() for s in selector.split(',') if s.strip()]
    return ',\n'.join(f'[data-theme="dark"] {p}' for p in parts)


def build():
    blocks = {}
    for src in SOURCES:
        for context, selector, body in split_rules(src.read_text()):
            if not selector or selector.startswith(('from', 'to')) or re.fullmatch(r'[\d.%\s,]+', selector):
                continue
            decls = []
            for decl in body.split(';'):
                if ':' not in decl:
                    continue
                prop, value = decl.split(':', 1)
                prop, value = prop.strip().lower(), value.strip()
                new = translate(prop, value)
                if new:
                    decls.append(f'  {prop}: {new};')
            if decls:
                blocks.setdefault(context, []).append(f'{scope(selector)} {{\n' + '\n'.join(decls) + '\n}')
    lines = [
        '/* ==========================================================================',
        '   MiCampus · Modo oscuro de las guías de EAC (Workbench)',
        '   ARCHIVO GENERADO por scripts/build_dark_workbench.py a partir de',
        '   DespEac2Workbench.css y EntEac2Workbench.css. No editar a mano:',
        '   cambia la tabla de colores del script y vuelve a ejecutarlo.',
        '   ========================================================================== */',
        '',
    ]
    for context, rules in blocks.items():
        if context:
            lines.append(' '.join(context) + ' {')
            lines.extend('  ' + r.replace('\n', '\n  ') for r in rules)
            lines.append('}')
        else:
            lines.extend(rules)
        lines.append('')
    OUTPUT.write_text('\n'.join(lines))
    print(f'{OUTPUT.relative_to(ROOT)}: {sum(len(r) for r in blocks.values())} reglas')


if __name__ == '__main__':
    build()
