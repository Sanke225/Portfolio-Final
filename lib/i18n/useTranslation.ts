'use client';

import { useContext } from 'react';
import { LanguageContext, Language } from './LanguageContext';
import { translations, TranslationKey } from './translations';

export interface UseTranslationReturn {
  t: (key: TranslationKey, variables?: Record<string, any>) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export function useTranslation(): UseTranslationReturn {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }

  const { language, setLanguage } = context;

  const t = (key: TranslationKey, variables?: Record<string, any>): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback: return the key if translation is missing
        return key;
      }
    }

    // If final value is not a string, return the key
    if (typeof value !== 'string') {
      return key;
    }

    // Replace variables in the translation string
    if (variables) {
      return value.replace(/\{(\w+)\}/g, (match, varName) => {
        return variables[varName] !== undefined ? String(variables[varName]) : match;
      });
    }

    return value;
  };

  return {
    t,
    language,
    setLanguage,
  };
}
