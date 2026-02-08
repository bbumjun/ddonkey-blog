import { getAllPosts } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-black mb-4 text-gray-900 dark:text-white">
          <span className="mr-2">🫏</span>donkey.dev
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          AI 시대의 투자와 도구
        </p>
      </section>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🫏</p>
          <p className="text-gray-500 dark:text-gray-400">아직 글이 없어요. 곧 올라옵니다!</p>
        </div>
      ) : (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">최신 글</h2>
            <span className="text-sm text-gray-400">{posts.length}개의 글</span>
          </div>
          <div className="grid gap-4">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
