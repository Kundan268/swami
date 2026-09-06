'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onSearch: (query: string) => void;
}

export function SearchBar({ value, onSearch }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-600 h-6 w-6 pointer-events-none"
        aria-hidden
      />
      <Input
        type="search"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search Navshati, Stotra... / नवशती, स्तोत्र शोधा..."
        aria-label="Search books"
        className="h-14 pl-14 pr-4 text-lg border-2 border-orange-300 focus-visible:border-orange-500 focus-visible:ring-orange-400 placeholder:text-base placeholder:text-muted-foreground"
      />
    </div>
  );
}
