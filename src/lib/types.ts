export type Category = 'navshati' | 'stotra' | 'kawach' | 'mantra' | 'chalisa';

export interface Book {
  id: string;
  title: {
    en: string;
    mr: string;
  };
  category: Category;
  translations: {
    en: string;
    mr: string;
  };
}

export type Language = 'en' | 'mr';

export const categoryLabels: Record<Category, { en: string; mr: string }> = {
  navshati: { en: 'Navshati', mr: 'नवशती' },
  stotra: { en: 'Stotra', mr: 'स्तोत्र' },
  kawach: { en: 'Kawach', mr: 'कवच' },
  mantra: { en: 'Mantra', mr: 'मंत्र' },
  chalisa: { en: 'Chalisa', mr: 'चालीसा' },
};

/** Home column order. Mantra is last so it appears only when All Mantra exists. */
export const categoryOrder: Category[] = [
  'navshati',
  'stotra',
  'kawach',
  'chalisa',
  'mantra',
];

export interface BookCatalog {
  books: Book[];
  presentCategories: Category[];
}

export interface SearchResult {
  item: Book;
  score?: number;
}
