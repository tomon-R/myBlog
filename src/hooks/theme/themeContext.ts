"use client";

import { createContext } from "react";
import { themes, type Theme, type ThemeName } from "./themeConfig";

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (name: ThemeName) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: themes["warm-dark"],
  setTheme: () => {},
});
