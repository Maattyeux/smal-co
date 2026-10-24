import type { ReactNode } from 'react';
import { href, asset, site, supportOn, SITE_URL, BASE } from './lib';

export interface Meta { title: string; description: string; path: string; image?: string; noindex?: boolean }

const NAV = [
  { label: 'Histoire', path: '/histoire/' },
  { label: 'Cyclisme', path: '/cyclisme/' },
  { label: 'Running', path: '/running/' },
  { label: 'Partenaires', path: '/partenaires/' },
  ...(supportOn ? [{ label: 'Nous soutenir', path: '/soutenir/' }] : []),
];

export function Layout({ meta, children, current }: { meta: Meta; children: ReactNode; current: string }) {
  const url = `${SITE_URL}${BASE}${meta.path}`;
  const image = `${SITE_URL}${BASE}${meta.image || '/img/road-peloton-1920.webp'}`;
  const full = meta.path === '/' ? `${site.name} — ${site.signature}` : `${meta.title} · ${site.name}`;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    name: site.name,
    legalName: site.legalName,
    slogan: site.signature,
    url: `${SITE_URL}${BASE}/`,
    sport: ['Cyclisme', 'Course à pied', 'Trail'],
    address: { '@type': 'PostalAddress', addressLocality: 'Brest', addressCountry: 'FR' },
    sameAs: [site.contact.instagram],
  };
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{full}</title>
        <meta name="description" content={meta.description} />
        <meta name="theme-color" content="#07060d" />
        {meta.noindex ? <meta name="robots" content="noindex, nofollow" /> : <link rel="canonical" href={url} />}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:title" content={full} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href={asset('/logos/smal-mark.png')} type="image/png" />
        <link rel="preload" href={asset('/fonts/display-800.woff')} as="font" type="font/woff" crossOrigin="" />
        <link rel="stylesheet" href={asset('/assets/site.css')} />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </head>
      <body>
        <a className="skip" href="#contenu">Aller au contenu</a>
        <header className="top" data-header>
          <div className="wrap top-in">
            <a className="brand" href={href('/')} aria-label="SMAL & CO, accueil">
              <img src={asset('/logos/smal-co-blanc.png')} alt="SMAL & CO" width="682" height="125" />
            </a>
            <nav id="menu" className="nav" aria-label="Navigation principale">
              {NAV.map((n) => (
                <a key={n.path} href={href(n.path)} aria-current={current === n.path ? 'page' : undefined}>{n.label}</a>
              ))}
              <a className="btn btn-small" href={href('/contact/')} aria-current={current === '/contact/' ? 'page' : undefined}>Contact</a>
            </nav>
            <button className="burger" type="button" aria-expanded="false" aria-controls="menu" data-burger>
              <span className="sr">Menu</span><i /><i />
            </button>
          </div>
        </header>
        <main id="contenu">{children}</main>
        <footer className="foot">
          <div className="wrap foot-in">
            <div>
              <img className="foot-logo" src={asset('/logos/smal-co-blanc.png')} alt="SMAL & CO" width="682" height="125" loading="lazy" />
              <p className="foot-sig">{site.signature}.</p>
              <p className="muted">Association loi 1901 · Brest, Finistère<br />Club affilié à la Fédération Française de Cyclisme</p>
            </div>
            <nav aria-label="Pied de page">
              <h2 className="foot-h">Le site</h2>
              <ul>
                {NAV.map((n) => <li key={n.path}><a href={href(n.path)}>{n.label}</a></li>)}
                <li><a href={href('/contact/')}>Contact</a></li>
              </ul>
            </nav>
            <div>
              <h2 className="foot-h">Nous suivre</h2>
              <ul>
                <li><a href={site.contact.instagram} rel="noopener" target="_blank">Instagram {site.contact.instagramHandle}</a></li>
                {site.contact.linkedin ? <li><a href={site.contact.linkedin} rel="noopener" target="_blank">LinkedIn</a></li> : null}
                <li><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
              </ul>
            </div>
          </div>
          <div className="wrap foot-bar">
            <span>© {new Date().getFullYear()} SMAL & CO</span>
            <a href={href('/mentions-legales/')}>Mentions légales et confidentialité</a>
          </div>
        </footer>
        <script src={asset('/assets/site.js')} defer />
      </body>
    </html>
  );
}

export function Reveal({ children, as: Tag = 'div', delay = 0, className = '' }: { children: ReactNode; as?: any; delay?: number; className?: string }) {
  return <Tag className={`rv ${className}`} data-reveal style={delay ? { ['--d' as any]: `${delay}ms` } : undefined}>{children}</Tag>;
}

export function SplitWords({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span key={i}><span className="w" style={{ ['--i' as any]: i }}>{w}</span>{' '}</span>
      ))}
    </>
  );
}

export function PageHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <section className="phead">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="h-xl">{title}</h1>
        {lead ? <p className="lead">{lead}</p> : null}
      </div>
    </section>
  );
}
