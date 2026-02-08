export interface PostMeta {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  thumbnail?: string;
  draft?: boolean;
}

export interface Post {
  slug: string;
  meta: PostMeta;
  content: string;
  readingTime: string;
}

export const CATEGORIES = {
  market: { label: '시장분석', emoji: '📊', color: 'blue' },
  tech: { label: 'AI/테크', emoji: '🤖', color: 'purple' },
  tools: { label: '도구리뷰', emoji: '🛠️', color: 'green' },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
