import { translationConfig } from "@/app/config";
import { Sentence, Translation } from "@/models/translation/Translation";

// Common translations shared across all pages
export const commonTranslation = new Translation(translationConfig, {
  ja: new Sentence({
    backToHome: "ホームに戻る",
    backToBlog: "ブログに戻る",
    home: "ホーム",
  }),
  en: new Sentence({
    backToHome: "Back to Home",
    backToBlog: "Back to Blog",
    home: "Home",
  }),
});
