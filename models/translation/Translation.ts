import {
  InconsistentKeysWarning,
  InvalidLocaleError,
  InvalidLocaleWarning,
  NotFoundTranslationError,
} from "@/models/error/TranslationError";

export interface TranslationConfig {
  validLocales: readonly string[];
  defaultLocale: string;
}

export type Locale = string;

export function validateLocale(
  conf: TranslationConfig,
  locale: string
): locale is Locale {
  const validLocales = conf.validLocales;
  return validLocales.includes(locale);
}

export function assertValidLocale(
  conf: TranslationConfig,
  locale: string
): asserts locale is Locale {
  if (!validateLocale(conf, locale)) {
    throw new InvalidLocaleError();
  }
}

export class Sentence {
  private data: Record<string, string>;

  constructor(data: Record<string, string>) {
    this.data = data;
  }

  has(key: string): boolean {
    return key in this.data;
  }

  keys(): string[] {
    return Object.keys(this.data);
  }

  insert(key: string): string {
    if (!this.has(key)) {
      throw new NotFoundTranslationError(`Missing translation: "${key}"`);
    }
    return this.data[key];
  }
}

export class Translation {
  private data: Record<Locale, Sentence>;
  private conf: TranslationConfig;

  constructor(conf: TranslationConfig, data: Record<Locale, Sentence>) {
    this.conf = conf;

    // Validation 1: all sentences should share same keys
    const dataLocales = Object.keys(data);
    if (dataLocales.length > 0) {
      // Get all unique keys across all locales
      const allKeys = new Set<string>();
      dataLocales.forEach((locale) => {
        data[locale].keys().forEach((key) => allKeys.add(key));
      });

      // Check each locale for missing or extra keys
      const inconsistencies: Record<
        string,
        { missing: string[]; extra: string[] }
      > = {};
      const allKeysArray = Array.from(allKeys);

      dataLocales.forEach((locale) => {
        const localeKeys = new Set(data[locale].keys());
        const missing = allKeysArray.filter((key) => !localeKeys.has(key));
        const extra = Array.from(localeKeys).filter((key) => !allKeys.has(key));

        if (missing.length > 0 || extra.length > 0) {
          inconsistencies[locale] = { missing, extra };
        }
      });

      if (Object.keys(inconsistencies).length > 0) {
        const warning = new InconsistentKeysWarning(inconsistencies);
        warning.log();
      }
    }

    // Validation 2: may have only valid locates
    const invalidLocales = dataLocales.filter(
      (locale) => !validateLocale(conf, locale)
    );

    if (invalidLocales.length > 0) {
      const warning = new InvalidLocaleWarning(invalidLocales);
      warning.log();
    }

    this.data = data;
  }

  has(key: string): boolean {
    return key in this.data;
  }

  into(locale: string): Sentence {
    assertValidLocale(this.conf, locale);
    if (!this.has(locale)) {
      throw new NotFoundTranslationError(`Missing locale: ${locale}`);
    }
    return this.data[locale];
  }
}
