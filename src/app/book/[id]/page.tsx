import { notFound } from 'next/navigation';
import { getBookById, getBooks } from '@/lib/data';
import { BookDetails } from '@/components/BookDetails';
import { Metadata } from 'next';

export const dynamicParams = true;
export const revalidate = 300;

interface BookPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({
    id: book.id,
  }));
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { id } = await params;
  const book = await getBookById(id);
  
  if (!book) {
    return {
      title: 'Book Not Found',
    };
  }

  return {
    title: `${book.title.en} | Book Catalog`,
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    notFound();
  }

  return <BookDetails book={book} />;
}