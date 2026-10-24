import { renderToStaticMarkup } from 'react-dom/server';
import { Home, Histoire, Cyclisme, Running, Partenaires, Soutenir, Contact, Mentions, NotFound } from './pages';
import { supportOn } from './lib';

export const routes: { path: string; file: string; el: () => any; sitemap: boolean }[] = [
  { path: '/', file: 'index.html', el: Home, sitemap: true },
  { path: '/histoire/', file: 'histoire/index.html', el: Histoire, sitemap: true },
  { path: '/cyclisme/', file: 'cyclisme/index.html', el: Cyclisme, sitemap: true },
  { path: '/running/', file: 'running/index.html', el: Running, sitemap: true },
  { path: '/partenaires/', file: 'partenaires/index.html', el: Partenaires, sitemap: true },
  { path: '/soutenir/', file: 'soutenir/index.html', el: Soutenir, sitemap: supportOn },
  { path: '/contact/', file: 'contact/index.html', el: Contact, sitemap: true },
  { path: '/mentions-legales/', file: 'mentions-legales/index.html', el: Mentions, sitemap: true },
  { path: '/404.html', file: '404.html', el: NotFound, sitemap: false },
];

export const renderPage = (el: () => any) => '<!doctype html>' + renderToStaticMarkup(el());
