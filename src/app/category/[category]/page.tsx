import { notFound } from 'next/navigation';
import { getPostsByCategory } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';
import { CATEGORIES, type CategoryKey } from '@/lib/types';
import type { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES[category as CategoryKey];
  if (!cat) return {};

  return {
    title: `${cat.emoji} ${cat.label}`,
    description: `${cat.label} 카테고리의 글 모음`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES[category as CategoryKey];
  if (!cat) notFound();

  const posts = getPostsByCategory(category as CategoryKey);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          ← 홈
        </Link>
      </div>

      <h1 className="text-3xl font-black mb-2 text-gray-900 dark:text-white">
        {cat.emoji} {cat.label}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">{posts.length}개의 글</p>

      {posts.length === 0 ? (
        <p className="text-gray-400 py-10 text-center">아직 글이 없어요.</p>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
