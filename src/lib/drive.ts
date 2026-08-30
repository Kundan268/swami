import 'server-only';

import type { Book, BookCatalog, Category } from './types';
import { categoryOrder } from './types';

const DRIVE_API = 'https://www.googleapis.com/drive/v3/files';
const FOLDER_MIME = 'application/vnd.google-apps.folder';

/** Drive folder display names (case-insensitive) → app categories. */
export const DRIVE_FOLDER_TO_CATEGORY: Record<string, Category> = {
  'all navshati': 'navshati',
  'all stotra': 'stotra',
  'all kawach': 'kawach',
  'all chalisa': 'chalisa',
  'all mantra': 'mantra',
};

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
};

type DriveListResponse = {
  files?: DriveFile[];
  nextPageToken?: string;
};

export type ParsedPdfName = {
  lang: 'en' | 'mr' | 'both';
  titleEn: string;
  titleMr: string;
  slug: string;
};

export function isDriveConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_DRIVE_API_KEY?.trim() &&
      process.env.GOOGLE_DRIVE_FOLDER_ID?.trim()
  );
}

function apiKey(): string {
  return process.env.GOOGLE_DRIVE_API_KEY!.trim();
}

function parentFolderId(): string {
  return process.env.GOOGLE_DRIVE_FOLDER_ID!.trim();
}

function escapeDriveQueryValue(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function formatEnglishTitle(value: string): string {
  return value.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Parse a Drive PDF filename into titles, language, and slug.
 * Split on the first `__` before converting leftover `_`/`-` to spaces.
 */
export function parsePdfFileName(name: string): ParsedPdfName | null {
  const match = name.trim().match(/^(.+?)(?:\.(en|mr))?\.pdf$/i);
  if (!match) return null;

  const base = match[1];
  const langSuffix = match[2]?.toLowerCase() as 'en' | 'mr' | undefined;
  const separator = base.indexOf('__');

  let enRaw: string;
  let mrRaw: string | null;
  if (separator !== -1) {
    enRaw = base.slice(0, separator).trim();
    mrRaw = base.slice(separator + 2).trim() || null;
  } else {
    enRaw = base.trim();
    mrRaw = null;
  }

  const titleEn = formatEnglishTitle(enRaw);
  if (!titleEn) return null;

  const slug = slugify(titleEn);
  if (!slug) return null;

  return {
    lang: langSuffix ?? 'both',
    titleEn,
    titleMr: mrRaw || titleEn,
    slug,
  };
}

async function driveList(query: string): Promise<DriveFile[]> {
  const files: DriveFile[] = [];
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      q: query,
      key: apiKey(),
      pageSize: '1000',
      fields: 'nextPageToken,files(id,name,mimeType)',
    });
    if (pageToken) params.set('pageToken', pageToken);

    const response = await fetch(`${DRIVE_API}?${params.toString()}`, {
      next: { revalidate: 300, tags: ['books'] },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(
        `Drive API ${response.status}: ${body || response.statusText}`
      );
    }

    const data = (await response.json()) as DriveListResponse;
    if (data.files?.length) files.push(...data.files);
    pageToken = data.nextPageToken;
  } while (pageToken);

  return files;
}

function isPdf(file: DriveFile): boolean {
  return (
    file.mimeType === 'application/pdf' ||
    file.name.toLowerCase().endsWith('.pdf')
  );
}

function booksFromPdfs(category: Category, files: DriveFile[]): Book[] {
  const groups = new Map<string, (ParsedPdfName & { fileId: string })[]>();

  for (const file of files) {
    if (!isPdf(file)) continue;
    const parsed = parsePdfFileName(file.name);
    if (!parsed) continue;

    const list = groups.get(parsed.slug) ?? [];
    list.push({ ...parsed, fileId: file.id });
    groups.set(parsed.slug, list);
  }

  const books: Book[] = [];

  for (const [slug, group] of Array.from(groups.entries())) {
    const sorted = [...group].sort((a, b) => {
      const rank = (lang: ParsedPdfName['lang']) => (lang === 'both' ? 0 : 1);
      return rank(a.lang) - rank(b.lang);
    });

    let titleEn = sorted[0].titleEn;
    let titleMr = sorted[0].titleMr;
    let enId: string | undefined;
    let mrId: string | undefined;

    for (const item of sorted) {
      if (item.lang === 'en' || item.lang === 'both') {
        enId = item.fileId;
        titleEn = item.titleEn;
      }
      if (item.lang === 'mr' || item.lang === 'both') {
        mrId = item.fileId;
        titleMr = item.titleMr;
      }
    }

    const translationsEn = enId ?? mrId;
    const translationsMr = mrId ?? enId;
    if (!translationsEn || !translationsMr) continue;

    books.push({
      id: `${category}-${slug}`,
      title: { en: titleEn, mr: titleMr },
      category,
      translations: { en: translationsEn, mr: translationsMr },
    });
  }

  return books.sort((a, b) => a.title.en.localeCompare(b.title.en, 'en'));
}

export async function listCatalogFromDrive(): Promise<BookCatalog> {
  const parentId = escapeDriveQueryValue(parentFolderId());
  const folders = await driveList(
    `'${parentId}' in parents and trashed = false and mimeType = '${FOLDER_MIME}'`
  );

  const matched = new Map<Category, string>();
  for (const folder of folders) {
    const category = DRIVE_FOLDER_TO_CATEGORY[folder.name.trim().toLowerCase()];
    if (category && !matched.has(category)) {
      matched.set(category, folder.id);
    }
  }

  const books: Book[] = [];
  const presentCategories: Category[] = [];

  for (const category of categoryOrder) {
    const folderId = matched.get(category);
    if (!folderId) continue;

    const children = await driveList(
      `'${escapeDriveQueryValue(folderId)}' in parents and trashed = false`
    );
    const categoryBooks = booksFromPdfs(category, children);
    if (categoryBooks.length === 0) continue;

    books.push(...categoryBooks);
    presentCategories.push(category);
  }

  return { books, presentCategories };
}
