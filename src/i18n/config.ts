export const locales = ['pl', 'en'] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  pl: 'Polski',
  en: 'English',
};

export const defaultLocale: Locale = 'pl';

export const isLocale = (value: string | undefined): value is Locale => {
  return Boolean(value && locales.some((locale) => locale === value));
};

export const resolveLocale = (value: string | undefined): Locale => {
  return isLocale(value) ? value : defaultLocale;
};
