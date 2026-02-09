'use client';

import { createContext, useContext, useState } from 'react';

export type FontSizeState = boolean;
interface FontSizeContextType {
  fontSizeState: FontSizeState;
  setFontSizeState: React.Dispatch<React.SetStateAction<FontSizeState>>;
}

const FontSizeContext = createContext<FontSizeContextType | null>(null);

export function useFontSize() {
  const state = useContext(FontSizeContext);
  if (!state) {
    throw new Error("useFontSize must be used within a FontSizeProvider.");
  }

  return {
    ...state,
    toggleFontSize: () => state.setFontSizeState(FontSize.toggle),
  };
}

export default function FontSizeProvider({ children }: { children: React.ReactNode; }) {
  const [fontSizeState, setFontSizeState] = useState<FontSizeState>(FontSize.init);

  return (
    <FontSizeContext.Provider value={{ fontSizeState, setFontSizeState }}>
      {children}
    </FontSizeContext.Provider>
  );
}

const FontSize = {
  load() {
    const saved = localStorage.getItem('fontSize');
    if (saved) {
      document.documentElement.style.setProperty('--font-size', saved);
    }
  },
  init() {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('fontSize');
    if (saved) {
      // document.documentElement.style.setProperty('--font-size', saved);
      return saved === "20px";
    }
    return false;
  },
  toggle(prev: boolean) {
    const result = !prev;
    const value = result ? '20px' : '16px';
    document.documentElement.style.setProperty('--font-size', value);
    localStorage.setItem('fontSize', value);
    return result;
  }
};