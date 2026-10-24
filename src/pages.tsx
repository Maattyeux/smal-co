import { href, asset, site, Photo, supportOn, formsOn, SHOW_TODO } from './lib';
import { Layout, Reveal, SplitWords, PageHead } from './ui';
import home from '../content/home.json';
import history from '../content/history.json';
import teams from '../content/teams.json';
import partners from '../content/partners.json';
import support from '../content/support.json';

const mail = (s = '') => `mailto:${site.contact.email}${s}`;
const Todo = ({ children }: { children: string }) => (SHOW_TODO ? <span className="todo">{children}</span> : null);

/* ───────────── Accueil ───────────── */
export function Home() {
  return (
    <Layout current="/" meta={{ title: 'Accueil', path: '/', description: site.description }}>
      <section className="hero">
        <Photo name="road-peloton" alt="Le peloton SMAL & CO en maillot violet sur une route bretonne" className="hero-img" eager sizes="100vw" />
        <div className="hero-shade" />
        <div className="wrap hero-in">
          <p className="eyebrow">{home.hero.eyebrow}</p>
          <h1 className="h-mega">
            {home.hero.title.map((l, i) => <span key={i} className="line"><span style={{ ['--i' as any]: i }}>{l}</span></span>)}
          </h1>
          <p className="lead hero-lead">{home.hero.lead}</p>
          <div className="cta-row">
            <a className="btn" href={href('/cyclisme/')}>Découvrir l'équipe</a>
            <a className="btn btn-ghost" href={href('/contact/')}>Devenir partenaire</a>
          </div>
        </div>
        <a className="scroll-cue" href="#manifeste" aria-label="Descendre"><i /></a>
      </section>

      <div className="ribbon" aria-hidden="true">
        <div className="ribbon-track">
          {[0, 1].map((k) => <ul key={k}>{home.ribbon.map((r) => <li key={r}>{r}</li>)}</ul>)}
        </div>
      </div>

      <section className="sec" id="manifeste">
        <div className="wrap">
          <p className="eyebrow">Manifeste</p>
          <p className="manifesto" data-words><SplitWords text={home.manifesto} /></p>
        </div>
      </section>

      <section className="sec sec-tight">
        <div className="wrap">
          <Reveal as="h2" className="h-lg">Trois terrains, une seule équipe</Reveal>
          <div className="poles">
            {home.poles.map((p, i) => (
              <Reveal key={p.id} delay={i * 90} className="pole-wrap">
                <a className="pole" href={href(p.href)}>
                  <Photo name={p.image} alt={p.alt} sizes="(min-width: 900px) 33vw, 100vw" />
                  <span className="pole-shade" />
                  <span className="pole-body">
                    <span className="pole-n">0{i + 1}</span>
                    <strong className="h-md">{p.title}</strong>
                    <span className="pole-t">{p.text}</span>
                    <span className="arrow" aria-hidden="true">→</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec numbers">
        <div className="wrap nums">
          {home.numbers.map((n, i) => (
            <Reveal key={i} delay={i * 80} className="num">
              <strong>
                {'value' in n ? <><span data-count={n.value}>{n.value}</span>{n.suffix}</> : n.text}
              </strong>
              <span>{n.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="gallery" aria-label="Galerie photo">
        <div className="gal-track" tabIndex={0} role="group" aria-label="Photos de l'équipe, défilement horizontal">
          {home.gallery.map((g) => (
            <figure key={g.image}><Photo name={g.image} alt={g.alt} sizes="(min-width: 900px) 40vw, 80vw" /></figure>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal as="h2" className="h-lg">Ce qui nous porte</Reveal>
          <ul className="values">
            {home.values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 60}>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec sec-tight">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">Ils nous accompagnent</Reveal>
          <ul className="logos">
            {partners.partners.map((p) => (
              <li key={p.id}><a href={href('/partenaires/')} aria-label={p.name}><img src={asset(`/logos/${p.logo}`)} alt={p.name} loading="lazy" /></a></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cta-final">
        <div className="wrap">
          <Reveal as="h2" className="h-xl">Construisons la suite.</Reveal>
          <Reveal as="p" className="lead">Partenaire, futur coureur, organisateur ou simple curieux : écrivez-nous.</Reveal>
          <Reveal className="cta-row">
            <a className="btn" href={href('/contact/')}>Nous contacter</a>
            {supportOn ? <a className="btn btn-ghost" href={href('/soutenir/')}>Nous soutenir</a> : null}
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}

/* ───────────── Histoire ───────────── */
export function Histoire() {
  return (
    <Layout current="/histoire/" meta={{ title: 'Notre histoire', path: '/histoire/', description: 'De l’assemblée constitutive de janvier 2026 à l’affiliation FFC : l’histoire de SMAL & CO, association sportive brestoise.', image: '/img/team-flag-1920.webp' }}>
      <PageHead eyebrow="Notre histoire" title="Quatre amis, une idée." lead={history.intro} />
      <section className="sec sec-tight">
        <div className="wrap">
          <ol className="timeline">
            {history.timeline.map((t, i) => (
              <Reveal as="li" key={i} className={t.status === 'objectif' ? 'is-goal' : ''}>
                <time>{t.date}</time>
                <h2 className="h-md">{t.title}{t.status === 'objectif' ? <small>Objectif</small> : null}</h2>
                <p>{t.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <Reveal as="h2" className="h-lg">Le bureau</Reveal>
          <ul className="founders">
            {history.founders.map((f, i) => (
              <Reveal as="li" key={f.name} delay={i * 70}>
                <span className="mono" aria-hidden="true">{f.name.split(' ').map((s) => s[0]).slice(0, 2).join('')}</span>
                <h3>{f.name}</h3>
                <p className="role">{f.role}</p>
                <p className="muted">{f.scope}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <section className="cta-final">
        <div className="wrap">
          <Reveal as="h2" className="h-lg">Un nom, une signature.</Reveal>
          <Reveal as="p" className="lead">« {site.signature} » : sortir du confort, lancer le projet, assumer l'ambition.</Reveal>
        </div>
      </section>
    </Layout>
  );
}

/* ───────────── Cyclisme ───────────── */
export function Cyclisme() {
  const t = teams.cyclisme;
  return (
    <Layout current="/cyclisme/" meta={{ title: 'Équipe cycliste', path: '/cyclisme/', description: 'L’équipe cycliste SMAL & CO, affiliée à la FFC depuis le 16 septembre 2026 : effectif, social rides à Brest et objectifs 2027.', image: '/img/team-studio-1920.webp' }}>
      <PageHead eyebrow="Pôle cyclisme" title={t.title} lead={t.lead} />
      <section className="band"><Photo name="road-group" alt="Cinq coureurs SMAL & CO roulant de front" sizes="100vw" eager /></section>
      <section className="sec">
        <div className="wrap cols">
          <dl className="facts">
            {t.facts.map((f) => <Reveal key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></Reveal>)}
          </dl>
          <div className="prose">
            {t.paragraphs.map((p, i) => <Reveal as="p" key={i}>{p}</Reveal>)}
          </div>
        </div>
      </section>
      <section className="sec sec-tight">
        <div className="wrap">
          <Reveal as="h2" className="h-lg">Les objectifs</Reveal>
          <ul className="goals">{t.goals.map((g, i) => <Reveal as="li" key={i} delay={i * 60}>{g}</Reveal>)}</ul>
        </div>
      </section>
      <section className="mosaic">
        {t.images.map((n, i) => <Photo key={n} name={n} alt={['Peloton de front', 'Virage en groupe', 'L’équipe sur le littoral', 'L’équipe face à la mer'][i]} sizes="(min-width: 900px) 25vw, 50vw" />)}
      </section>
      <section className="cta-final">
        <div className="wrap">
          <Reveal as="h2" className="h-lg">Envie de rouler avec nous ?</Reveal>
          <Reveal as="p" className="lead">Les social rides partent de Hobby Cycles, à Brest, environ une fois par quinzaine. Suivez les annonces sur Instagram.</Reveal>
          <Reveal className="cta-row">
            <a className="btn" href={site.contact.instagram} target="_blank" rel="noopener">Voir les prochaines sorties</a>
            <a className="btn btn-ghost" href={href('/contact/')}>Rejoindre l'équipe</a>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}

/* ───────────── Running ───────────── */
export function Running() {
  const t = teams.running;
  return (
    <Layout current="/running/" meta={{ title: 'Section running et trail', path: '/running/', description: 'La section running et trail de SMAL & CO : un collectif de coureurs en construction à Brest. Rejoignez les premiers membres.', image: '/img/run-group-1920.webp' }}>
      <PageHead eyebrow="Pôle running & trail" title={t.title} lead={t.lead} />
      <section className="band"><Photo name="run-310-city" alt="Coureur SMAL & CO en course dans une rue de ville" sizes="100vw" eager /></section>
      <section className="sec">
        <div className="wrap cols">
          <div className="status-card">
            <p className="eyebrow">Statut</p>
            <h2 className="h-md">En construction</h2>
            <p className="muted">La section démarre avec ses premiers membres. Les profils et les résultats des athlètes seront publiés avec leur accord et après vérification des classements officiels.</p>
          </div>
          <div className="prose">{t.paragraphs.map((p, i) => <Reveal as="p" key={i}>{p}</Reveal>)}</div>
        </div>
      </section>
      {t.athletes.length ? null : (
        <section className="sec sec-tight">
          <div className="wrap">
            <Reveal as="h2" className="h-lg">Les coureurs</Reveal>
            <Reveal as="p" className="lead">Les premières fiches arrivent. Chaque athlète sera présenté avec son accord, ses résultats vérifiés et son objectif.</Reveal>
          </div>
        </section>
      )}
      <section className="sec sec-tight">
        <div className="wrap">
          <Reveal as="h2" className="h-lg">Les objectifs</Reveal>
          <ul className="goals">{t.goals.map((g, i) => <Reveal as="li" key={i} delay={i * 60}>{g}</Reveal>)}</ul>
        </div>
      </section>
      <section className="mosaic">
        {t.images.map((n, i) => <Photo key={n} name={n} alt={['Coureur en ville', 'Membres de SMAL & CO réunis', 'Groupe de coureurs en noir et blanc', 'Coureur sur un marathon'][i]} sizes="(min-width: 900px) 25vw, 50vw" />)}
      </section>
      <section className="cta-final">
        <div className="wrap">
          <Reveal as="h2" className="h-lg">Tu cours ? Viens nous le dire.</Reveal>
          <Reveal as="p" className="lead">Route, trail court ou long : nous cherchons des profils motivés pour écrire le début de l'histoire.</Reveal>
          <Reveal className="cta-row"><a className="btn" href={href('/contact/')}>Rejoindre la section</a></Reveal>
        </div>
      </section>
    </Layout>
  );
}

/* ───────────── Partenaires ───────────── */
export function Partenaires() {
  return (
    <Layout current="/partenaires/" meta={{ title: 'Partenaires', path: '/partenaires/', description: 'Les entreprises qui accompagnent SMAL & CO : Hobby Cycles, Overstim.s, PG Tubes. Devenez partenaire de l’association.' }}>
      <PageHead eyebrow="Partenaires" title="Ils jouent collectif." lead={partners.intro} />
      <section className="sec sec-tight">
        <div className="wrap">
          <ul className="partners">
            {partners.partners.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 80}>
                <div className="p-logo"><img src={asset(`/logos/${p.logo}`)} alt={p.name} loading="lazy" /></div>
                <p className="eyebrow">{p.role}</p>
                <h2 className="h-md">{p.name}</h2>
                <p>{p.text}</p>
                {!p.validated ? <Todo>Texte à valider par le partenaire</Todo> : null}
                {p.url ? <a className="link" href={p.url} target="_blank" rel="noopener">Visiter le site</a> : null}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <section className="cta-final">
        <div className="wrap">
          <Reveal as="h2" className="h-lg">Rejoignez-les.</Reveal>
          <Reveal as="p" className="lead">{partners.cta}</Reveal>
          <Reveal className="cta-row">
            <a className="btn" href={mail('?subject=Partenariat%20SMAL%20%26%20CO')}>Écrire à l'association</a>
            <a className="btn btn-ghost" href={href('/contact/')}>Voir les contacts</a>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}

/* ───────────── Nous soutenir (interrupteur : content/site.json → flags.support.enabled) ───────────── */
export function Soutenir() {
  const url = site.flags.support.helloassoUrl;
  return (
    <Layout current="/soutenir/" meta={{ title: support.title, path: '/soutenir/', description: 'Soutenez SMAL & CO : don en ligne, partenariat d’entreprise ou engagement dans l’équipe.', noindex: !supportOn }}>
      <PageHead eyebrow="Nous soutenir" title={support.title} lead={support.lead} />
      <section className="sec sec-tight">
        <div className="wrap">
          <Reveal as="h2" className="h-lg">À quoi sert votre soutien</Reveal>
          <ul className="uses">{support.uses.map((u, i) => <Reveal as="li" key={u.title} delay={i * 60}><h3>{u.title}</h3><p>{u.text}</p></Reveal>)}</ul>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <Reveal as="h2" className="h-lg">Trois façons d'agir</Reveal>
          <ul className="ways">
            {support.ways.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 80}>
                <h3 className="h-md">{w.title}</h3>
                <p>{w.text}</p>
                {w.action === 'donate' ? (url ? <a className="btn" href={url} rel="noopener" target="_blank">Faire un don</a> : <span className="btn btn-off" aria-disabled="true">Bientôt disponible</span>)
                  : w.action === 'partner' ? <a className="btn btn-ghost" href={mail('?subject=Partenariat%20SMAL%20%26%20CO')}>Parler partenariat</a>
                  : <a className="btn btn-ghost" href={href('/contact/')}>Nous rejoindre</a>}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}

/* ───────────── Contact ───────────── */
export function Contact() {
  const p = site.contact.president;
  return (
    <Layout current="/contact/" meta={{ title: 'Contact', path: '/contact/', description: 'Contacter SMAL & CO : partenariats, adhésion, événements, presse.' }}>
      <PageHead eyebrow="Contact" title="Parlons-en." lead="Un projet de partenariat, l'envie de rejoindre l'équipe, une question presse : on répond vite." />
      <section className="sec sec-tight">
        <div className="wrap cols">
          <div className="cards">
            <Reveal className="card"><h2 className="h-md">L'association</h2>
              <p><a className="link" href={mail()}>{site.contact.email}</a></p>
              <p><a className="link" href={site.contact.instagram} target="_blank" rel="noopener">Instagram {site.contact.instagramHandle}</a></p>
            </Reveal>
            <Reveal className="card" delay={80}><h2 className="h-md">{p.name}</h2><p className="muted">{p.role}</p>
              <p><a className="link" href={`mailto:${p.email}`}>{p.email}</a></p>
              <p><a className="link" href={`tel:+33${p.phone.replace(/\s/g, '').slice(1)}`}>{p.phone}</a></p>
              <p className="muted">Pour les partenariats et les projets d'événements.</p>
            </Reveal>
          </div>
          {formsOn ? (
            <form className="form" action={site.flags.forms.endpoint!} method="POST">
              <label>Nom<input name="nom" required autoComplete="name" /></label>
              <label>E-mail<input name="email" type="email" required autoComplete="email" /></label>
              <label>Sujet
                <select name="sujet"><option>Partenariat</option><option>Rejoindre l'équipe</option><option>Événement</option><option>Presse</option><option>Autre</option></select>
              </label>
              <label>Message<textarea name="message" rows={6} required /></label>
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
              <label className="check"><input type="checkbox" name="consentement" required /> J'accepte que mes données servent à répondre à ma demande (<a href={href('/mentions-legales/')}>en savoir plus</a>).</label>
              <button className="btn" type="submit">Envoyer</button>
            </form>
          ) : (
            <div className="card">
              <h2 className="h-md">Écrivez-nous</h2>
              <p className="muted">Le moyen le plus simple : un e-mail à l'association.</p>
              <a className="btn" href={mail()}>Envoyer un e-mail</a>
              <Todo>Formulaire désactivé : renseigner flags.forms.endpoint dans content/site.json</Todo>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

/* ───────────── Mentions légales ───────────── */
export function Mentions() {
  const l = site.legal;
  return (
    <Layout current="/mentions-legales/" meta={{ title: 'Mentions légales et confidentialité', path: '/mentions-legales/', description: 'Mentions légales, hébergement et politique de confidentialité du site SMAL & CO.' }}>
      <PageHead eyebrow="Informations légales" title="Mentions légales" />
      <section className="sec sec-tight">
        <div className="wrap legal">
          <h2>Éditeur</h2>
          <p>Association SMAL, exerçant sous le nom d'usage « SMAL & CO », association déclarée régie par la loi du 1er juillet 1901.<br />
            Siège : {l.headquarters}.<br />
            Numéro RNA : {l.rna ?? <em className="todo-inline">à compléter</em>} · SIRET : {l.siret ?? <em className="todo-inline">à compléter</em>}.<br />
            Directeur de la publication : {l.publicationDirector}.<br />
            Contact : <a href={mail()}>{site.contact.email}</a>.</p>
          <h2>Hébergement</h2>
          <p>{l.host}.</p>
          <h2>Données personnelles et cookies</h2>
          <p>Ce site ne dépose aucun cookie et n'utilise aucun outil de mesure d'audience. Les polices sont hébergées sur le site : aucune requête n'est envoyée à un service tiers au chargement des pages.</p>
          <p>Si vous nous écrivez par e-mail ou par formulaire, vos données (nom, adresse e-mail, message) servent uniquement à répondre à votre demande. Elles ne sont ni vendues ni transmises. Vous pouvez demander leur accès, leur rectification ou leur suppression à <a href={mail()}>{site.contact.email}</a>.</p>
          <p>Lorsqu'un service de don en ligne est activé, le paiement est traité par le prestataire indiqué sur la page, qui est responsable de ces données.</p>
          <h2>Propriété intellectuelle</h2>
          <p>Les textes, logos, visuels et photographies sont la propriété de l'association ou de leurs auteurs. Les logos des partenaires appartiennent à leurs titulaires et sont affichés avec leur accord. Toute reproduction sans autorisation est interdite.</p>
        </div>
      </section>
    </Layout>
  );
}

export function NotFound() {
  return (
    <Layout current="" meta={{ title: 'Page introuvable', path: '/404.html', description: 'Page introuvable.', noindex: true }}>
      <PageHead eyebrow="Erreur 404" title="Hors parcours." lead="Cette page n'existe pas ou a changé d'adresse." />
      <section className="sec sec-tight"><div className="wrap"><a className="btn" href={href('/')}>Retour à l'accueil</a></div></section>
    </Layout>
  );
}
