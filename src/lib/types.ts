export type Category = 'navshati' | 'stotra' | 'mantra' | 'chalisa';

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
  mantra: { en: 'Mantra', mr: 'मंत्र' },
  chalisa: { en: 'Chalisa', mr: 'चालीसा' },
};

export interface SearchResult {
  item: Book;
  score?: number;
}
