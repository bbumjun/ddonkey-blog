'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { CATEGORIES } from '@/lib/types';

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-xl">🫏</span>
          <span className="font-bold text-lg text-gray-900 dark:text-white">donkey.dev</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-1">
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <Link
              key={key}
              href={`/category/${key}`}
              className="px-3 py-1.5 text-sm rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {cat.emoji} {cat.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
