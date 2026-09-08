import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import '@/styles/globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Malik Fajar — Software Developer & AI Engineer',
  description: 'Building software. Exploring AI. Designing experiences.',
  keywords: ['Software Developer', 'AI Engineer', 'Portfolio', 'Malik Fajar'],
  authors: [{ name: 'Malik Fajar' }],
  openGraph: {
    title: 'Malik Fajar — Software Developer & AI Engineer',
    description: 'Building software. Exploring AI. Designing experiences.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable}`}>
      <body className="bg-black text-primary font-manrope antialiased">
        {children}
      </body>
    </html>
  );
}
