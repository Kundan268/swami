'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { CategorySection } from '@/components/CategorySection';
import { Header } from '@/components/Header';
import { Book, BookCatalog, Language, categoryOrder } from '@/lib/types';
import { BookOpen } from 'lucide-react';

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [presentCategories, setPresentCategories] = useState<BookCatalog['presentCategories']>([]);
  const [language, setLanguage] = useState<Language>('mr');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await fetch('/api/books');
        if (!response.ok) {
          throw new Error(`Failed to load books: ${response.statusText}`);
        }
        const catalog = (await response.json()) as BookCatalog;
        setBooks(catalog.books ?? []);
        setPresentCategories(catalog.presentCategories ?? []);
      } catch (error) {
        console.error('Error loading books:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const handleLanguageChange = useCallback((newLanguage: Language) => {
    setLanguage(newLanguage);
  }, []);

  const visibleCategories = useMemo(() => {
    const present = new Set(presentCategories);
    return categoryOrder.filter((category) => present.has(category));
  }, [presentCategories]);

  const pageContent = {
    en: {
      loading: 'Loading books...'
    },
    mr: {
      loading: 'पुस्तके लोड होत आहेत...'
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">{pageContent[language].loading}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Sacred Header */}
      <Header language={language} />
      
      {/* Language Toggle */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <LanguageToggle onLanguageChange={handleLanguageChange} />
        </div>

        <main className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleCategories.map((category) => (
              <CategorySection
                key={category}
                category={category}
                books={books}
                language={language}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
