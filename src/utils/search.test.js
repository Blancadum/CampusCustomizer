import { describe, expect, it } from 'vitest';
import { matchesSearch } from './search';

const funcion = {
  title: 'Función',
  type: 'Concepto',
  definition: 'Bloque de código reutilizable',
  keywords: ['programación', 'JavaScript'],
};

describe('matchesSearch', () => {
  it.each(['funcion', 'función', 'FUNCION', '  Funció  '])('encuentra el título con la consulta "%s"', (query) => {
    expect(matchesSearch(funcion, query)).toBe(true);
  });

  it('busca en el tipo, la definición y las palabras clave sin distinguir tildes', () => {
    expect(matchesSearch(funcion, 'concepto')).toBe(true);
    expect(matchesSearch(funcion, 'codigo')).toBe(true);
    expect(matchesSearch(funcion, 'programacion')).toBe(true);
    expect(matchesSearch(funcion, 'javascript')).toBe(true);
  });

  it('acepta tildes en la consulta aunque el texto no las tenga', () => {
    expect(matchesSearch({ title: 'Configuracion de red' }, 'configuración')).toBe(true);
  });

  it('no encuentra textos que no contienen la consulta', () => {
    expect(matchesSearch(funcion, 'docker')).toBe(false);
  });

  it('no devuelve nada con una consulta vacía', () => {
    expect(matchesSearch(funcion, '   ')).toBe(false);
  });

  it('trata los signos de la consulta como texto literal', () => {
    expect(matchesSearch({ title: 'C++ (lenguaje)' }, 'c++ (')).toBe(true);
    expect(matchesSearch({ title: 'Cliente' }, '.*')).toBe(false);
  });

  it('tolera elementos sin campos opcionales o con palabras clave que no son texto', () => {
    expect(matchesSearch({}, 'docker')).toBe(false);
    expect(matchesSearch({ title: 'Docker', keywords: [null, 3] }, 'docker')).toBe(true);
  });
});
