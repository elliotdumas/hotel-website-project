import fr from './fr.json';
import en from './en.json';
import de from './de.json';

export const locales = ['fr', 'en', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  de: 'Deutsch',
};

export const htmlLang: Record<Locale, string> = { fr: 'fr-FR', en: 'en-GB', de: 'de-DE' };
export const ogLocale: Record<Locale, string> = { fr: 'fr_FR', en: 'en_GB', de: 'de_DE' };

export type Dictionary = typeof fr;
const dictionaries: Record<Locale, Dictionary> = { fr, en, de };

/** Dictionnaire complet d'une langue (textes d'interface et textes des pages). */
export function useTranslations(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Texte localisé stocké dans les fichiers de contenu : { fr, en, de }. */
export type Localized<T = string> = Record<Locale, T>;

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value[defaultLocale];
}

export { format } from './format';
