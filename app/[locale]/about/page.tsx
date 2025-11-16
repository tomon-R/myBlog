import { commonTranslation } from "@/app/commonTranslation";
import { Locale } from "@/models/translation";
import Link from "next/link";
import { homeTranslation } from "../homeTranslation";

export const metadata = {
  title: "About | My Tech Blog",
  description: "Learn more about me and my journey in technology.",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = homeTranslation.into(locale);
  const common = commonTranslation.into(locale);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* Back Button */}
        <Link
          href={`/${locale}`}
          className="mb-8 inline-flex items-center text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← {common.insert("backToHome")}
        </Link>

        {/* Main Content */}
        <article className="prose prose-zinc dark:prose-invert max-w-none">
          <h1 className="mb-8 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            About Me
          </h1>

          <div className="space-y-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            <p>
              Welcome to my tech blog! I&apos;m a software developer passionate
              about building great products and sharing knowledge with the
              community.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              What I Do
            </h2>
            <p>
              I specialize in web development, working with modern technologies
              like React, Next.js, TypeScript, and more. I love exploring new
              tools and techniques that help build better, faster, and more
              maintainable applications.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Why I Write
            </h2>
            <p>
              This blog is my way of documenting my learning journey and sharing
              insights with others. I believe that writing about what we learn
              not only helps others but also deepens our own understanding.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Topics I Cover
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Web Development (React, Next.js, TypeScript)</li>
              <li>Software Architecture and Design Patterns</li>
              <li>Performance Optimization</li>
              <li>Developer Tools and Productivity</li>
              <li>Best Practices and Code Quality</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Get in Touch
            </h2>
            <p>
              I&apos;m always happy to connect with fellow developers and tech
              enthusiasts. Feel free to reach out if you have questions,
              suggestions, or just want to chat about technology!
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href={`/${locale}/blog`}
                className="rounded-md bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {t.insert("readArticles")}
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
