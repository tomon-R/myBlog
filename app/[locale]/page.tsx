import { getFeaturedPosts } from "@/models/posts";
import { Locale } from "@/models/translation";
import Link from "next/link";
import { homeTranslation } from "./homeTranslation";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = homeTranslation.into(locale);
  const featuredPosts = getFeaturedPosts(locale);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
            {t.insert("welcomeToMyBlog")}
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl">
            {t.insert("welcomeDescription")}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={`/${locale}/blog`}
              className="rounded-md bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {t.insert("readArticles")}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-50"
            >
              {t.insert("aboutMe")} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t.insert("featuredArticles")}
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            {t.insert("latestInsights")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
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
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </time>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 group-hover:text-zinc-600 dark:text-zinc-50 dark:group-hover:text-zinc-300">
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.metadata.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {post.metadata.excerpt}
                </p>
                <div className="mt-4 text-xs text-zinc-500 dark:text-zinc-500">
                  {post.metadata.readTime}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-2xl bg-zinc-50 px-6 py-16 dark:bg-zinc-900 sm:px-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {t.insert("stayUpdated")}
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              {t.insert("subscribeNewsletter")}
            </p>
            <form className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-2">
              <input
                type="email"
                placeholder={t.insert("enterEmail")}
                className="min-w-0 flex-1 rounded-md border border-zinc-300 px-4 py-3 text-sm focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-500 dark:focus:ring-zinc-50"
              />
              <button
                type="submit"
                className="rounded-md bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {t.insert("subscribe")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
