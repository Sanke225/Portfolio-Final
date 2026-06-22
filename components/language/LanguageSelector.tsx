'use client';

import { useTranslation } from '@/lib/i18n/useTranslation';
import type { Language } from '@/lib/i18n/LanguageContext';

interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="inline-flex border-2 border-shadow dark:border-concrete bg-concrete dark:bg-shadow">
      {languages.map((lang, index) => {
        const isActive = language === lang.code;
        const isLast = index === languages.length - 1;

        return (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`
              px-3 py-2
              font-mono text-xs
              transition-colors duration-200
              ${isActive
                ? 'bg-terracotta text-concrete dark:bg-terracotta dark:text-concrete'
                : 'bg-concrete text-shadow hover:bg-dust dark:bg-shadow dark:text-concrete dark:hover:bg-gray-medium'
              }
              ${!isLast ? 'border-r-2 border-shadow dark:border-concrete' : ''}
            `}
            aria-label={`Switch to ${lang.label}`}
            aria-pressed={isActive}
          >
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true">{lang.flag}</span>
              <span className="font-semibold">{lang.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
