import 'server-only';

import { readFile } from 'fs/promises';
import { join } from 'path';
import { isDriveConfigured, listCatalogFromDrive } from './drive';
import type { Book, BookCatalog, Category } from './types';

const JSON_CATEGORIES: Category[] = ['navshati', 'stotra', 'mantra', 'chalisa'];

async function getCatalogFromJson(): Promise<BookCatalog> {
  const books: Book[] = [];
  const presentCategories: Category[] = [];

  for (const category of JSON_CATEGORIES) {
    try {
      const raw = await readFile(
        join(process.cwd(), 'public', 'data', `${category}.json`),
        'utf8'
      );
      const parsed = JSON.parse(raw) as Book[];
      if (!Array.isArray(parsed) || parsed.length === 0) continue;
      books.push(...parsed);
      presentCategories.push(category);
    } catch {
      // Missing or invalid category file
    }
  }

  return { books, presentCategories };
}

export async function getCatalog(): Promise<BookCatalog> {
  if (isDriveConfigured()) {
    try {
      return await listCatalogFromDrive();
    } catch (error) {
      console.error('Error fetching books from Drive, using JSON fallback:', error);
    }
  }

  return getCatalogFromJson();
}

export async function getBooks(): Promise<Book[]> {
  const { books } = await getCatalog();
  return books;
}

export async function getBookById(id: string): Promise<Book | null> {
  const books = await getBooks();
  return books.find((book) => book.id === id) || null;
}
