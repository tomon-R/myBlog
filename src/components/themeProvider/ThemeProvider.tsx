"use client";

import { themes, type ThemeName } from "@/hooks/theme/themeConfig";
import { ThemeContext } from "@/hooks/theme/themeContext";
import { useEffect, useState, type ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeName;
}

export function ThemeProvider({
  children,
  defaultTheme = "warm-dark",
}: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme);

  useEffect(() => {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(themes[themeName])) {
      root.style.setProperty(`--${key}`, value);
    }
  }, [themeName]);

  return (
    <ThemeContext.Provider
      value={{ theme: themes[themeName], setTheme: setThemeName }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
