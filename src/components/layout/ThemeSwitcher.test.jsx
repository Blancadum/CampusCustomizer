// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import ThemeSwitcher from './ThemeSwitcher.jsx';
import { THEME_STORAGE_KEY } from '../../utils/theme.js';

let systemDark = false;
let listeners = [];

function installMatchMedia() {
  window.matchMedia = (query) => ({
    media: query,
    get matches() { return systemDark; },
    addEventListener: (_type, fn) => listeners.push(fn),
    removeEventListener: (_type, fn) => { listeners = listeners.filter((l) => l !== fn); },
  });
}

function setSystemDark(value) {
  systemDark = value;
  act(() => listeners.forEach((fn) => fn({ matches: value })));
}

const theme = () => document.documentElement.getAttribute('data-theme') ?? 'light';

beforeEach(() => {
  systemDark = false;
  listeners = [];
  installMatchMedia();
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

afterEach(cleanup);

describe('ThemeSwitcher', () => {
  it('muestra las tres opciones como un grupo de radio accesible', () => {
    render(<ThemeSwitcher />);
    expect(screen.getByRole('radiogroup', { name: /tema/i })).toBeTruthy();
    expect(screen.getAllByRole('radio').map((r) => r.getAttribute('aria-label')))
      .toEqual(['Modo claro', 'Modo oscuro', 'Según el sistema']);
  });

  it('arranca en claro y lo marca como seleccionado', () => {
    render(<ThemeSwitcher />);
    expect(theme()).toBe('light');
    expect(screen.getByRole('radio', { name: 'Modo claro' }).getAttribute('aria-checked')).toBe('true');
  });

  it('al elegir oscuro lo aplica y lo recuerda', () => {
    render(<ThemeSwitcher />);
    fireEvent.click(screen.getByRole('radio', { name: 'Modo oscuro' }));
    expect(theme()).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(screen.getByRole('radio', { name: 'Modo oscuro' }).getAttribute('aria-checked')).toBe('true');
  });

  it('recupera la preferencia guardada al volver', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    render(<ThemeSwitcher />);
    expect(theme()).toBe('dark');
  });

  it('en modo sistema sigue los cambios del sistema operativo en caliente', () => {
    render(<ThemeSwitcher />);
    fireEvent.click(screen.getByRole('radio', { name: 'Según el sistema' }));
    expect(theme()).toBe('light');
    setSystemDark(true);
    expect(theme()).toBe('dark');
    setSystemDark(false);
    expect(theme()).toBe('light');
  });

  it('con una elección fija ignora los cambios del sistema', () => {
    render(<ThemeSwitcher />);
    fireEvent.click(screen.getByRole('radio', { name: 'Modo claro' }));
    setSystemDark(true);
    expect(theme()).toBe('light');
  });
});
