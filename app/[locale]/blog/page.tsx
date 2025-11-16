import { commonTranslation } from "@/app/commonTranslation";
import { getAllPosts } from "@/models/posts";
import { Locale } from "@/models/translation";
import Link from "next/link";
import { blogTranslation } from "./blogTranslation";

export const metadata = {
  title: "Blog | My Tech Blog",
  description:
    "Browse all articles and tutorials on software development and technology.",
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = blogTranslation.into(locale);
  const common = commonTranslation.into(locale);
  const posts = getAllPosts(locale);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link
            href={`/${locale}`}
            className="mb-8 inline-flex items-center text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            ← {common.insert("backToHome")}
          </Link>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t.insert("allArticles")}
          </h1>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
            {posts.length}{" "}
            {posts.length === 1 ? t.insert("articlePublished") : t.insert("articlesPublished")}
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-x-2 text-xs">
                  <span className="rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    {post.metadata.category}
                  </span>
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
                </div>
                <h2 className="text-2xl font-semibold text-zinc-900 group-hover:text-zinc-600 dark:text-zinc-50 dark:group-hover:text-zinc-300">
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.metadata.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {post.metadata.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500">
                  <span>{post.metadata.readTime}</span>
                  {post.metadata.tags && post.metadata.tags.length > 0 && (
                    <div className="flex gap-2">
                      {post.metadata.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-zinc-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-zinc-200 p-12 text-center dark:border-zinc-800">
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              No articles yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
