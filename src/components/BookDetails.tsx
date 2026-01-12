'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Book, Language } from '@/lib/types';
import { getGoogleDriveDownloadUrl, getGoogleDriveViewUrl } from '@/lib/utils';
import { Download, ArrowLeft, Calendar, Eye } from 'lucide-react';
import Link from 'next/link';

interface BookDetailsProps {
  book: Book;
}

export function BookDetails({ book }: BookDetailsProps) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Get stored language preference
    const storedLanguage = localStorage.getItem('book-catalog-language') as Language;
    if (storedLanguage === 'mr' || storedLanguage === 'en') {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('book-catalog-language', newLanguage);
  };

  const downloadUrl = getGoogleDriveDownloadUrl(book.translations[language]);
  const viewUrl = getGoogleDriveViewUrl(book.translations[language]);

  const hasTranslation = book.translations.en !== book.translations.mr;

  const pageContent = {
    en: {
      backToCatalog: 'Back to Catalog',
      downloadPdf: 'Download PDF',
      viewOnline: 'View Online',
      year: 'Year',
      switchLanguage: 'Switch to Marathi Version',
      switchToEnglish: 'Switch to English Version'
    },
    mr: {
      backToCatalog: 'कॅटलॉगवर परत',
      downloadPdf: 'PDF डाउनलोड करा',
      viewOnline: 'ऑनलाइन पहा',
      year: 'वर्ष',
      switchLanguage: 'मराठी आवृत्तीवर स्विच करा',
      switchToEnglish: 'इंग्रजी आवृत्तीवर स्विच करा'
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header with back button and language toggle */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="outline" asChild className="border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {pageContent[language].backToCatalog}
          </Link>
        </Button>
        
        <LanguageToggle onLanguageChange={handleLanguageChange} />
      </div>

      {/* Book Details Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl mb-2">
            {book.title[language]}
          </CardTitle>
          <CardDescription className="text-lg">
            {book.description[language]}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Book Metadata */}
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <span className="text-sm text-muted-foreground">{pageContent[language].year}:</span>
              <p className="font-medium">{book.year}</p>
            </div>
          </div>

          {/* Language Version Switch */}
          {hasTranslation && (
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-sm text-orange-700 mb-2">
                This book is available in both languages:
              </p>
              <Button
                variant="outline"
                onClick={() => handleLanguageChange(language === 'en' ? 'mr' : 'en')}
                className="w-full sm:w-auto border-orange-300 text-orange-700 hover:bg-orange-100"
              >
                {language === 'en' ? pageContent[language].switchLanguage : pageContent[language].switchToEnglish}
              </Button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild size="lg" className="flex-1">
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Download className="h-5 w-5" />
                {pageContent[language].downloadPdf}
              </a>
            </Button>
            
            <Button variant="outline" asChild size="lg" className="flex-1 border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300">
              <a
                href={viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Eye className="h-5 w-5" />
                {pageContent[language].viewOnline}
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
