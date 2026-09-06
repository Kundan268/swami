'use client';

import { Book, Language, Category, categoryLabels } from '@/lib/types';
import { BookLink } from './BookLink';

interface CategorySectionProps {
  category: Category;
  books: Book[];
  language: Language;
}

export function CategorySection({ category, books, language }: CategorySectionProps) {
  const categoryBooks = books.filter((book) => book.category === category);
  const categoryLabel = categoryLabels[category][language];

  return (
    <div className="flex flex-col h-full min-h-0">
      <h2 className="text-2xl font-bold text-orange-800 mb-3 pb-2 border-b-2 border-orange-300">
        {categoryLabel}
      </h2>
      {/* Fixed height + always-visible thick scrollbar on all viewports; allow page scroll after list ends */}
      <div className="category-scroll max-h-[400px] overflow-y-scroll overscroll-y-auto pr-2 space-y-1 flex-1">
        {categoryBooks.length === 0 ? (
          <p className="text-base text-muted-foreground italic py-3">
            {language === 'en' ? 'No books available' : 'पुस्तके उपलब्ध नाहीत'}
          </p>
        ) : (
          categoryBooks.map((book, index) => (
            <div key={book.id} className="flex items-start gap-2 min-h-11">
              <span className="text-base text-muted-foreground font-medium flex-shrink-0 pt-2.5 w-7 text-right">
                {index + 1}.
              </span>
              <BookLink book={book} language={language} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
