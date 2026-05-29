"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeMode = "night" | "day";

type ThemeContextValue = {
  mode: ThemeMode;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("night");

  useEffect(() => {
    const savedMode = window.localStorage.getItem("manga-theme-mode");
    if (savedMode === "night" || savedMode === "day") {
      setMode(savedMode);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("manga-theme-mode", mode);
    document.body.dataset.themeMode = mode;
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      toggleMode: () => setMode((previousMode) => (previousMode === "night" ? "day" : "night")),
    }),
    [mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeMode must be used inside ThemeProvider.");
  }

  return context;
}
