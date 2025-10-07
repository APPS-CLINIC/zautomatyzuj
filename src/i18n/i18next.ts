import { createInstance, type Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { defaultLocale, type Locale } from './config';

const dictionaryLoaders = {
  en: () => import('./locales/en'),
  pl: () => import('./locales/pl'),
} as const;

export type Dictionary = typeof import('./locales/en').dictionary;

export const createI18nInstance = async (locale: Locale) => {
  const instance = createInstance();

  const { dictionary: activeDictionary } = await dictionaryLoaders[locale]();

  const resources: Resource = {
    [locale]: { translation: activeDictionary },
  };

  if (locale !== defaultLocale) {
    const { dictionary: fallbackDictionary } = await dictionaryLoaders[defaultLocale]();
    resources[defaultLocale] = { translation: fallbackDictionary };
  }

  await instance.use(initReactI18next).init({
    resources,
    lng: locale,
    fallbackLng: defaultLocale,
    interpolation: { escapeValue: false },
    ns: ['translation'],
    defaultNS: 'translation',
    returnNull: false,
  });

  return instance;
};
