/**
 * Tema visual de MiCampus: claro, oscuro o el del sistema operativo.
 *
 * La preferencia se guarda en localStorage. `index.html` aplica la misma
 * lógica en un script mínimo antes de pintar, para evitar el destello blanco
 * al cargar en modo oscuro: si cambias la clave o los valores, cámbialos allí.
 */
export const THEME_STORAGE_KEY = 'micampus_theme';
export const THEME_PREFERENCES = ['light', 'dark', 'system'];
export const DEFAULT_PREFERENCE = 'light';
export const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';

const isValidPreference = (value) => THEME_PREFERENCES.includes(value);

export function readPreference(storage) {
  try {
    const stored = storage?.getItem(THEME_STORAGE_KEY);
    return isValidPreference(stored) ? stored : DEFAULT_PREFERENCE;
  } catch {
    return DEFAULT_PREFERENCE;
  }
}

export function savePreference(storage, preference) {
  if (!isValidPreference(preference)) return;
  try {
    storage?.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Sin almacenamiento (modo privado, cuota llena): el tema dura solo esta visita.
  }
}

export function resolveTheme(preference, systemPrefersDark) {
  if (preference === 'system') return systemPrefersDark ? 'dark' : 'light';
  return preference === 'dark' ? 'dark' : 'light';
}

export function applyTheme(root, theme) {
  // En claro no se marca nada: la plantilla trae reglas [data-theme="light"]
  // que nunca se han aplicado y cambiarían su aspecto original.
  if (theme === 'dark') root.setAttribute('data-theme', 'dark');
  else root.removeAttribute('data-theme');
  root.style.colorScheme = theme;
}
