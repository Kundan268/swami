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
      className="inline-flex items-center flex-1 min-h-11 py-2 px-1 text-lg leading-snug text-orange-800 hover:text-orange-950 hover:underline rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
    >
      {book.title[language]}
    </a>
  );
}
