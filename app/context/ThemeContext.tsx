"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import themeColors from "../components/themeColors/themeColors";

interface ThemeContextProps {
  themeMode: "dark" | "light";
  theme: { background: string; text: string };
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");

  const theme = themeColors[themeMode];

  const toggleTheme = () => {
    setThemeMode(themeMode === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ themeMode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
