import type { Metadata } from 'next';
import { Instrument_Sans, Syne, IBM_Plex_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { AppShell } from '@/components/layout/AppShell';

const display = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
});

const sans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://malikfajar.me'),
  title: {
    default: 'Malik Fajar — Software, AI & Creative Developer',
    template: '%s — Malik Fajar',
  },
  description:
    'Portfolio Muhammad Malik Fajar El Syarif — siswa SMK Informatika Fithrah Insani (PPLG). Software, AI, UI/UX, dan eksperimen kreatif.',
  keywords: [
    'Malik Fajar',
    'Muhammad Malik Fajar El Syarif',
    'Portfolio',
    'Software Developer',
    'PPLG',
    'Cimahi',
  ],
  authors: [{ name: 'Malik Fajar', url: 'https://malikfajar.me' }],
  creator: 'Malik Fajar',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Malik Fajar — Software, AI & Creative Developer',
    description:
      'Siswa PPLG yang membangun software, mengeksplorasi AI, dan merancang pengalaman digital.',
    url: 'https://malikfajar.me',
    siteName: 'Malik Fajar',
    type: 'website',
    locale: 'id_ID',
    images: [{ url: '/assets/Malik.webp', width: 800, height: 1000, alt: 'Malik Fajar' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malik Fajar — Software, AI & Creative Developer',
    description:
      'Siswa PPLG yang membangun software, mengeksplorasi AI, dan merancang pengalaman digital.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
