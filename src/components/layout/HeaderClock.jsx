import React, { useState, useEffect } from 'react';

/**
 * HeaderClock
 * Componente reloj aislado de alto rendimiento.
 * Su ciclo de actualización cada segundo (1000ms) se circunscribe a este componente,
 * y aplica bailout automático si el minuto no ha cambiado para evitar re-renders superfluos.
 */
export default function HeaderClock() {
  const [timeString, setTimeString] = useState(() => {
    return new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const nextTime = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      setTimeString((prev) => (prev === nextTime ? prev : nextTime));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="header-clock-pill" aria-label={`Hora actual: ${timeString}`}>
      <span aria-hidden="true">🕒</span> <span>{timeString}</span>
    </div>
  );
}
