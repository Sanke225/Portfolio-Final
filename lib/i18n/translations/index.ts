import fr from './fr.json';
import en from './en.json';

export const translations = {
  fr,
  en,
};

export type TranslationKey = string;
export type Translations = typeof translations;
