import { useState, useEffect } from 'react';
import { Translations } from './translations';
import { ru } from './ru';
import { en } from './en';

export const translations: Record<string, Translations> = {
  ru,
  en
};

export type Language = 'ru' | 'en';

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>('ru');

  useEffect(() => {
    // Загружаем сохраненный язык из localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = translations[language];

  return {
    t,
    language,
    changeLanguage
  };
};
