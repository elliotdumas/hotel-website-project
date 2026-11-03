import type { Locale } from './config';

/**
 * Plan du site : chaque page a une URL par langue.
 * Les URL françaises reprennent celles du site actuel pour préserver le référencement.
 */
export const routes = {
  home: { fr: '/', en: '/en/', de: '/de/' },
  hotel: { fr: '/lhotel/', en: '/en/the-hotel/', de: '/de/das-hotel/' },
  rooms: { fr: '/nos-chambres/', en: '/en/rooms/', de: '/de/zimmer/' },
  apartments: { fr: '/nos-appartements/', en: '/en/apartments/', de: '/de/apartments/' },
  bar: { fr: '/le-bar/', en: '/en/bar/', de: '/de/bar/' },
  services: { fr: '/nos-services/', en: '/en/services/', de: '/de/service/' },
  gallery: { fr: '/galerie-photos/', en: '/en/gallery/', de: '/de/galerie/' },
  discover: {
    fr: '/evenements-decouvertes/',
    en: '/en/events-and-discoveries/',
    de: '/de/veranstaltungen-und-ausfluege/',
  },
  seminars: { fr: '/seminaires/', en: '/en/meetings/', de: '/de/seminare/' },
  contact: { fr: '/nous-contacter/', en: '/en/contact/', de: '/de/kontakt/' },
  terms: {
    fr: '/conditions-generales-de-vente/',
    en: '/en/terms-and-conditions/',
    de: '/de/agb/',
  },
  privacy: {
    fr: '/politique-de-confidentialite/',
    en: '/en/privacy-policy/',
    de: '/de/datenschutz/',
  },
} as const satisfies Record<string, Record<Locale, string>>;

export type PageKey = keyof typeof routes;

export function url(page: PageKey, locale: Locale, hash?: string): string {
  return routes[page][locale] + (hash ? `#${hash}` : '');
}

/** Pages affichées dans la navigation principale, dans l'ordre. */
export const mainNav: PageKey[] = [
  'hotel',
  'rooms',
  'apartments',
  'bar',
  'services',
  'seminars',
  'discover',
  'gallery',
  'contact',
];
