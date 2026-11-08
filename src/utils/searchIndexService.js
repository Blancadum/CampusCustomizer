/**
 * searchIndexService
 * Gestor centralizado del índice unificado de búsqueda (/data/search_index.json).
 * Implementa:
 * 1. Caché en memoria de módulo para accesos síncronos a 0 ms.
 * 2. Persistencia en sessionStorage entre recargas de pestaña.
 * 3. Deduplicación de promesas en vuelo (in-flight request deduplication).
 */

let memoryIndexCache = null;
let pendingPromise = null;

export function getCachedSearchIndex() {
  if (memoryIndexCache && memoryIndexCache.length > 0) {
    return memoryIndexCache;
  }
  try {
    const cached = sessionStorage.getItem('micampus_search_index');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryIndexCache = parsed;
        return parsed;
      }
    }
  } catch (_) {
    // sessionStorage inaccesible o cuota excedida
  }
  return [];
}

export async function fetchSearchIndex() {
  if (memoryIndexCache && memoryIndexCache.length > 0) {
    return memoryIndexCache;
  }

  const cached = getCachedSearchIndex();
  if (cached.length > 0) {
    return cached;
  }

  if (pendingPromise) {
    return pendingPromise;
  }

  pendingPromise = fetch('/data/search_index.json')
    .then((res) => {
      if (!res.ok) throw new Error('Error al cargar índice de búsqueda');
      return res.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        memoryIndexCache = data;
        try {
          sessionStorage.setItem('micampus_search_index', JSON.stringify(data));
        } catch (_) {}
      }
      pendingPromise = null;
      return memoryIndexCache || [];
    })
    .catch(() => {
      pendingPromise = null;
      return [];
    });

  return pendingPromise;
}
