'use client';

import { useState } from 'react';
import { Book, Language, Category, categoryLabels } from '@/lib/types';
import { BookLink } from './BookLink';

interface CategorySectionProps {
  category: Category;
  books: Book[];
  language: Language;
}

const INITIAL_BOOKS_TO_SHOW = 2;

export function CategorySection({ category, books, language }: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const categoryBooks = books.filter(book => book.category === category);
  const categoryLabel = categoryLabels[category][language];
  
  const hasMoreBooks = categoryBooks.length > INITIAL_BOOKS_TO_SHOW;
  const booksToShow = isExpanded || !hasMoreBooks 
    ? categoryBooks 
    : categoryBooks.slice(0, INITIAL_BOOKS_TO_SHOW);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold text-orange-800 mb-3 pb-2 border-b-2 border-orange-300">
        {categoryLabel}
      </h2>
      <div className="space-y-0.5 flex-1">
        {categoryBooks.length === 0 ? (
          <p className="text-sm text-muted-foreground italic py-2">
            {language === 'en' ? 'No books available' : 'पुस्तके उपलब्ध नाहीत'}
          </p>
        ) : (
          <>
            {booksToShow.map((book, index) => (
              <div key={book.id} className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground font-medium flex-shrink-0">
                  {index + 1}.
                </span>
                <BookLink
                  book={book}
                  language={language}
                />
              </div>
            ))}
            
            {hasMoreBooks && (
              <button
                onClick={toggleExpand}
                className="mt-2 text-sm text-orange-600 hover:text-orange-800 font-medium underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300 rounded px-1"
              >
                {isExpanded 
                  ? (language === 'en' ? '... show less' : '... कमी दाखवा')
                  : (language === 'en' ? '... show more' : '... अधिक दाखवा')
                }
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
