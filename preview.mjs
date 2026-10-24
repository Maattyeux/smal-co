// Serveur local minimal : node preview.mjs  →  http://localhost:4173
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.woff': 'font/woff', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json' };
createServer(async (req, res) => {
  let p = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  if (p.endsWith('/')) p += 'index.html';
  try { const b = await readFile(join('dist', p)); res.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' }); res.end(b); }
  catch { try { const b = await readFile('dist/404.html'); res.writeHead(404, { 'content-type': types['.html'] }); res.end(b); } catch { res.writeHead(404); res.end('404'); } }
}).listen(4173, () => console.log('http://localhost:4173'));
