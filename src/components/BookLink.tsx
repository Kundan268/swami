'use client';

import { Book, Language } from '@/lib/types';
import { getGoogleDriveDownloadUrl } from '@/lib/utils';

interface BookLinkProps {
  book: Book;
  language: Language;
}

export function BookLink({ book, language }: BookLinkProps) {
  const downloadUrl = getGoogleDriveDownloadUrl(book.translations[language]);

  return (
    <a
      href={downloadUrl}
      download
      className="block py-1.5 text-orange-700 hover:text-orange-900 hover:underline transition-colors duration-200 text-sm leading-relaxed"
    >
      {book.title[language]}
    </a>
  );
}
