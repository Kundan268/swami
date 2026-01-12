import { Book } from './types';

// Helper to get the base URL for server-side fetch requests
const getBaseUrl = () => {
  // If running in the browser, a relative path is fine
  if (typeof window !== 'undefined') return '';
  // If deployed on Vercel, use the VERCEL_URL environment variable
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  // Otherwise, assume local development
  return 'http://localhost:3000';
};

export async function getBooks(): Promise<Book[]> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/data/index.json`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch books data: ${response.statusText}`);
    }
    
    const books: Book[] = await response.json();
    return books;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}

export async function getBookById(id: string): Promise<Book | null> {
  const books = await getBooks();
  return books.find(book => book.id === id) || null;
}
