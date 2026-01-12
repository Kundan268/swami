# Book Catalog - Bilingual Library

A modern, responsive book catalog website built with Next.js 14, supporting both English and Marathi languages. Users can browse, search, and download PDF books hosted on Google Drive.

## Features

- 🌐 **Bilingual Support**: Full support for English and Marathi languages
- 🔍 **Fuzzy Search**: Powered by Fuse.js for intelligent search across both languages
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- 📚 **Book Management**: Easy to add new books via JSON configuration
- ⚡ **Performance**: ISR (Incremental Static Regeneration) for fast loading
- 🎨 **Modern UI**: Built with TailwindCSS and shadcn/ui components
- 🔗 **Google Drive Integration**: Direct PDF downloads from Google Drive

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

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── book/[id]/         # Dynamic book details page
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
    ├── data.ts           # Data fetching functions
    ├── language.ts       # Language management
    ├── search.ts         # Search functionality
    ├── types.ts          # TypeScript types
    └── utils.ts          # Utility functions

public/
└── data/
    └── index.json        # Book metadata (can be replaced with Google Sheet)
```

## Adding Books

Books are managed through the `public/data/index.json` file. Each book entry should follow this structure:

```json
{
  "id": "unique-book-id",
  "title": {
    "en": "English Title",
    "mr": "मराठी शीर्षक"
  },
  "description": {
    "en": "English description",
    "mr": "मराठी वर्णन"
  },
  "author": {
    "en": "Author Name",
    "mr": "लेखकाचे नाव"
  },
  "translations": {
    "en": "google-drive-file-id-english",
    "mr": "google-drive-file-id-marathi"
  },
  "year": 2024,
  "tags": {
    "en": ["tag1", "tag2"],
    "mr": ["टॅग1", "टॅग2"]
  }
}
```

### Google Drive Setup

1. Upload your PDF files to Google Drive
2. Make them publicly accessible (Anyone with the link can view)
3. Get the file ID from the shareable link
4. Add the file ID to the `translations` field in the JSON

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

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

- [ ] Google Sheets integration for dynamic book management
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
