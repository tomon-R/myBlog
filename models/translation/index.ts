import { translationConfig } from "@/app/config";
import { validateLocale } from "./Translation";

// Export the Locale type
export type Locale = (typeof translationConfig.validLocales)[number];

// Export the locales array
export const locales = translationConfig.validLocales as readonly Locale[];

// Helper function to validate if a string is a valid locale
export function isValidLocale(locale: string): locale is Locale {
  return validateLocale(translationConfig, locale);
}

// Re-export Translation types for convenience
export { Sentence, Translation } from "./Translation";
export type { TranslationConfig } from "./Translation";
