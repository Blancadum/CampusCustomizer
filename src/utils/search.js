import { normalizeForSearch } from './text';

/**
 * Indica si un elemento del índice de búsqueda coincide con la consulta,
 * sin distinguir mayúsculas ni tildes. Busca en título, tipo, definición
 * y palabras clave.
 *
 * @param {{ title?: string, type?: string, definition?: string, keywords?: unknown[] }} item
 * @param {string} query
 * @returns {boolean}
 */
export function matchesSearch(item, query) {
  const q = normalizeForSearch(String(query ?? '').trim());
  if (!q) return false;

  const keywords = Array.isArray(item.keywords) ? item.keywords.filter((k) => typeof k === 'string') : [];

  return [item.title, item.type, item.definition, ...keywords].some((field) => normalizeForSearch(field).includes(q));
}
