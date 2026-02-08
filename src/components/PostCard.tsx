import Link from 'next/link';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CATEGORIES, type Post, type CategoryKey } from '@/lib/types';

export function PostCard({ post }: { post: Post }) {
  const category = CATEGORIES[post.meta.category as CategoryKey];

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-200">
        <div className="flex items-center gap-2 mb-3">
          {category && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
              {category.emoji} {category.label}
            </span>
          )}
          <span className="text-xs text-gray-400 dark:text-gray-600">
            {format(new Date(post.meta.date), 'yyyy.MM.dd', { locale: ko })}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-600">
            · {post.readingTime}
          </span>
        </div>

        <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
          {post.meta.title}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {post.meta.description}
        </p>

        {post.meta.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {post.meta.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-400 dark:text-gray-500"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
