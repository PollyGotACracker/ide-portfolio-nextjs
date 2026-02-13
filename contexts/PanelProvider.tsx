'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type PanelState = boolean | "";
interface PanelContextType {
  showAside: PanelState;
  showFooter: PanelState;
  setShowAside: React.Dispatch<React.SetStateAction<PanelState>>;
  setShowFooter: React.Dispatch<React.SetStateAction<PanelState>>;
  toggleAside: () => void;
  toggleFooter: () => void;
  closeMobileAside: () => void;
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

  function toggleFooter() {
    setShowFooter((prev: boolean | "") => {
      if (prev === "") {
        return true;
      }
      return !prev;
    });
  }

  function toggleAside() {
    setShowAside((prev: boolean | "") => {
      if (prev === "") {
        // 데스크톱: false(닫기), 모바일: true(열기)
        return !(window.innerWidth > 768);
      }
      return !prev;
    });
  }

  function closeMobileAside() {
    if (!(window.innerWidth > 768)) {
      setShowAside(false);
    }
  }

  useEffect(() => {
    function onKeyDownCb(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const key = e.key;
        switch (key) {
          case "b":
            return toggleAside();
          case "j":
            return toggleFooter();
        }
      }
    }
    document.addEventListener("keydown", onKeyDownCb);
    return () => {
      document.removeEventListener("keydown", onKeyDownCb);
    };
  }, []);

  return (
    <PanelContext.Provider value={{
      showAside,
      showFooter,
      setShowAside,
      setShowFooter,
      toggleFooter,
      toggleAside,
      closeMobileAside
    }}>
      {children}
    </PanelContext.Provider>
  );
}