import es from './es.json';
import en from './en.json';
import fr from './fr.json';

const translations = {
  es,
  en,
  fr
} as const;

export type Locale = keyof typeof translations;

export const defaultLocale: Locale = 'en';

export function getLocale(url: URL): Locale {
  const pathname = url.pathname;
  const locale = pathname.split('/')[1] as Locale;

  if (locale in translations) {
    return locale;
  }

  return defaultLocale;
}

export function useTranslations(locale: Locale = defaultLocale) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: any = translations[locale];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key} for locale: ${locale}`);
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };
}

export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === defaultLocale) {
    return path;
  }

  return `/${locale}${path}`;
}

export const languages = [
  { code: 'es', label: 'Español', flag: 'ES' },
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'fr', label: 'Français', flag: 'FR' },
] as const;
