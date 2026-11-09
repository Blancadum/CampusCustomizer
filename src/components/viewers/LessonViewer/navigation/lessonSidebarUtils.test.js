import { describe, expect, it } from 'vitest';
import { extractSubsections } from './lessonSidebarUtils';

describe('extractSubsections', () => {
  it('devuelve las subsecciones definidas en el tema sin recalcularlas', () => {
    const subsections = [{ id: 'a', slug: 'a', title: 'A' }];

    expect(extractSubsections({ subsections, contentMd: '## 1. Otro' })).toBe(subsections);
  });

  it('devuelve una lista vacía si el tema no tiene contenido', () => {
    expect(extractSubsections({})).toEqual([]);
  });

  it('extrae los encabezados numerados de nivel 2 y 3', () => {
    const contentMd = [
      '# Título principal',
      '## 1. Introducción',
      'Texto normal',
      '### 1.2 Arquitectura cliente-servidor',
      '## Sin número',
    ].join('\n');

    expect(extractSubsections({ contentMd })).toEqual([
      { id: '1-introduccion', slug: '1-introduccion', title: '1. Introducción', isEac: false },
      {
        id: '1-2-arquitectura-cliente-servidor',
        slug: '1-2-arquitectura-cliente-servidor',
        title: '1.2 Arquitectura cliente-servidor',
        isEac: false,
      },
    ]);
  });

  it('marca como EAC los encabezados que empiezan por EAC', () => {
    const [eac] = extractSubsections({ contentMd: '## EAC 2: Despliegue' });

    expect(eac).toEqual({ id: 'eac-2-despliegue', slug: 'eac-2-despliegue', title: 'EAC 2: Despliegue', isEac: true });
  });

  it('quita el formato markdown del título antes de generar el slug', () => {
    const [sub] = extractSubsections({ contentMd: '### 2.1 **Gestión** de _paquetes_' });

    expect(sub.title).toBe('2.1 Gestión de paquetes');
    expect(sub.slug).toBe('2-1-gestion-de-paquetes');
  });
});
