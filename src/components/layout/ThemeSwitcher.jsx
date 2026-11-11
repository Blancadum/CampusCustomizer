import { useEffect, useRef, useState } from 'react';
import {
  DARK_MEDIA_QUERY,
  applyTheme,
  readPreference,
  resolveTheme,
  savePreference,
} from '../../utils/theme.js';
import './ThemeSwitcher.css';

const OPTIONS = [
  { value: 'light', icon: '☀️', label: 'Modo claro' },
  { value: 'dark', icon: '🌙', label: 'Modo oscuro' },
  { value: 'system', icon: '💻', label: 'Según el sistema' },
];

const safeStorage = () => {
  try { return window.localStorage; } catch { return undefined; }
};

const systemMedia = () => window.matchMedia?.(DARK_MEDIA_QUERY);

export default function ThemeSwitcher() {
  const [preference, setPreference] = useState(() => readPreference(safeStorage()));
  const buttons = useRef([]);

  useEffect(() => {
    const media = systemMedia();
    const apply = () => applyTheme(document.documentElement, resolveTheme(preference, Boolean(media?.matches)));
    apply();
    if (preference !== 'system' || !media) return undefined;
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [preference]);

  const choose = (value) => {
    setPreference(value);
    savePreference(safeStorage(), value);
  };

  const onKeyDown = (event, index) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (index + step + OPTIONS.length) % OPTIONS.length;
    choose(OPTIONS[next].value);
    buttons.current[next]?.focus();
  };

  return (
    <div className="theme-switcher" role="radiogroup" aria-label="Tema de la web">
      {OPTIONS.map((option, index) => {
        const checked = preference === option.value;
        return (
          <button
            key={option.value}
            ref={(el) => { buttons.current[index] = el; }}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={option.label}
            title={option.label}
            tabIndex={checked ? 0 : -1}
            className={`theme-switcher__option${checked ? ' is-active' : ''}`}
            onClick={() => choose(option.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            <span aria-hidden="true">{option.icon}</span>
          </button>
        );
      })}
    </div>
  );
}
