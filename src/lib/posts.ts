import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { Post, PostMeta, CategoryKey } from './types';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.mdx'));

  const posts = files
    .map((filename) => {
      const slug = filename.replace('.mdx', '');
      const fullPath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);

      return {
        slug,
        meta: data as PostMeta,
        content,
        readingTime: stats.text.replace('min read', '분'),
      };
    })
    .filter((post) => !post.meta.draft)
    .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    meta: data as PostMeta,
    content,
    readingTime: stats.text.replace('min read', '분'),
  };
}

export function getPostsByCategory(category: CategoryKey): Post[] {
  return getAllPosts().filter((post) => post.meta.category === category);
}

export function getAllCategories(): { key: CategoryKey; count: number }[] {
  const posts = getAllPosts();
  const counts: Record<string, number> = {};
  posts.forEach((post) => {
    counts[post.meta.category] = (counts[post.meta.category] || 0) + 1;
  });
  return Object.entries(counts).map(([key, count]) => ({
    key: key as CategoryKey,
    count,
  }));
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const counts: Record<string, number> = {};
  posts.forEach((post) => {
    post.meta.tags?.forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
