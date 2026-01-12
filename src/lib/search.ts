import Fuse from 'fuse.js';
import { Book, Language, SearchResult } from './types';

export function createSearchIndex(books: Book[], language: Language) {
  // Search only in title field for more precise results
  const searchKeys = [
    `title.${language}`
  ];

  return new Fuse(books, {
    keys: searchKeys,
    threshold: 0.2, // Lower threshold for more precise matching
    includeScore: true,
    minMatchCharLength: 1, // Allow single character matches
    ignoreLocation: true, // Search anywhere in the title
    findAllMatches: true, // Find all matches, not just the first one
  });
}

export function searchBooks(
  books: Book[], 
  query: string, 
  language: Language
): SearchResult[] {
  if (!query.trim()) {
    return books.map(book => ({ item: book }));
  }

  const fuse = createSearchIndex(books, language);
  const results = fuse.search(query);
  
  return results.map(result => ({
    item: result.item,
    score: result.score
  }));
}
