// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_PREFERENCE,
  THEME_PREFERENCES,
  THEME_STORAGE_KEY,
  applyTheme,
  readPreference,
  resolveTheme,
  savePreference,
} from './theme.js';

function memoryStorage(initial = {}) {
  const data = { ...initial };
  return {
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => { data[key] = String(value); },
    data,
  };
}

describe('THEME_PREFERENCES', () => {
  it('ofrece claro, oscuro y sistema', () => {
    expect(THEME_PREFERENCES).toEqual(['light', 'dark', 'system']);
  });

  it('por defecto mantiene el modo claro de la plantilla', () => {
    expect(DEFAULT_PREFERENCE).toBe('light');
  });
});

describe('readPreference', () => {
  it('devuelve la preferencia guardada si es válida', () => {
    expect(readPreference(memoryStorage({ [THEME_STORAGE_KEY]: 'dark' }))).toBe('dark');
    expect(readPreference(memoryStorage({ [THEME_STORAGE_KEY]: 'system' }))).toBe('system');
  });

  it('usa el valor por defecto si no hay nada guardado', () => {
    expect(readPreference(memoryStorage())).toBe(DEFAULT_PREFERENCE);
  });

  it('ignora valores desconocidos o manipulados', () => {
    expect(readPreference(memoryStorage({ [THEME_STORAGE_KEY]: 'neon' }))).toBe(DEFAULT_PREFERENCE);
  });

  it('no rompe si el almacenamiento está bloqueado (modo privado)', () => {
    const blocked = { getItem: () => { throw new Error('SecurityError'); } };
    expect(readPreference(blocked)).toBe(DEFAULT_PREFERENCE);
    expect(readPreference(undefined)).toBe(DEFAULT_PREFERENCE);
  });
});

describe('savePreference', () => {
  it('guarda una preferencia válida', () => {
    const storage = memoryStorage();
    savePreference(storage, 'dark');
    expect(storage.data[THEME_STORAGE_KEY]).toBe('dark');
  });

  it('rechaza valores no válidos sin guardar nada', () => {
    const storage = memoryStorage();
    savePreference(storage, 'neon');
    expect(storage.data).toEqual({});
  });

  it('no rompe si el almacenamiento falla al escribir', () => {
    const full = { setItem: vi.fn(() => { throw new Error('QuotaExceeded'); }) };
    expect(() => savePreference(full, 'dark')).not.toThrow();
  });
});

describe('resolveTheme', () => {
  it('respeta una elección explícita', () => {
    expect(resolveTheme('light', true)).toBe('light');
    expect(resolveTheme('dark', false)).toBe('dark');
  });

  it('en modo sistema sigue al sistema operativo', () => {
    expect(resolveTheme('system', true)).toBe('dark');
    expect(resolveTheme('system', false)).toBe('light');
  });
});

describe('applyTheme', () => {
  it('en oscuro marca el documento y el color-scheme nativo', () => {
    const root = document.createElement('html');
    applyTheme(root, 'dark');
    expect(root.getAttribute('data-theme')).toBe('dark');
    expect(root.style.colorScheme).toBe('dark');
  });

  it('en claro deja el documento sin data-theme, como la plantilla original', () => {
    // La plantilla tiene reglas [data-theme="light"] que nunca se han aplicado:
    // activarlas cambiaría el aspecto claro que ya conoce todo el mundo.
    const root = document.createElement('html');
    applyTheme(root, 'dark');
    applyTheme(root, 'light');
    expect(root.hasAttribute('data-theme')).toBe(false);
    expect(root.style.colorScheme).toBe('light');
  });
});
