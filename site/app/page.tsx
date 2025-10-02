import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold mb-6">Welcome to icecube.dog</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        A blog about development, technology, and more.
      </p>

      <div className="space-y-4">
        <Link
          href="/blog"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Read the Blog
        </Link>
      </div>
    </div>
  );
}
