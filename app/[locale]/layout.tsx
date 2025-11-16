import LanguageSwitcher from "@/components/LanguageSwitcher";
import { isValidLocale, Locale, locales } from "@/models/translation";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tech Blog | Articles & Tutorials",
  description:
    "A collection of technical articles, tutorials, and insights on software development, web technologies, and programming.",
};

// Generate static params for all locales
export async function generateStaticParams() {
  return locales.map((locale: Locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate locale
  if (!isValidLocale(locale)) {
    notFound();
  }

  // TypeScript knows locale is Locale type after validation
  const validLocale = locale as Locale;

  return (
    <html lang={validLocale}>
      <head>
        {/* Hreflang tags for SEO */}
        {locales.map((loc: Locale) => (
          <link key={loc} rel="alternate" hrefLang={loc} href={`/${loc}`} />
        ))}
        <link rel="alternate" hrefLang="x-default" href="/en" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link
              href={`/${validLocale}`}
              className="text-xl font-bold text-zinc-900 dark:text-zinc-50"
            >
              Tech Blog
            </Link>
            <LanguageSwitcher currentLocale={validLocale} />
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
