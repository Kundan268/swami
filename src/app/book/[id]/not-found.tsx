import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center py-12">
        <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold mb-2">Book Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The book you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Catalog
          </Link>
        </Button>
      </div>
    </div>
  );
}
