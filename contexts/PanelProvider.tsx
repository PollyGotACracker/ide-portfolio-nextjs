'use client';

import { createContext, useContext, useState } from 'react';

export type PanelState = boolean | "";
interface PanelContextType {
  showAside: PanelState;
  showFooter: PanelState;
  setShowAside: React.Dispatch<React.SetStateAction<PanelState>>;
  setShowFooter: React.Dispatch<React.SetStateAction<PanelState>>;
}

const PanelContext = createContext<PanelContextType | null>(null);

export function usePanel() {
  const panelState = useContext(PanelContext);
  if (!panelState) {
    throw new Error("usePanel must be used within a PanelProvider.");
  }

  function callback(prev: boolean | "") {
    if (prev === "") {
      // 데스크톱: false(닫기), 모바일: true(열기)
      return !(window.innerWidth > 768);
    }
    return !prev;
  }

  function closeMobileAside() {
    if (!(window.innerWidth > 768)) {
      panelState?.setShowAside(false);
    }
  }

  return {
    ...panelState,
    toggleFooter: () => panelState.setShowFooter(callback),
    toggleAside: () => panelState.setShowAside(callback),
    closeMobileAside
  };
}

export default function PanelProvider({ children }: { children: React.ReactNode; }) {
  const [showAside, setShowAside] = useState<PanelState>("");
  const [showFooter, setShowFooter] = useState<PanelState>("");

  return (
    <PanelContext.Provider value={{ showAside, showFooter, setShowAside, setShowFooter }}>
      {children}
    </PanelContext.Provider>
  );
}