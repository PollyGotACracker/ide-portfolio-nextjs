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

export default function ThemeProvider({
  children,
  initialDark = false,
}: {
  children: React.ReactNode;
  initialDark?: boolean;
}) {
  const [themeState, setThemeState] = useState<ThemeState>(initialDark);

  return (
    <ThemeContext.Provider value={{ themeState, setThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const Theme = {
  toggle(prev: boolean) {
    const result = !prev;
    const value = result ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', result);
    document.cookie = `theme=${value};path=/;max-age=31536000`;
    return result;
  },
};