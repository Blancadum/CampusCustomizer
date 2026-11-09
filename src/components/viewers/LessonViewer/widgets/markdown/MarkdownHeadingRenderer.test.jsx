// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { renderH2, renderH3 } from './MarkdownHeadingRenderer';

afterEach(cleanup);

describe('renderH2', () => {
  it('genera un id sin tildes ni signos para enlazar desde el índice', () => {
    const { container } = render(renderH2({ children: '1. Introducción a Linux' }));

    expect(container.querySelector('h2').id).toBe('1-introduccion-a-linux');
  });
});

describe('renderH3', () => {
  it('genera el id a partir del texto en encabezados genéricos', () => {
    const { container } = render(renderH3({ children: '1.2 Instalación del servidor' }));
    const heading = container.querySelector('h3');

    expect(heading.id).toBe('1-2-instalacion-del-servidor');
    expect(heading.className).toBe('lesson-h3 lesson-h3--numbered');
  });

  it('añade la insignia de EAC en los encabezados de EAC', () => {
    const { container } = render(renderH3({ children: 'EAC 3: Base de datos' }));

    expect(container.querySelector('h3').className).toBe('lesson-h3 lesson-h3--eac');
    expect(container.querySelector('.lesson-h3-eac-badge')).not.toBeNull();
  });
});
