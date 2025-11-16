/**
 * Generic classification for Translation Errors
 */
export class TranslationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TranslationError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  addChildName(childName: string) {
    this.name = this.name + "." + childName;
  }
}

/**
 * Generic classification for Translation Warnings
 */
export class TranslationWarning {
  name: string = "TranslationWarning";
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  addChildName(childName: string) {
    this.name = this.name + "." + childName;
  }

  /**
   * Log this warning to console
   */
  log(): void {
    console.warn(`[${this.name}] ${this.message}`);
  }
}

export class InvalidLocaleError extends TranslationError {
  constructor(message = "Locale is not valid.") {
    super(message);
    this.addChildName("InvalidLocaleError");
  }
}

export class InvalidLocaleWarning extends TranslationWarning {
  constructor(public readonly invalidLocales: string[], message?: string) {
    super(
      message ||
        `Translation contains invalid locales: ${invalidLocales.join(", ")}`
    );
    this.addChildName("InvalidLocaleWarning");
  }
}

export class NotFoundTranslationError extends TranslationError {
  constructor(message = "Translation not Found.") {
    super(message);
    this.addChildName("NotFoundTranslationError");
  }
}

export class InconsistentKeysWarning extends TranslationWarning {
  constructor(
    public readonly inconsistencies: Record<string, { missing: string[]; extra: string[] }>,
    message?: string
  ) {
    const details = Object.entries(inconsistencies)
      .map(([locale, { missing, extra }]) => {
        const parts: string[] = [];
        if (missing.length > 0) {
          parts.push(`missing: ${missing.join(", ")}`);
        }
        if (extra.length > 0) {
          parts.push(`extra: ${extra.join(", ")}`);
        }
        return `${locale} (${parts.join("; ")})`;
      })
      .join("; ");

    super(
      message ||
        `Translation keys are inconsistent across locales: ${details}`
    );
    this.addChildName("InconsistentKeysWarning");
  }
}
