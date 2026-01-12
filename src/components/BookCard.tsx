'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Language } from '@/lib/types';
import { getGoogleDriveDownloadUrl, getGoogleDriveViewUrl } from '@/lib/utils';
import { Download, Eye } from 'lucide-react';

interface BookCardProps {
  book: Book;
  language: Language;
}

export function BookCard({ book, language }: BookCardProps) {
  const downloadUrl = getGoogleDriveDownloadUrl(book.translations[language]);
  const viewUrl = getGoogleDriveViewUrl(book.translations[language]);

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow border-orange-200 hover:border-orange-300">
      <CardHeader className="pb-6 pt-6">
        <CardTitle className="line-clamp-2 min-h-[4rem] py-3 leading-tight">
          {book.title[language]}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <div className="mt-auto space-y-2">
          <Button asChild className="w-full">
            <a
              href={viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Eye className="h-4 w-4" />
              View Book
            </a>
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
