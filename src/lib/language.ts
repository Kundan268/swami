import { Language } from './types';

const LANGUAGE_STORAGE_KEY = 'book-catalog-language';

export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'mr';
  
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return (stored === 'mr' || stored === 'en') ? stored : 'mr';
  } catch {
    return 'mr';
  }
}

export function setStoredLanguage(language: Language): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Ignore localStorage errors
  }
}

export const languageLabels = {
  en: 'English',
  mr: 'मराठी'
} as const;
