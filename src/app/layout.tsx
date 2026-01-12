import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shri Swami Samarth Book Catalog - Sacred Knowledge Repository',
  description: 'Browse and download sacred books in English and Marathi - A divine collection of spiritual wisdom',
  keywords: ['swami samarth', 'spiritual books', 'sacred texts', 'marathi', 'english', 'pdf', 'download', 'akalkot', 'devotional'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  );
}
