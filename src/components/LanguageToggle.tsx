'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Language } from '@/lib/types';
import { getStoredLanguage, setStoredLanguage } from '@/lib/language';

interface LanguageToggleProps {
  onLanguageChange: (language: Language) => void;
}

export function LanguageToggle({ onLanguageChange }: LanguageToggleProps) {
  const [language, setLanguage] = useState<Language>('mr');

  useEffect(() => {
    const storedLanguage = getStoredLanguage();
    setLanguage(storedLanguage);
    onLanguageChange(storedLanguage);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync once on mount
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'mr' : 'en';
    setLanguage(newLanguage);
    setStoredLanguage(newLanguage);
    onLanguageChange(newLanguage);
  };

  return (
    <Button
      variant="outline"
      onClick={toggleLanguage}
      aria-label={language === 'mr' ? 'Switch to English' : 'Switch to Marathi'}
      className="min-h-12 min-w-[180px] px-6 text-base font-semibold border-2 border-orange-300 text-orange-800 bg-white hover:bg-orange-50 hover:border-orange-400"
    >
      {language === 'mr' ? 'Read in English' : 'मराठीत वाचा'}
    </Button>
  );
}
