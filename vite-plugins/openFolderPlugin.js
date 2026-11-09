import { execFile as nodeExecFile } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Plugin de desarrollo: abre en el explorador de archivos una carpeta del
 * proyecto (p. ej. la de enunciados de una EAC) desde la web local.
 *
 * Solo acepta carpetas dentro del proyecto, rechaza peticiones de otras webs
 * y lanza el explorador con execFile (sin shell), así que la ruta nunca se
 * interpreta como comando.
 */

const DEFAULT_FOLDER = 'public/eacs';

const OPENERS = {
  darwin: 'open',
  win32: 'explorer',
};

export function openerFor(platform) {
  return OPENERS[platform] ?? 'xdg-open';
}

export function resolveSafeFolder(requested, root) {
  const target = requested || DEFAULT_FOLDER;
  if (target.includes('\0')) return null;

  const resolved = path.resolve(root, target);
  const relative = path.relative(root, resolved);
  const isInsideRoot = relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));

  return isInsideRoot ? resolved : null;
}

export function isCrossSiteRequest(headers) {
  const fetchSite = headers['sec-fetch-site'];
  if (fetchSite === 'cross-site' || fetchSite === 'same-site') return true;

  const { origin, host } = headers;
  if (!origin) return false;

  try {
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}

function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

export function createOpenFolderHandler({
  root,
  platform = process.platform,
  execFile = nodeExecFile,
  exists = (folder) => fs.existsSync(folder) && fs.statSync(folder).isDirectory(),
}) {
  const opener = openerFor(platform);

  return function openFolder(req, res) {
    if (isCrossSiteRequest(req.headers ?? {})) {
      return sendJson(res, 403, { ok: false, error: 'Petición no permitida' });
    }

    const requested = new URL(req.url, 'http://localhost').searchParams.get('path');
    const folder = resolveSafeFolder(requested, root);
    if (!folder) {
      return sendJson(res, 400, { ok: false, error: 'La carpeta debe estar dentro del proyecto' });
    }
    if (!exists(folder)) {
      return sendJson(res, 404, { ok: false, error: 'La carpeta no existe', path: folder });
    }

    execFile(opener, [folder], (error) => {
      if (error) console.warn(`[open-folder] No se pudo abrir ${folder}: ${error.message}`);
    });
    return sendJson(res, 200, { ok: true, path: folder });
  };
}

export function openFolderPlugin() {
  return {
    name: 'open-folder-plugin',
    configureServer(server) {
      server.middlewares.use('/api/open-folder', createOpenFolderHandler({ root: server.config.root }));
    },
  };
}
