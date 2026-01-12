'use client';

import { useState, useEffect, useCallback } from 'react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { CategorySection } from '@/components/CategorySection';
import { Header } from '@/components/Header';
import { Book, Language, Category } from '@/lib/types';
import { getBooks } from '@/lib/data';
import { BookOpen } from 'lucide-react';

const categoryOrder: Category[] = ['navshati', 'stotra', 'mantra', 'chalisa'];

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [language, setLanguage] = useState<Language>('mr');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
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

        {/* Categories - 4 Column Grid */}
        <main className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryOrder.map((category) => (
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
