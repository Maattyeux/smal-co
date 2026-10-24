# Site officiel SMAL & CO

Site statique : le contenu vit dans `content/*.json`, `node build.mjs` génère des pages HTML dans `dist/`. Aucun cookie, aucun appel à un service tiers.

## Lancer en local
```bash
npm install
npm run build        # génère dist/
npm run preview      # http://localhost:4173
SHOW_TODO=1 npm run build   # aperçu interne : affiche les badges « à valider »
```

## Publier sur GitHub Pages
1. Crée un dépôt, pousse ce dossier sur la branche `main`.
2. Réglages du dépôt → Pages → Source : **GitHub Actions**.
3. Chaque push redéploie le site (`.github/workflows/deploy.yml`).
4. Domaine propre : renseigne `SITE_URL` dans le workflow, vide `BASE_PATH`, ajoute le domaine dans Pages.

## Modifier le contenu sans code
Ouvre le dépôt dans [Pages CMS](https://pagescms.org) (connexion GitHub). La configuration est dans `.pages.yml`. Chaque enregistrement crée un commit et redéploie.
Limites : le dépôt est public (jamais de donnée privée), pas de prévisualisation avant publication, les droits d'édition sont ceux de GitHub.

## Interrupteurs (`content/site.json` → `flags`)
- `support.enabled` : affiche la page et le lien « Nous soutenir ». Activer **après** le dépôt des nouveaux statuts. `helloassoUrl` vide = bouton « Bientôt disponible ».
- `forms.enabled` + `forms.endpoint` : formulaire de contact (service externe gratuit type Formspree). Sans configuration, la page propose l'e-mail.

## À valider avant mise en ligne
- Textes des partenaires (`validated: false` dans `content/partners.json`) : accord de Hobby Cycles, Overstim.s, PG Tubes.
- Logo Hobby Cycles en haute définition (fichier actuel : 166 px, mentionne aussi Concarneau).
- Mentions légales : numéro RNA, SIRET (champs « à compléter »), adresse du siège.
- Statut de Maël : « Responsable » sur le site ; « Représentant » dans le PV et la déclaration.
- Catégories de l'équipe (Open 1, 2 ou 3 ?) : la page affiche « Open ».
- Aucun chiffre d'audience publié (comptes et périodes à clarifier).
- Fiches coureurs running : à publier avec l'accord écrit de chaque athlète et des résultats vérifiés (`content/teams.json` → `running.athletes`).
- Le numéro et l'e-mail personnels du Président sont publics sur la page Contact : à confirmer.

## Structure
```
content/    textes en JSON
public/     images, logos, polices, CSS, JS
src/        composants React rendus au build
build.mjs   générateur (esbuild + react-dom/server)
```
