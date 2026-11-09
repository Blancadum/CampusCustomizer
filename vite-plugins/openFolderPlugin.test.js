import path from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { createOpenFolderHandler, isCrossSiteRequest, openerFor, resolveSafeFolder } from './openFolderPlugin';

const ROOT = path.resolve('/proyecto/micampus');

describe('resolveSafeFolder', () => {
  it('usa public/eacs si no se indica carpeta', () => {
    expect(resolveSafeFolder(null, ROOT)).toBe(path.join(ROOT, 'public/eacs'));
  });

  it('resuelve rutas relativas dentro del proyecto', () => {
    expect(resolveSafeFolder('public/eacs/ent/EAC2', ROOT)).toBe(path.join(ROOT, 'public/eacs/ent/EAC2'));
  });

  it('acepta rutas absolutas dentro del proyecto', () => {
    const inside = path.join(ROOT, 'public/eacs');

    expect(resolveSafeFolder(inside, ROOT)).toBe(inside);
  });

  it.each([
    ['../fuera'],
    ['public/../../fuera'],
    ['/etc'],
    [path.resolve('/proyecto/micampus-otro')],
    ['public/eacs\0'],
  ])('rechaza %s por estar fuera del proyecto o no ser válida', (requested) => {
    expect(resolveSafeFolder(requested, ROOT)).toBeNull();
  });

  it('trata comillas y caracteres de shell como parte del nombre, sin interpretarlos', () => {
    expect(resolveSafeFolder('public/"; ls; "', ROOT)).toBe(path.join(ROOT, 'public/"; ls; "'));
  });
});

describe('isCrossSiteRequest', () => {
  it.each([
    [{}, false],
    [{ 'sec-fetch-site': 'same-origin' }, false],
    [{ 'sec-fetch-site': 'none' }, false],
    [{ 'sec-fetch-site': 'cross-site' }, true],
    [{ 'sec-fetch-site': 'same-site' }, true],
    [{ host: 'localhost:5173', origin: 'http://localhost:5173' }, false],
    [{ host: 'localhost:5173', origin: 'https://ejemplo.com' }, true],
  ])('con cabeceras %o devuelve %s', (headers, expected) => {
    expect(isCrossSiteRequest(headers)).toBe(expected);
  });
});

describe('openerFor', () => {
  it.each([
    ['darwin', 'open'],
    ['win32', 'explorer'],
    ['linux', 'xdg-open'],
  ])('en %s usa %s', (platform, opener) => {
    expect(openerFor(platform)).toBe(opener);
  });
});

describe('createOpenFolderHandler', () => {
  function setup({ exists = true, headers = {} } = {}) {
    const execFile = vi.fn();
    const handler = createOpenFolderHandler({
      root: ROOT,
      platform: 'linux',
      execFile,
      exists: () => exists,
    });
    const res = { writeHead: vi.fn(), end: vi.fn() };
    const call = (url) => {
      handler({ url, headers }, res);
      return { status: res.writeHead.mock.calls[0][0], body: JSON.parse(res.end.mock.calls[0][0]) };
    };
    return { execFile, call };
  }

  it('abre la carpeta con execFile, pasando la ruta como argumento y sin shell', () => {
    const { execFile, call } = setup();

    const { status, body } = call('/?path=public%2Feacs%2Fent');

    expect(status).toBe(200);
    expect(body).toEqual({ ok: true, path: path.join(ROOT, 'public/eacs/ent') });
    expect(execFile).toHaveBeenCalledWith('xdg-open', [path.join(ROOT, 'public/eacs/ent')], expect.any(Function));
  });

  it('responde 403 y no ejecuta nada si la petición viene de otra web', () => {
    const { execFile, call } = setup({ headers: { 'sec-fetch-site': 'cross-site' } });

    expect(call('/?path=public').status).toBe(403);
    expect(execFile).not.toHaveBeenCalled();
  });

  it('responde 400 y no ejecuta nada si la ruta sale del proyecto', () => {
    const { execFile, call } = setup();

    expect(call('/?path=%2Fetc').status).toBe(400);
    expect(execFile).not.toHaveBeenCalled();
  });

  it('responde 404 si la carpeta no existe', () => {
    const { execFile, call } = setup({ exists: false });

    expect(call('/?path=public%2Fno-existe').status).toBe(404);
    expect(execFile).not.toHaveBeenCalled();
  });
});
