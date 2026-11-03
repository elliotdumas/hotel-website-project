# CLAUDE.md — Refonte du site de l'Hôtel Les Coulisses du Théâtre

Ce fichier guide Claude Code sur ce projet : refaire de façon plus moderne le site
https://www.hotel-coulisses-du-theatre.com/.

## Objectif du projet

Remplacer le site actuel par un site vitrine **rapide, élégant, multilingue et orienté réservation directe**.
Ce qui compte :
1. **Augmenter les réservations directes**, avec le « meilleur tarif garanti » sur le site officiel plutôt que sur les OTA.
2. Garder une ambiance **« cosy et raffinée »** inspirée du théâtre (coulisses, rideau, entracte, scène).
3. Viser un **score Lighthouse ≥ 95** sur les quatre axes, une conformité **RGPD** et une accessibilité **WCAG 2.2 AA**.
4. Rendre le contenu **facile à mettre à jour** (chambres, événements, tarifs indicatifs, photos).

## Informations de l'établissement (source : site actuel)

| Élément | Valeur |
|---|---|
| Nom | Hôtel Les Coulisses du Théâtre ★★★ |
| Adresse | 8 rue de la Comédie, 02100 Saint-Quentin, France |
| GPS | 49.846108, 3.286268 |
| Téléphones | +33 (0)3 23 67 90 09 / +33 (0)6 98 33 38 10 |
| E-mail | **À compléter** (absent du site actuel) |
| Accroche | « Bienvenue dans un univers cosy et raffiné » |
| Chambres | 32 chambres climatisées et insonorisées (Supérieure, Privilège en rez-de-chaussée, etc.) **— inventaire complet à fournir** |
| Autres hébergements | Appartements (page dédiée) |
| Bar | Bar l'Entracte : terrasse ensoleillée, boissons chaudes, cocktails, vins, snacks |
| Services | Wi-Fi haut débit gratuit, petit-déjeuner généreux (terrasse aux beaux jours), piscine chauffée et espace bien-être, conciergerie, parking privé sécurisé, bornes de recharge pour véhicules électriques, salles de séminaire |
| Boutique | Bons cadeaux sur https://lescoulissessaintquentin.shop.bonkdo.com/fr/bons-cadeaux (externe, à conserver) |
| À proximité | Théâtre Jean-Vilar, Basilique de Saint-Quentin, Parc d'Isle, Musée Antoine-Lécuyer. Accès facile depuis Paris, Lille et Amiens |
| Clientèle | Voyageurs d'affaires, week-ends en amoureux, touristes |
| Réseaux | [Instagram](https://www.instagram.com/hotel_lescoulisses/) · [Facebook](https://www.facebook.com/profile.php?id=61572319170386) · [LinkedIn](https://www.linkedin.com/company/les-coulisses-du-th%C3%A9%C3%A2tre-h%C3%B4tel/) |
| Hashtags | #LesCoulissesDuThéâtre #HôtelDeCharme |

> Ne jamais inventer de données factuelles (tarifs, nombre de chambres par catégorie, horaires,
> mentions légales, avis clients). Si une information manque, mettre un `TODO:` visible dans le
> contenu et le signaler.

## Stack technique

- **Framework :** [Astro](https://astro.build) (pages statiques, très peu de JavaScript, SEO excellent, i18n natif)
- **Langage :** TypeScript en mode strict
- **Styles :** Tailwind CSS, avec les tokens de design dans `tailwind.config` et des variables CSS
- **Contenu :** Astro Content Collections, en Markdown/MDX avec un schéma Zod (`src/content/`)
- **Images :** `astro:assets`, avec AVIF/WebP, `srcset` responsive, lazy-loading et des dimensions explicites
- **Interactivité :** îlots seulement si nécessaire (galerie lightbox, sélecteur de dates), en vanilla TS ou Preact
- **Formulaires :** contact et demande de séminaire via un service serverless (à définir : Netlify Forms, Formspree, etc.), avec une protection anti-spam (honeypot et Turnstile)
- **Hébergement :** à définir (Netlify, Vercel ou OVH), avec un déploiement statique
- **Gestionnaire de paquets :** `pnpm`

Si la stack change, mettre ce fichier à jour.

## Commandes

```bash
pnpm install        # installer les dépendances
pnpm dev            # serveur de dev sur http://localhost:4321
pnpm build          # build de production dans dist/
pnpm preview        # prévisualiser le build
pnpm lint           # ESLint + Prettier
pnpm check          # astro check (types)
```

Avant de considérer une tâche terminée : `pnpm check && pnpm lint && pnpm build` doivent passer.

## Arborescence prévue

```
src/
  components/      # composants .astro réutilisables (Header, Footer, RoomCard, BookingBar…)
  layouts/         # BaseLayout (SEO, meta, JSON-LD), PageLayout
  pages/
    index.astro            # FR par défaut
    en/…                   # anglais
    de/…                   # allemand
  content/
    rooms/         # une fiche par catégorie de chambre
    apartments/
    events/        # événements & découvertes (ex. vente d'artisanat marocain)
    pages/         # textes éditoriaux
  i18n/            # dictionnaires d'interface fr.json, en.json, de.json
  styles/          # global.css, tokens
public/            # favicon, robots.txt, images non optimisées
```

## Plan du site et redirections

Conserver la structure des URL actuelles en français, ou poser des **redirections 301** pour ne pas perdre le référencement :

| Page | URL actuelle |
|---|---|
| Accueil | `/` |
| L'hôtel | `/lhotel/` |
| Nos chambres | `/nos-chambres/` |
| Nos appartements | `/nos-appartements/` |
| Le bar (l'Entracte) | `/le-bar/` |
| Nos services | `/nos-services/` |
| Galerie photos | `/galerie-photos/` |
| Évènements & découvertes | `/evenements-decouvertes/` |
| Séminaires | `/seminaires/` |
| Contact / Comment venir | `/nous-contacter/` |
| CGV | `/conditions-generales-de-vente/` |
| Mentions légales & confidentialité | `/politique-de-confidentialite/` |
| Anglais | `/en/home/` → `/en/` |
| Allemand | `/de/willkommen/` → `/de/` |

Tenir la liste complète des redirections dans le fichier de configuration de l'hébergeur (`_redirects`, `vercel.json`, etc.).

## Direction artistique

- **Référence visuelle :** `assets-source/inspiration/maquette-mobile-reference.webp` est une maquette mobile d'un autre hôtel, fournie comme **inspiration de mise en page uniquement**. À reprendre : le hero plein écran avec le titre en serif, l'alternance de fonds crème et brun foncé, les grandes photos pleine largeur, les chiffres clés, le carrousel des chambres et les sections empilées (restaurant, spa, piscine, lounge, activités) avec leur petit lien. Ne copier ni ses textes, ni ses photos, ni sa marque.
- **Ambiance :** l'élégance chaleureuse d'un théâtre à l'italienne. On peut s'inspirer d'un rideau de velours, de dorures discrètes et de lumières tamisées, sans tomber dans le kitsch.
- **Palette proposée** (à valider avec le client, le site actuel n'en définit pas) :
  - `--color-velours` : rouge bordeaux profond (accent principal, CTA)
  - `--color-or` : or patiné (détails, filets, icônes)
  - `--color-nuit` : bleu nuit ou anthracite (textes, fonds sombres)
  - `--color-creme` : crème ou ivoire (fond principal)
- **Typographie :** un serif élégant pour les titres (par ex. *Cormorant Garamond* ou *Playfair Display*) et un sans-serif lisible pour le texte (*Inter* ou *DM Sans*). Les polices sont auto-hébergées (`@fontsource`), sans appel à Google Fonts, pour le RGPD.
- **Vocabulaire théâtral** possible dans les intitulés, à petite dose : « Entracte », « En coulisses », « Votre scène », etc.
- **Photos :** elles doivent être grandes, immersives et en plein écran sur l'accueil. Ne jamais utiliser de photos de banque d'images à la place de vraies photos de l'hôtel sans accord.
- **Animations :** sobres (fondu, léger parallaxe) et respectueuses de `prefers-reduced-motion`.
- **Mobile first :** la majorité du trafic hôtelier vient du mobile. Prévoir une barre « Réserver » collante en bas d'écran sur mobile.

## Réservation

- Le site actuel a un widget avec les champs dates, chambres, adultes et enfants, mais ses boutons pointent vers `#`.
- **Moteur de réservation : à identifier avec le client** (D-Edge, Reservit, Amenitiz, Thais, etc.). Intégrer son lien profond (deep link) en passant les dates et le nombre de personnes en paramètres.
- Chaque page doit avoir un CTA « Réserver » visible. Ajouter aussi des boutons « Appeler » (`tel:`) et « Itinéraire » (lien Google Maps ou OpenStreetMap).
- Mettre en avant les arguments de la réservation directe : meilleur tarif garanti, parking, etc.

## SEO et données structurées

- Chaque page a un `<title>` et une meta description uniques, dans chaque langue.
- Mettre des balises `hreflang` (fr, en, de, x-default) et une URL canonique.
- Ajouter du JSON-LD `Hotel` (schema.org) : adresse, géolocalisation, téléphone, `starRating`, `amenityFeature`, `checkinTime`/`checkoutTime` (à compléter), `priceRange`.
- Générer un sitemap avec `@astrojs/sitemap` et ajouter un `robots.txt`.
- Préparer des balises Open Graph et Twitter Card avec une image par page.
- Cibler le SEO local : « hôtel Saint-Quentin », « hôtel centre-ville Saint-Quentin », « hôtel proche théâtre Jean-Vilar », « séminaire Saint-Quentin Aisne ».
- Garder la cohérence avec la fiche Google Business Profile (nom, adresse et téléphone identiques).

## Multilingue

- Le français est la langue par défaut, à la racine. L'anglais est sous `/en/` et l'allemand sous `/de/`.
- Tous les textes d'interface passent par `src/i18n/*.json`. **Aucune chaîne en dur dans les composants.**
- Le contenu éditorial est traduit fichier par fichier. Si une traduction manque, afficher la version française et ajouter un `TODO` de traduction.
- Le sélecteur de langue renvoie vers la page équivalente, pas vers l'accueil.

## Performance et accessibilité

- Budget : LCP < 2 s en 4G, CLS < 0,05, moins de 50 Ko de JS par page.
- Précharger l'image hero et les polices critiques.
- Le site doit rester utilisable sans JavaScript (navigation, contenu, liens de réservation).
- Le contraste doit être conforme AA, la navigation possible au clavier et le focus visible. Toutes les images informatives ont un `alt` descriptif (en FR, EN et DE).
- La carte est chargée seulement au clic (façade), pour la performance et le RGPD.

## RGPD et mentions légales

- Bandeau cookies conforme CNIL, uniquement si des traceurs non exemptés sont utilisés. Préférer une mesure d'audience exemptée (Plausible, Matomo configuré en mode exempté).
- Pas d'embed tiers (Google Maps, Instagram, YouTube) chargé avant le consentement.
- Les mentions légales doivent indiquer la raison sociale, le SIRET, le directeur de publication et l'hébergeur. **Ces informations sont à fournir par le client, ne pas les inventer.**
- Conserver les CGV et la politique de confidentialité en les remettant en forme.

## Conventions de code

- Les composants sont en PascalCase (`RoomCard.astro`) et les fichiers de contenu en kebab-case (`chambre-superieure.md`).
- On écrit du HTML sémantique (`header`, `nav`, `main`, `section`, `footer`) avec une seule balise `h1` par page.
- Utiliser des classes Tailwind et extraire un composant dès qu'un motif se répète trois fois.
- Les commentaires de code sont en français ou en anglais, au choix, mais de façon cohérente dans un même fichier.
- Les commits sont courts et descriptifs, en français (par ex. `feat: page chambres`, `fix: contraste bouton réserver`).

## Informations à demander au client

- [ ] Logo en version vectorielle et charte graphique, s'il en existe une
- [ ] Photos haute définition (chambres, bar, piscine, façade, petit-déjeuner)
- [ ] Liste exacte des catégories de chambres et appartements : surface, lits, équipements, capacité
- [ ] Moteur de réservation utilisé et lien profond
- [ ] Adresse e-mail de contact
- [ ] Horaires : check-in/check-out, bar, petit-déjeuner, piscine
- [ ] Prix du petit-déjeuner, du parking et des animaux
- [ ] Capacités et équipements des salles de séminaire
- [ ] Mentions légales complètes et hébergeur choisi
- [ ] Avis clients autorisés (widget TripAdvisor ou Google, ou citations sélectionnées)
