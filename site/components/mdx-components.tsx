import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";

export function useMDXComponents(componentOverrides?: MDXComponents): MDXComponents {
  return {
    // Override the default <a> element with Next.js Link
    a: ({ href, children, ...props }) => {
      // Check if it's an external link
      if (href?.startsWith('http')) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        );
      }
      // Internal link
      return (
        <Link href={href || '#'} {...props}>
          {children}
        </Link>
      );
    },

    // Override the default <img> element with Next.js Image (optional)
    img: ({ src, alt, ...props }) => {
      return (
        <Image
          src={src || ''}
          alt={alt || ''}
          width={800}
          height={600}
          {...props}
          className="rounded-lg"
        />
      );
    },

    // Add custom styling to headings
    h1: ({ children, ...props }) => (
      <h1 className="text-4xl font-bold mt-8 mb-4" {...props}>
        {children}
      </h1>
    ),

    h2: ({ children, ...props }) => (
      <h2 className="text-3xl font-semibold mt-8 mb-3" {...props}>
        {children}
      </h2>
    ),

    h3: ({ children, ...props }) => (
      <h3 className="text-2xl font-semibold mt-6 mb-2" {...props}>
        {children}
      </h3>
    ),

    // Style code blocks
    pre: ({ children, ...props }) => (
      <pre className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto my-4" {...props}>
        {children}
      </pre>
    ),

    code: ({ children, ...props }) => (
      <code className="bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded text-sm" {...props}>
        {children}
      </code>
    ),

    // Style paragraphs
    p: ({ children, ...props }) => (
      <p className="my-4 leading-7" {...props}>
        {children}
      </p>
    ),

    // Style lists
    ul: ({ children, ...props }) => (
      <ul className="list-disc list-inside my-4 space-y-2" {...props}>
        {children}
      </ul>
    ),

    ol: ({ children, ...props }) => (
      <ol className="list-decimal list-inside my-4 space-y-2" {...props}>
        {children}
      </ol>
    ),

    // Style blockquotes
    blockquote: ({ children, ...props }) => (
      <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4" {...props}>
        {children}
      </blockquote>
    ),

    ...componentOverrides,
  };
}
