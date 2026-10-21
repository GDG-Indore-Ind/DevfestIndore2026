"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
export default function ThemeChoice() {
  const { theme, setTheme } = useTheme();
  return <div className="theme-choice" role="group" aria-label="Appearance">
    <button type="button" aria-label="Light appearance" title="Light appearance" aria-pressed={theme === "light"} onClick={() => setTheme("light")}><Sun aria-hidden="true" /></button>
    <button type="button" aria-label="Dark appearance" title="Dark appearance" aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}><Moon aria-hidden="true" /></button>
  </div>;
}
