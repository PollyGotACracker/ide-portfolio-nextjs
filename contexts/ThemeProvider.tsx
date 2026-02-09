'use client';

import { createContext, useContext, useState } from 'react';

export type ThemeState = boolean;
interface ThemeContextType {
  themeState: ThemeState;
  setThemeState: React.Dispatch<React.SetStateAction<ThemeState>>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const state = useContext(ThemeContext);
  if (!state) {
    throw new Error("useTheme must be used within a ThemeProvider.");
  }

  return {
    ...state,
    toggleTheme: () => state.setThemeState(Theme.toggle),
  };
}

export default function ThemeProvider({ children }: { children: React.ReactNode; }) {
  const [themeState, setThemeState] = useState<ThemeState>(Theme.init);

  return (
    <ThemeContext.Provider value={{ themeState, setThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const Theme = {
  load() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      document.documentElement.dataset.theme = saved;
    } else {
      const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    }
  },
  init() {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    if (saved) {
      // document.documentElement.dataset.theme = saved;
      return saved === "dark";
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // const theme = prefersDark ? 'dark' : 'light';
    // document.documentElement.dataset.theme = theme;
    return prefersDark;
  },
  toggle(prev: boolean) {
    const result = !prev;
    const value = result ? 'dark' : 'light';
    document.documentElement.dataset.theme = value;
    // document.documentElement.setAttribute('data-theme', value);
    localStorage.setItem('theme', value);
    return result;
  }
};