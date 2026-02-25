export const THEME_COLOR_KEYS = [
  "background", // ページ全体の背景色
  "foreground", // ページ全体のデフォルトテキスト色
  "card", // カードコンポーネントの背景色
  "card-foreground", // カード内のテキスト色
  "popover", // ドロップダウン・ツールチップの背景色
  "popover-foreground", // ドロップダウン・ツールチップのテキスト色
  "primary", // メインアクション・強調要素の色（ボタン・リンク等）
  "primary-foreground", // primary 背景上のテキスト色
  "secondary", // サブアクション・補助要素の色
  "secondary-foreground", // secondary 背景上のテキスト色
  "muted", // 控えめな背景色（無効状態・区切り等）
  "muted-foreground", // 控えめなテキスト色（補足情報・プレースホルダー等）
  "accent", // ホバー・選択状態のハイライト色
  "accent-foreground", // accent 背景上のテキスト色
  "destructive", // 削除・エラー・警告アクションの色
  "border", // ボーダー・区切り線の色
  "input", // フォーム入力欄のボーダー色
  "ring", // フォーカスリングの色
  "star", // Star コンポーネント専用の色
] as const;

export type ThemeColorKey = (typeof THEME_COLOR_KEYS)[number];

export type Theme = Record<ThemeColorKey, string>;

export type ThemeName = "default" | "dark" | "warm" | "warm-dark";

export const themes: Record<ThemeName, Theme> = {
  default: {
    background: "oklch(1 0 0)", // 純白
    foreground: "oklch(0.145 0 0)", // インク黒
    card: "oklch(1 0 0)", // 純白
    "card-foreground": "oklch(0.145 0 0)", // インク黒
    popover: "oklch(1 0 0)", // 純白
    "popover-foreground": "oklch(0.145 0 0)", // インク黒
    primary: "oklch(0.205 0 0)", // チャコール
    "primary-foreground": "oklch(0.985 0 0)", // わずかにくすんだ白
    secondary: "oklch(0.97 0 0)", // 薄いグレー
    "secondary-foreground": "oklch(0.205 0 0)", // チャコール
    muted: "oklch(0.97 0 0)", // 薄いグレー
    "muted-foreground": "oklch(0.556 0 0)", // 灰色
    accent: "oklch(0.97 0 0)", // 薄いグレー
    "accent-foreground": "oklch(0.205 0 0)", // チャコール
    destructive: "oklch(0.577 0.245 27.325)", // 深紅
    border: "oklch(0.922 0 0)", // シルバー
    input: "oklch(0.922 0 0)", // シルバー
    ring: "oklch(0.708 0 0)", // 鉛色
    star: "oklch(0.205 0 0)", // チャコール
  },

  dark: {
    background: "oklch(0.145 0 0)", // 夜の黒
    foreground: "oklch(0.985 0 0)", // 薄白
    card: "oklch(0.205 0 0)", // 暗い表面
    "card-foreground": "oklch(0.985 0 0)", // 薄白
    popover: "oklch(0.205 0 0)", // 暗い表面
    "popover-foreground": "oklch(0.985 0 0)", // 薄白
    primary: "oklch(0.922 0 0)", // シルバー
    "primary-foreground": "oklch(0.205 0 0)", // 暗い表面
    secondary: "oklch(0.269 0 0)", // ダークスレート
    "secondary-foreground": "oklch(0.985 0 0)", // 薄白
    muted: "oklch(0.269 0 0)", // ダークスレート
    "muted-foreground": "oklch(0.708 0 0)", // 中間グレー
    accent: "oklch(0.269 0 0)", // ダークスレート
    "accent-foreground": "oklch(0.985 0 0)", // 薄白
    destructive: "oklch(0.704 0.191 22.216)", // ローズレッド
    border: "oklch(1 0 0 / 10%)", // 白 10% 透過
    input: "oklch(1 0 0 / 15%)", // 白 15% 透過
    ring: "oklch(0.556 0 0)", // 暗めのグレー
    star: "oklch(0.922 0 0)", // シルバー
  },

  warm: {
    background: "oklch(0.99 0.01 40)", // クリーム色
    foreground: "oklch(0.2 0.05 30)", // エスプレッソ
    card: "oklch(0.99 0.01 40)", // クリーム色
    "card-foreground": "oklch(0.2 0.05 30)", // エスプレッソ
    popover: "oklch(0.99 0.01 40)", // クリーム色
    "popover-foreground": "oklch(0.2 0.05 30)", // エスプレッソ
    primary: "oklch(0.58 0.2 35)", // シエナ（赤茶）
    "primary-foreground": "oklch(0.99 0.01 40)", // クリーム色
    secondary: "oklch(0.95 0.03 45)", // ラテ
    "secondary-foreground": "oklch(0.25 0.05 30)", // 濃いエスプレッソ
    muted: "oklch(0.95 0.02 40)", // 砂色
    "muted-foreground": "oklch(0.5 0.05 35)", // トープ（灰茶色）
    accent: "oklch(0.85 0.15 50)", // アプリコット
    "accent-foreground": "oklch(0.2 0.05 30)", // エスプレッソ
    destructive: "oklch(0.58 0.25 27)", // 錆色
    border: "oklch(0.9 0.02 40)", // 温かみのあるグレー
    input: "oklch(0.9 0.02 40)", // 温かみのあるグレー
    ring: "oklch(0.58 0.2 35)", // シエナ（赤茶）
    star: "oklch(0.58 0.2 35)", // シエナ（赤茶）
  },

  "warm-dark": {
    background: "oklch(0.15 0.03 25)", // 焦げ茶
    foreground: "oklch(0.95 0.02 40)", // リネン
    card: "oklch(0.2 0.04 30)", // ダークチョコ
    "card-foreground": "oklch(0.95 0.02 40)", // リネン
    popover: "oklch(0.2 0.04 30)", // ダークチョコ
    "popover-foreground": "oklch(0.95 0.02 40)", // リネン
    primary: "oklch(0.75 0.18 40)", // アンバー（琥珀）
    "primary-foreground": "oklch(0.15 0.03 25)", // 焦げ茶
    secondary: "oklch(0.28 0.04 35)", // ダークウォールナット
    "secondary-foreground": "oklch(0.95 0.02 40)", // リネン
    muted: "oklch(0.28 0.04 35)", // ダークウォールナット
    "muted-foreground": "oklch(0.65 0.05 40)", // マッシュルーム
    accent: "oklch(0.7 0.2 50)", // ティール（青緑）
    "accent-foreground": "oklch(0.95 0.02 40)", // リネン
    destructive: "oklch(0.65 0.22 25)", // 残り火
    border: "oklch(0.95 0.02 40 / 12%)", // リネン 12% 透過
    input: "oklch(0.95 0.02 40 / 18%)", // リネン 18% 透過
    ring: "oklch(0.75 0.18 40)", // アンバー（琥珀）
    star: "oklch(0.75 0.18 40)", // アンバー（琥珀）
  },
};
