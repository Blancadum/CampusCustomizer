/**
 * Colores y bordes identificadores según la materia o categoría del resultado.
 */
export const CATEGORY_FILTERS = [
  { id: 'all', label: 'Todo' },
  { id: 'video', label: '🎬 Vídeos' },
  { id: 'leccion', label: '📚 Lecciones' },
  { id: 'eac', label: '⚡ EACs' },
  { id: 'glosario', label: '📖 Glosario' },
  { id: 'campus', label: '🌐 Portales' }
];

export function getBadgeStyle(type = '') {
  const t = type.toLowerCase();
  if (t.includes('vídeo') || t.includes('video')) return { bg: 'rgba(234, 88, 12, 0.14)', color: '#f97316', border: 'rgba(249, 115, 22, 0.3)' };
  if (t.includes('accenture')) return { bg: 'rgba(139, 92, 246, 0.12)', color: '#8b5cf6', border: 'rgba(139, 92, 246, 0.25)' };
  if (t.includes('entornos') || t === 'ent') return { bg: 'rgba(59, 130, 246, 0.12)', color: '#3b82f6', border: 'rgba(59, 130, 246, 0.25)' };
  if (t.includes('desp')) return { bg: 'rgba(34, 197, 94, 0.12)', color: '#22c55e', border: 'rgba(34, 197, 94, 0.25)' };
  if (t.includes('digi')) return { bg: 'rgba(236, 72, 153, 0.12)', color: '#ec4899', border: 'rgba(236, 72, 153, 0.25)' };
  if (t.includes('int')) return { bg: 'rgba(234, 179, 8, 0.12)', color: '#eab308', border: 'rgba(234, 179, 8, 0.25)' };
  if (t.includes('ipo')) return { bg: 'rgba(234, 88, 12, 0.12)', color: '#ea580c', border: 'rgba(234, 88, 12, 0.25)' };
  if (t.includes('spring') || t.includes('java')) return { bg: 'rgba(14, 165, 233, 0.12)', color: '#0ea5e9', border: 'rgba(14, 165, 233, 0.25)' };
  if (t.includes('brain')) return { bg: 'rgba(168, 85, 247, 0.12)', color: '#a855f7', border: 'rgba(168, 85, 247, 0.25)' };
  if (t.includes('eac')) return { bg: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', border: 'rgba(239, 68, 68, 0.25)' };
  return { bg: 'rgba(148, 163, 184, 0.12)', color: 'var(--text-muted)', border: 'var(--border-subtle)' };
}
