import { notFound } from 'next/navigation';
import { getBookById, getBooks } from '@/lib/data';
import { BookDetails } from '@/components/BookDetails';
import { Metadata } from 'next';

interface BookPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({
    id: book.id,
  }));
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const book = await getBookById(params.id);
  
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
  const book = await getBookById(params.id);

  if (!book) {
    notFound();
  }

  return <BookDetails book={book} />;
}
