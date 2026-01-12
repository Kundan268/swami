'use client';

import { Book, Language, Category, categoryLabels } from '@/lib/types';
import { BookLink } from './BookLink';

interface CategorySectionProps {
  category: Category;
  books: Book[];
  language: Language;
}

export function CategorySection({ category, books, language }: CategorySectionProps) {
  const categoryBooks = books.filter(book => book.category === category);
  const categoryLabel = categoryLabels[category][language];

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold text-orange-800 mb-3 pb-2 border-b-2 border-orange-300">
        {categoryLabel}
      </h2>
      <div className="space-y-1 flex-1">
        {categoryBooks.length === 0 ? (
          <p className="text-sm text-muted-foreground italic py-2">
            {language === 'en' ? 'No books available' : 'पुस्तके उपलब्ध नाहीत'}
          </p>
        ) : (
          categoryBooks.map((book, index) => (
            <div key={book.id} className="flex items-start gap-2">
              <span className="text-sm text-muted-foreground font-medium mt-0.5">
                {index + 1}.
              </span>
              <BookLink
                book={book}
                language={language}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
