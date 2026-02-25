"use client";

import { useContext } from "react";
import type { Theme, ThemeName } from "./themeConfig";
import { ThemeContext } from "./themeContext";

/**
 * 現在のテーマの色値と、テーマ切り替え関数を返す。
 *
 * @example
 * const [theme, setTheme] = useTheme();
 * const starColor = theme.star;   // "oklch(0.75 0.18 40)"
 * setTheme("warm-dark");
 */
export function useTheme(): [Theme, (name: ThemeName) => void] {
  const { theme, setTheme } = useContext(ThemeContext);
  return [theme, setTheme];
}
