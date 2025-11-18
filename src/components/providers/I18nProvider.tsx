import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createI18nInstance } from '../../i18n/i18next';
import type { Locale } from '../../i18n/config';

interface I18nProviderProps {
  children: React.ReactNode;
  locale: Locale;
}

const I18nProvider: React.FC<I18nProviderProps> = ({ children, locale }) => {
  const [i18n, setI18n] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initI18n = async () => {
      try {
        const instance = await createI18nInstance(locale);
        setI18n(instance);
      } catch (error) {
        console.error('Failed to initialize i18n:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initI18n();
  }, [locale]);

  if (isLoading || !i18n) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-slate-400">Loading translations...</div>
      </div>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};

export default I18nProvider;

