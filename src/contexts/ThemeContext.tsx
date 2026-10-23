"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "dark" | "light";
interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
}
const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
  isDark: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, updateTheme] = useState<Theme>("light");
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("devfest-theme");
    } catch {
      /* Appearance still works without storage. */
    }
    const resolved = saved === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", resolved);
    const frame = requestAnimationFrame(() => updateTheme(resolved));
    return () => cancelAnimationFrame(frame);
  }, []);
  function setTheme(next: Theme) {
    updateTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("devfest-theme", next);
    } catch {
      /* Keep the choice for this visit. */
    }
  }
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
        isDark: theme === "dark",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  return useContext(ThemeContext);
}
