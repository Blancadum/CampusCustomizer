import React from 'react';
import { slugify } from '../../../../../utils/text';

function getRawText(children) {
  return React.Children.toArray(children)
    .map(c => (typeof c === 'string' ? c : (c?.props?.children || '')))
    .join('');
}

export function renderH2({ children, ...props }) {
  const rawText = getRawText(children);
  const id = slugify(rawText);
  return (
    <h2 id={id} className="lesson-h2" {...props}>
      {children}
    </h2>
  );
}

export function renderH3({ children, ...props }) {
  const rawText = getRawText(children);
  let id = '';
  if (/eac.*1/i.test(rawText) || /festa.*major/i.test(rawText) || /fiesta.*major/i.test(rawText)) {
    id = '2-6-3-eac1-festa-major';
  } else if (/flota/i.test(rawText) || /vehiculo/i.test(rawText)) {
    id = '2-6-2-flota-vehiculos';
  } else if (/bici/i.test(rawText)) {
    id = '2-6-1-bicicletas';
  } else {
    id = slugify(rawText);
  }

  const isEac = /eac/i.test(rawText) && !/alquiler.*bici/i.test(rawText);
  const isNumbered = /^[0-9]+(\.[0-9]+)+\s+/.test(rawText.trim());
  const modifierClass = isEac ? 'lesson-h3--eac' : isNumbered ? 'lesson-h3--numbered' : '';

  return (
    <h3 id={id} className={`lesson-h3 ${modifierClass}`.trim()} {...props}>
      <span>{children}</span>
      {isEac && (
        <span className="lesson-h3-eac-badge">
          Susceptible PAF / EAC
        </span>
      )}
    </h3>
  );
}

export function renderH4({ children, ...props }) {
  return (
    <h4 className="lesson-h4" {...props}>
      {children}
    </h4>
  );
}
