export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-4xl mx-auto px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-500">
        <p>© {new Date().getFullYear()} ddonkey.dev — AI 시대의 투자와 도구</p>
      </div>
    </footer>
  );
}
