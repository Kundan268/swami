'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Language } from '@/lib/types';

interface SearchBarProps {
  onSearch: (query: string) => void;
  language: Language;
  placeholder?: {
    en: string;
    mr: string;
  };
}

export function SearchBar({ onSearch, language, placeholder }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const defaultPlaceholder = {
    en: 'Search books...',
    mr: 'पुस्तके शोधा...'
  };

  const currentPlaceholder = placeholder || defaultPlaceholder;

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder={currentPlaceholder[language]}
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
      />
    </div>
  );
}
