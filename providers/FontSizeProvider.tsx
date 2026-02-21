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

export default function FontSizeProvider({
  children,
  initialLarge = false,
}: {
  children: React.ReactNode;
  initialLarge?: boolean;
}) {
  const [fontSizeState, setFontSizeState] = useState<FontSizeState>(initialLarge);

  return (
    <FontSizeContext.Provider value={{ fontSizeState, setFontSizeState }}>
      {children}
    </FontSizeContext.Provider>
  );
}

const FontSize = {
  toggle(prev: boolean) {
    const result = !prev;
    const value = result ? '20px' : '16px';
    document.documentElement.style.setProperty('--font-size', value);
    document.cookie = `font_size=${value};path=/;max-age=31536000`;
    return result;
  }
};