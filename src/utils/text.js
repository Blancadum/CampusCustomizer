/**
 * Utilidades de texto compartidas.
 */

const DIACRITICS = /[\u0300-\u036f]/g;
const NON_ALPHANUMERIC = /[^a-z0-9]+/g;
const EDGE_HYPHENS = /(^-|-$)/g;

/**
 * Convierte un texto en un identificador apto para URL y anclas HTML:
 * minúsculas, sin tildes ni diacríticos y con guiones como separador.
 *
 * @param {string | null | undefined} text
 * @returns {string}
 */
export function slugify(text) {
  return String(text ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(DIACRITICS, '')
    .replace(NON_ALPHANUMERIC, '-')
    .replace(EDGE_HYPHENS, '');
}
