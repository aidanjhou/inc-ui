"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface UIConfigContextType {
  language: string;
  timezone: string;
  platform: string;
  theme: string;
  setLanguage: (lang: string) => void;
  setTimezone: (tz: string) => void;
  setPlatform: (platform: string) => void;
  setTheme: (theme: string) => void;
}

export const UIConfigContext = createContext<UIConfigContextType | null>(null);

export interface UIConfigProviderProps {
  children: ReactNode;
  language?: string;
  timezone?: string;
  platform?: string;
  theme?: string;
}

export function UIConfigProvider({
  children,
  language: initialLanguage = "en-US",
  timezone: initialTimezone = "UTC",
  platform: initialPlatform = "desktop",
  theme: initialTheme = "light",
}: UIConfigProviderProps) {
  const [language, setLanguage] = useState(initialLanguage);
  const [timezone, setTimezone] = useState(initialTimezone);
  const [platform, setPlatformState] = useState<string>(() => {
    if (initialPlatform === "desktop" || initialPlatform === "mobile") {
      return initialPlatform;
    }
    return "desktop";
  });
  const [theme, setThemeState] = useState<string>(() => {
    if (initialTheme === "light" || initialTheme === "dark") {
      return initialTheme;
    }
    return "light";
  });

  const setPlatform = (newPlatform: string) => {
    if (newPlatform === "desktop" || newPlatform === "mobile") {
      setPlatformState(newPlatform);
    }
  };

  const setTheme = (newTheme: string) => {
    if (newTheme === "light" || newTheme === "dark") {
      setThemeState(newTheme);
    }
  };

  // Sync state with props when they are updated from parent/server components
  useEffect(() => {
    if (initialLanguage) {
      setLanguage(initialLanguage);
    }
  }, [initialLanguage]);

  useEffect(() => {
    if (initialTimezone) {
      setTimezone(initialTimezone);
    }
  }, [initialTimezone]);

  useEffect(() => {
    if (initialPlatform) {
      if (initialPlatform === "desktop" || initialPlatform === "mobile") {
        setPlatformState(initialPlatform);
      }
    }
  }, [initialPlatform]);

  useEffect(() => {
    if (initialTheme) {
      if (initialTheme === "light" || initialTheme === "dark") {
        setThemeState(initialTheme);
      }
    }
  }, [initialTheme]);

  return (
    <UIConfigContext.Provider
      value={{
        language,
        timezone,
        platform,
        theme,
        setLanguage,
        setTimezone,
        setPlatform,
        setTheme,
      }}
    >
      {children}
    </UIConfigContext.Provider>
  );
}

export function useUIConfig() {
  const context = useContext(UIConfigContext);
  if (!context) {
    throw new Error("useUIConfig must be used within a UIConfigProvider");
  }
  return context;
}
