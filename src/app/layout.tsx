import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'donkey.dev — AI 시대의 투자와 도구',
    template: '%s | donkey.dev',
  },
  description: 'AI/테크 투자 분석, 시장 리서치, AI 도구 리뷰. 개인 투자자를 위한 인사이트.',
  metadataBase: new URL('https://donkey.dev'),
  openGraph: {
    title: 'donkey.dev',
    description: 'AI 시대의 투자와 도구',
    url: 'https://donkey.dev',
    siteName: 'donkey.dev',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'donkey.dev',
    description: 'AI 시대의 투자와 도구',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
