import { translationConfig } from "@/app/config";
import { Sentence, Translation } from "@/models/translation/Translation";

// Blog page translations
export const blogTranslation = new Translation(translationConfig, {
  ja: new Sentence({
    allArticles: "すべての記事",
    articlePublished: "件の記事",
    articlesPublished: "件の記事",
  }),
  en: new Sentence({
    allArticles: "All Articles",
    articlePublished: "article published",
    articlesPublished: "articles published",
  }),
});
