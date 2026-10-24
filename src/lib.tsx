import site from '../content/site.json';

export const BASE = (process.env.BASE_PATH || '').replace(/\/$/, '');
export const SITE_URL = (process.env.SITE_URL || 'https://exemple.github.io').replace(/\/$/, '');
/** Affiche les badges « à valider » dans l'aperçu interne (SHOW_TODO=1). Jamais en production. */
export const SHOW_TODO = process.env.SHOW_TODO === '1';

export const href = (p: string) => `${BASE}${p}`;
export const asset = (p: string) => `${BASE}${p}`;
export const supportOn = site.flags.support.enabled;
export const formsOn = site.flags.forms.enabled && !!site.flags.forms.endpoint;

/** srcset pour les photos générées en 960 / 1920 (ou 720 / 1080 pour les formats portrait). */
export function srcset(name: string, portrait = false) {
  const [a, b] = portrait ? [720, 1080] : [960, 1920];
  return {
    src: asset(`/img/${name}-${a}.webp`),
    srcSet: `${asset(`/img/${name}-${a}.webp`)} ${a}w, ${asset(`/img/${name}-${b}.webp`)} ${b}w`,
  };
}

export const PORTRAIT = new Set(['run-action-1', 'run-action-2', 'run-portrait', 'run-shirts']);

export function Photo({ name, alt, sizes = '100vw', className, eager = false }: { name: string; alt: string; sizes?: string; className?: string; eager?: boolean }) {
  const s = srcset(name, PORTRAIT.has(name));
  return <img className={className} src={s.src} srcSet={s.srcSet} sizes={sizes} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />;
}

export { site };
