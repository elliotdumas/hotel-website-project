// @ts-check
/* global process */
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Par défaut : le vrai domaine, à la racine. Pour l'aperçu GitHub Pages, le workflow
// .github/workflows/deploy-pages.yml définit SITE_URL et BASE_PATH (sous-dossier du dépôt).
const site = process.env.SITE_URL ?? 'https://www.hotel-coulisses-du-theatre.com';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-FR', en: 'en-GB', de: 'de-DE' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
