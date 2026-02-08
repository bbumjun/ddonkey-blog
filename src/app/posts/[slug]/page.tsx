import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { MDXContent } from '@/components/MDXContent';
import { CATEGORIES, type CategoryKey } from '@/lib/types';
import type { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: 'article',
      publishedTime: post.meta.date,
      tags: post.meta.tags,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const category = CATEGORIES[post.meta.category as CategoryKey];

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-5">
          {category && (
            <Link
              href={`/category/${post.meta.category}`}
              className="px-3 py-1 text-xs font-medium rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-colors"
            >
              {category.emoji} {category.label}
            </Link>
          )}
          <span className="text-sm text-gray-500">
            {format(new Date(post.meta.date), 'yyyy년 M월 d일', { locale: ko })}
          </span>
          <span className="text-sm text-gray-500">· {post.readingTime}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-5">
          {post.meta.title}
        </h1>

        <p className="text-base text-gray-400 dark:text-gray-500 max-w-2xl mx-auto">
          {post.meta.description}
        </p>

        <div className="mt-6 border-b border-gray-800/60" />
      </header>

      {/* Content */}
      <div className="prose-custom">
        <MDXContent source={post.content} />
      </div>

      {/* Tags */}
      {post.meta.tags?.length > 0 && (
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap gap-2">
            {post.meta.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Back */}
      <div className="mt-8">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          ← 목록으로 돌아가기
        </Link>
      </div>
    </article>
  );
}
