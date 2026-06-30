'use client';

import { ReactNode, useEffect, useState, startTransition } from 'react';
import { LanguageContext, Language } from './LanguageContext';

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('fr');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize language from localStorage or browser on mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language | null;

    if (storedLanguage && (storedLanguage === 'fr' || storedLanguage === 'en')) {
      startTransition(() => setLanguageState(storedLanguage));
    } else {
      const browserLang = navigator.language.toLowerCase();
      const detectedLang = browserLang.startsWith('en') ? 'en' : 'fr';
      startTransition(() => setLanguageState(detectedLang));
    }

    startTransition(() => setIsInitialized(true));
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('language', language);
    }
  }, [language, isInitialized]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
