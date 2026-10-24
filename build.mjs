/**
 * Génère le site statique dans dist/.
 *   node build.mjs
 * Variables : SITE_URL (https://…), BASE_PATH (/nom-du-depot pour un dépôt « projet »), SHOW_TODO=1 (aperçu interne)
 */
import { build } from 'esbuild';
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const define = Object.fromEntries(
  ['BASE_PATH', 'SITE_URL', 'SHOW_TODO'].map((k) => [`process.env.${k}`, JSON.stringify(process.env[k] || '')]),
);

await build({
  entryPoints: ['src/render.tsx'], bundle: true, platform: 'node', format: 'cjs', jsx: 'automatic',
  loader: { '.json': 'json' }, outfile: '.build/render.cjs', define, logLevel: 'warning',
});

const require = createRequire(import.meta.url);
const { routes, renderPage } = require('./.build/render.cjs');

rmSync('dist', { recursive: true, force: true });
cpSync('public', 'dist', { recursive: true });

for (const r of routes) {
  const out = join('dist', r.file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, renderPage(r.el));
}

const site = (process.env.SITE_URL || 'https://exemple.github.io').replace(/\/$/, '') + (process.env.BASE_PATH || '').replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);
writeFileSync('dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes.filter((r) => r.sitemap).map((r) => `  <url><loc>${site}${r.path}</loc><lastmod>${today}</lastmod></url>`).join('\n') + `\n</urlset>\n`);
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
writeFileSync('dist/.nojekyll', '');
console.log(`OK · ${routes.length} pages → dist/`);
