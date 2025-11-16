import { translationConfig } from "@/app/config";
import { Sentence, Translation } from "@/models/translation/Translation";

// Home page translations
export const homeTranslation = new Translation(translationConfig, {
  ja: new Sentence({
    welcomeToMyBlog: "テックブログへようこそ",
    welcomeDescription:
      "ソフトウェア開発、ウェブ技術、プログラミングに関する技術記事、チュートリアル、洞察をお届けします。",
    readArticles: "記事を読む",
    aboutMe: "自己紹介",
    featuredArticles: "注目の記事",
    latestInsights: "最新の洞察と技術記事をご覧ください",
    stayUpdated: "最新情報を受け取る",
    subscribeNewsletter:
      "新しい記事やチュートリアルが公開されたら、メールでお知らせします。",
    enterEmail: "メールアドレスを入力",
    subscribe: "購読する",
  }),
  en: new Sentence({
    welcomeToMyBlog: "Welcome to My Tech Blog",
    welcomeDescription:
      "A collection of technical articles, tutorials, and insights on software development, web technologies, and programming.",
    readArticles: "Read Articles",
    aboutMe: "About Me",
    featuredArticles: "Featured Articles",
    latestInsights: "Explore my latest insights and technical articles",
    stayUpdated: "Stay Updated",
    subscribeNewsletter:
      "Get notified when I publish new articles and tutorials.",
    enterEmail: "Enter your email",
    subscribe: "Subscribe",
  }),
});
