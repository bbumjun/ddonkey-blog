import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold mt-10 mb-5 text-white" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-xl font-bold mt-10 mb-4 text-purple-400 pb-2 border-b border-gray-800/60 flex items-center gap-2" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-lg font-semibold mt-7 mb-3 text-purple-200" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-[1.8] text-gray-300 text-[0.92rem]" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-amber-300 font-semibold" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-5 ml-1 space-y-2 text-gray-300 text-[0.92rem]" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-5 ml-1 space-y-2 text-gray-300 text-[0.92rem] list-decimal list-inside" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed pl-4 relative before:content-['›'] before:absolute before:left-0 before:text-blue-400 before:font-bold list-none" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-3 border-purple-500 pl-4 py-3 my-5 italic text-purple-200/80 bg-gray-900/50 rounded-r-lg text-[0.92rem]" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    const isBlock = typeof props.className === 'string' && props.className.includes('language-');
    if (isBlock) {
      return <code className={`${props.className} block overflow-x-auto`} {...props} />;
    }
    return (
      <code className="px-1.5 py-0.5 bg-gray-800 rounded text-sm font-mono text-pink-400" {...props} />
    );
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="mb-5 p-4 bg-gray-950 rounded-xl overflow-x-auto text-sm border border-gray-800" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-blue-400 hover:text-blue-300 hover:underline transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-5 rounded-xl border border-gray-800">
      <table className="w-full text-[0.85rem] border-collapse" {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="text-left p-3 bg-[#16213e] font-semibold text-blue-300 border-b border-gray-700" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="p-3 border-b border-gray-800/60 text-gray-300" {...props} />
  ),
  hr: () => <hr className="my-8 border-gray-800" />,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-xl my-5 max-w-full" alt={props.alt || ''} {...props} />
  ),

  // ─── Custom MDX components ─────────────────────────
  InfoCard: ({ emoji, title, children }: { emoji?: string; title: string; children: React.ReactNode }) => (
    <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-5 mb-4">
      <div className="flex items-center gap-2 font-bold text-white text-[0.95rem] mb-2">
        {emoji && <span>{emoji}</span>}
        {title}
      </div>
      <div className="text-gray-400 text-[0.88rem] leading-relaxed">{children}</div>
    </div>
  ),

  TLDRBox: ({ children }: { children: React.ReactNode }) => (
    <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-[#2a2a4a] rounded-xl p-5 mb-7">
      <h3 className="text-blue-300 font-bold text-base mb-2 mt-0 border-none pb-0">📌 한줄 요약</h3>
      <div className="text-gray-300 text-[0.92rem]">{children}</div>
    </div>
  ),

  LessonCard: ({ num, title, children }: { num: number; title: string; children: React.ReactNode }) => (
    <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-5 mb-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-500 text-gray-950 rounded-full text-xs font-bold">{num}</span>
        <span className="font-bold text-white text-[0.92rem]">{title}</span>
      </div>
      <div className="text-gray-400 text-[0.88rem] leading-relaxed">{children}</div>
    </div>
  ),

  SetupBox: ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-gradient-to-br from-[#0d1b2a] to-[#1b2838] border border-[#2a3a4a] rounded-xl p-5 mb-3">
      <h4 className="text-blue-300 font-bold text-[0.92rem] mb-2 mt-0">{title}</h4>
      <div className="text-gray-400 text-[0.88rem]">{children}</div>
    </div>
  ),

  InsightCard: ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-5 mb-3">
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">{label}</div>
      <div className="text-gray-300 text-[0.88rem] leading-relaxed">{children}</div>
    </div>
  ),
};

export function MDXContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug, rehypeHighlight],
        },
      }}
    />
  );
}
