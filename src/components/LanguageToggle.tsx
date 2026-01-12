'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Language } from '@/lib/types';
import { getStoredLanguage, setStoredLanguage, languageLabels } from '@/lib/language';

interface LanguageToggleProps {
  onLanguageChange: (language: Language) => void;
}

export function LanguageToggle({ onLanguageChange }: LanguageToggleProps) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const storedLanguage = getStoredLanguage();
    setLanguage(storedLanguage);
    onLanguageChange(storedLanguage);
  }, []); // Remove onLanguageChange from dependencies

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
      className="min-w-[100px] border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300"
    >
      {languageLabels[language]}
    </Button>
  );
}
