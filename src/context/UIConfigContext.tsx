'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface UIConfigContextType {
  language: string;
  timezone: string;
  platform: string;
  theme: 'light' | 'dark';
  setLanguage: (lang: string) => void;
  setTimezone: (tz: string) => void;
  setPlatform: (platform: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const UIConfigContext = createContext<UIConfigContextType | null>(null);

export interface UIConfigProviderProps {
  children: ReactNode;
  language?: string;
  timezone?: string;
  platform?: string;
  theme?: 'light' | 'dark';
}

export function UIConfigProvider({
  children,
  language: initialLanguage = 'en-US',
  timezone: initialTimezone = 'UTC',
  platform: initialPlatform = 'desktop',
  theme: initialTheme = 'light',
}: UIConfigProviderProps) {
  const [language, setLanguage] = useState(initialLanguage);
  const [timezone, setTimezone] = useState(initialTimezone);
  const [platform, setPlatform] = useState(initialPlatform);
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);

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
      setPlatform(initialPlatform);
    }
  }, [initialPlatform]);

  useEffect(() => {
    if (initialTheme) {
      setTheme(initialTheme);
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
    throw new Error('useUIConfig must be used within a UIConfigProvider');
  }
  return context;
}
