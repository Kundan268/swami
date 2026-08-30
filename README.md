# Book Catalog - Bilingual Library

A modern, responsive book catalog website built with Next.js 14, supporting both English and Marathi languages. Users can browse, search, and download PDF books hosted on Google Drive.

## Features

- Bilingual support for English and Marathi
- Fuzzy search powered by Fuse.js
- Responsive, mobile-first layout
- Book catalog from Google Drive folders (no JSON/Git for new books)
- ISR with optional on-demand revalidation
- Direct PDF view and download from Google Drive

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **Search**: Fuse.js
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd book-catalog
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env.local` and set `GOOGLE_DRIVE_API_KEY` and `GOOGLE_DRIVE_FOLDER_ID` (see Adding Books). Without these, the app falls back to `public/data/*.json`.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── book/[id]/         # Dynamic book details page
│   ├── api/books/         # Catalog from Drive (JSON fallback)
│   ├── api/revalidate/    # On-demand cache refresh
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── not-found.tsx      # 404 page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── BookCard.tsx      # Book card component
│   ├── BookDetails.tsx   # Book details page component
│   ├── LanguageToggle.tsx # Language switcher
│   └── SearchBar.tsx     # Search input component
└── lib/                  # Utility functions
    ├── data.ts           # Catalog fetch (Drive, JSON fallback)
    ├── drive.ts          # Google Drive folder listing
    ├── language.ts       # Language management
    ├── search.ts         # Search functionality
    ├── types.ts          # TypeScript types
    └── utils.ts          # Utility functions

public/
└── data/
    └── *.json            # JSON fallback if Drive is not configured
```

## Adding Books

The catalog is the **Shreeswami** Google Drive folder. Upload a PDF into the right category folder. No JSON edit, Git push, or file-ID copy is required.

### One-time Drive setup

1. Keep this folder layout (names must match, case-insensitive):

   - `Shreeswami / All Navshati`
   - `Shreeswami / All Stotra`
   - `Shreeswami / All Kawach`
   - `Shreeswami / All Chalisa`
   - `Shreeswami / All Mantra` (optional; create later when you want a Mantra column)

2. Share **Shreeswami** as **Anyone with the link → Viewer** and apply to all items. New PDFs inherit this.

3. In [Google Cloud Console](https://console.cloud.google.com/): create a project, enable **Google Drive API**, create an **API key** restricted to that API.

4. Set Vercel (and `.env.local`) variables:

   - `GOOGLE_DRIVE_FOLDER_ID` — ID from `https://drive.google.com/drive/folders/FOLDER_ID`
   - `GOOGLE_DRIVE_API_KEY`
   - `REVALIDATE_SECRET` (optional, for instant refresh)

5. Redeploy once.

Home only shows categories that exist on Drive **and** have at least one PDF. Kawach appears now. Mantra appears when you add `All Mantra` and upload files. Remove a folder (or empty it) and that column disappears after refresh.

### Filename = title

- `Hanuman.pdf` → English and Marathi titles both **Hanuman** (one PDF for both languages)
- `Hanuman__हनुमान.pdf` → English **Hanuman**, Marathi **हनुमान**
- `aum namo lalbaug raja mantra__ॐ नमो लालबाग राजा मंत्र.pdf` → bilingual titles; use **two** underscores
- `Hanuman.en.pdf` + `Hanuman.mr.pdf` → paired PDFs for each language

Spaces in Drive names are fine. Leftover `_` or `-` on the English side become spaces.

The site caches the catalog for 5 minutes. For an immediate update after upload:

```bash
curl -X POST "https://your-domain.com/api/revalidate?secret=YOUR_REVALIDATE_SECRET"
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add `GOOGLE_DRIVE_API_KEY`, `GOOGLE_DRIVE_FOLDER_ID`, and optionally `REVALIDATE_SECRET` in the Vercel project environment variables
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Features in Detail

### Search Functionality

- **Fuzzy Search**: Uses Fuse.js for intelligent search that handles typos and partial matches
- **Language-Aware**: Search respects the currently selected language
- **Multi-field Search**: Searches across title, description, author, and tags

### Language Support

- **Persistent Preference**: Language choice is saved in localStorage
- **Instant Switching**: All content updates immediately when language changes
- **SEO Friendly**: Each language version can have different metadata

### Performance

- **ISR**: Books are statically generated but can be updated without redeployment
- **Optimized Images**: Next.js Image component for optimal loading
- **Code Splitting**: Automatic code splitting for faster initial loads

## Customization

### Styling

The app uses TailwindCSS with a custom design system. You can customize:

- Colors in `tailwind.config.js`
- Global styles in `src/app/globals.css`
- Component styles using Tailwind classes

### Search Configuration

Modify search behavior in `src/lib/search.ts`:

```typescript
const fuse = new Fuse(books, {
  keys: searchKeys,
  threshold: 0.3,        // Lower = more strict matching
  includeScore: true,
  minMatchCharLength: 2, // Minimum characters to trigger search
});
```

## Future Enhancements

- [ ] User authentication and favorites
- [ ] Advanced filtering (by year, author, tags)
- [ ] Book recommendations
- [ ] Reading progress tracking
- [ ] Dark mode support
- [ ] PWA capabilities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions, please open an issue on GitHub.
