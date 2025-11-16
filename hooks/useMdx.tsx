import type { MDXComponents } from "mdx/types";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Customize heading styles
    h1: ({ children }) => (
      <h1 className="mb-4 mt-8 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 mt-8 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 mt-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        {children}
      </h3>
    ),
    // Customize paragraph
    p: ({ children }) => (
      <p className="mb-4 leading-7 text-zinc-700 dark:text-zinc-300">
        {children}
      </p>
    ),
    // Customize links
    a: ({ href, children }) => (
      <a
        href={href}
        className="font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300"
      >
        {children}
      </a>
    ),
    // Customize code blocks
    code: ({ children, className }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-mono text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
            {children}
          </code>
        );
      }
      return <code className={className + " text-sm"}>{children}</code>;
    },
    pre: ({ children }) => (
      <pre className="mb-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 dark:bg-zinc-950">
        {children}
      </pre>
    ),
    // Customize lists
    ul: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-2 text-zinc-700 dark:text-zinc-300">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2 text-zinc-700 dark:text-zinc-300">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-7">{children}</li>,
    // Customize blockquotes
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-4 border-zinc-300 pl-4 italic text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
        {children}
      </blockquote>
    ),
    // Customize images
    img: ({ src, alt }) => (
      <Image
        src={src || ""}
        alt={alt || ""}
        width={800}
        height={400}
        className="mb-4 rounded-lg"
      />
    ),
    // Customize horizontal rules
    hr: () => <hr className="my-8 border-zinc-200 dark:border-zinc-800" />,
    // Customize tables
    table: ({ children }) => (
      <div className="mb-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="bg-zinc-50 px-4 py-2 text-left text-sm font-semibold text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300">
        {children}
      </td>
    ),
    ...components,
  };
}
