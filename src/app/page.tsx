'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { CategorySection } from '@/components/CategorySection';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { Book, BookCatalog, Language, categoryOrder } from '@/lib/types';
import { BookOpen } from 'lucide-react';

function matchesSearch(book: Book, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  // Same idea as Drive "English__Marathi.pdf" — one string covers both languages
  const searchable = `${book.title.en}__${book.title.mr}`.toLowerCase();
  return searchable.includes(q);
}

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [presentCategories, setPresentCategories] = useState<BookCatalog['presentCategories']>([]);
  const [language, setLanguage] = useState<Language>('mr');
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const filteredBooks = useMemo(
    () => books.filter((book) => matchesSearch(book, searchQuery)),
    [books, searchQuery]
  );

  const visibleCategories = useMemo(() => {
    const present = new Set(presentCategories);
    const withMatches = new Set(filteredBooks.map((book) => book.category));
    return categoryOrder.filter(
      (category) => present.has(category) && withMatches.has(category)
    );
  }, [presentCategories, filteredBooks]);

  const pageContent = {
    en: {
      loading: 'Loading books...',
      noResults: 'No books match your search.',
    },
    mr: {
      loading: 'पुस्तके लोड होत आहेत...',
      noResults: 'आपल्या शोधाशी जुळणारी पुस्तके नाहीत.',
    },
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
            <p className="text-lg text-muted-foreground">{pageContent[language].loading}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header language={language} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6 mb-8">
          <SearchBar value={searchQuery} onSearch={handleSearch} />
          <LanguageToggle onLanguageChange={handleLanguageChange} />
        </div>

        <main className="w-full">
          {visibleCategories.length === 0 ? (
            <p className="text-center text-lg text-muted-foreground py-8">
              {pageContent[language].noResults}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleCategories.map((category) => (
                <CategorySection
                  key={category}
                  category={category}
                  books={filteredBooks}
                  language={language}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
