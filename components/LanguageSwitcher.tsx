"use client";

import { Locale, locales } from "@/models/translation";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Remove the current locale from the pathname to get the base path
  const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "") || "/";

  return (
    <div className="flex items-center gap-2">
      {locales.map((locale: Locale) => {
        const isActive = locale === currentLocale;
        const newPath = `/${locale}${
          pathWithoutLocale === "/" ? "" : pathWithoutLocale
        }`;

        return (
          <Link
            key={locale}
            href={newPath}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
            }`}
            aria-label={`Switch to ${locale === "en" ? "English" : "日本語"}`}
          >
            {locale === "en" ? "EN" : "JA"}
          </Link>
        );
      })}
    </div>
  );
}
