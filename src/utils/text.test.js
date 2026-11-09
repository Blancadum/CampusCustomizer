import { describe, expect, it } from 'vitest';
import { slugify } from './text';

describe('slugify', () => {
  it.each([
    ['Introducción', 'introduccion'],
    ['1.2 Arquitectura cliente-servidor', '1-2-arquitectura-cliente-servidor'],
    ['Configuració de xarxa', 'configuracio-de-xarxa'],
    ['Año y señal', 'ano-y-senal'],
    ['Col·lecció de dades', 'col-leccio-de-dades'],
    ['ÚLTIMA Versión', 'ultima-version'],
    ['EAC 2: Despliegue (PHP)', 'eac-2-despliegue-php'],
    ['  espacios   múltiples  ', 'espacios-multiples'],
    ['--¿Qué es un servidor?--', 'que-es-un-servidor'],
  ])('convierte "%s" en "%s"', (input, expected) => {
    expect(slugify(input)).toBe(expected);
  });

  it.each([[''], [null], [undefined]])('devuelve una cadena vacía para %s', (input) => {
    expect(slugify(input)).toBe('');
  });
});
