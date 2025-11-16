import { commonTranslation } from "@/app/commonTranslation";
import { getAllSlugs, getPostBySlug } from "@/models/posts";
import { Locale, locales } from "@/models/translation";
import "highlight.js/styles/github-dark.css";
import "katex/dist/katex.min.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { blogTranslation } from "../blogTranslation";

// This is required for static export
export async function generateStaticParams() {
  const params: { locale: Locale; slug: string[] }[] = [];

  for (const locale of locales) {
    const slugs = getAllSlugs(locale);
    slugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale, slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.metadata.title} | My Tech Blog`,
    description: post.metadata.excerpt,
  };
}

const mdxComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="mb-4 mt-8 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="mb-3 mt-8 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="mb-2 mt-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
      {children}
    </h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4 leading-7 text-zinc-700 dark:text-zinc-300">
      {children}
    </p>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a
      href={href}
      className="font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300"
    >
      {children}
    </a>
  ),
  code: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
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
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="mb-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 dark:bg-zinc-950">
      {children}
    </pre>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="mb-4 ml-6 list-disc space-y-2 text-zinc-700 dark:text-zinc-300">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2 text-zinc-700 dark:text-zinc-300">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="leading-7">{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="mb-4 border-l-4 border-zinc-300 pl-4 italic text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-zinc-200 dark:border-zinc-800" />,
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="mb-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
        {children}
      </table>
    </div>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="bg-zinc-50 px-4 py-2 text-left text-sm font-semibold text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300">
      {children}
    </td>
  ),
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  const t = blogTranslation.into(locale);
  const common = commonTranslation.into(locale);
  const post = getPostBySlug(locale, slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <article className="mx-auto max-w-3xl px-6 py-16">
        {/* Back Button */}
        <Link
          href={`/${locale}/blog`}
          className="mb-8 inline-flex items-center text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← {common.insert("backToBlog")}
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {post.metadata.category}
            </span>
            <span className="text-zinc-500 dark:text-zinc-500">•</span>
            <time className="text-zinc-500 dark:text-zinc-500">
              {new Date(post.metadata.date).toLocaleDateString(
                locale === "ja" ? "ja-JP" : "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </time>
            {post.metadata.readTime && (
              <>
                <span className="text-zinc-500 dark:text-zinc-500">•</span>
                <span className="text-zinc-500 dark:text-zinc-500">
                  {post.metadata.readTime}
                </span>
              </>
            )}
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            {post.metadata.title}
          </h1>

          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            {post.metadata.excerpt}
          </p>

          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.metadata.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-zinc-500 dark:text-zinc-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkMath, remarkGfm],
                rehypePlugins: [rehypeKatex, rehypeHighlight],
              },
            }}
          />
        </div>

        {/* Article Footer */}
        <footer className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <Link
              href={`/${locale}/blog`}
              className="text-sm font-medium text-zinc-900 hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300"
            >
              ← {t.insert("allArticles")}
            </Link>
            <Link
              href={`/${locale}`}
              className="text-sm font-medium text-zinc-900 hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300"
            >
              {common.insert("home")} →
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
