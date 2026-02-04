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

  return panelState;
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