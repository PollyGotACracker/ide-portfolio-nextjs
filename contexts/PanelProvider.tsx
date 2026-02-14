'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkWindows } from '@/libs/checker';
import { PATHS } from '@/constants/path';

export type PanelState = boolean | "";
interface PanelContextType {
  showSide: PanelState;
  showBottom: PanelState;
  setShowSide: React.Dispatch<React.SetStateAction<PanelState>>;
  setShowBottom: React.Dispatch<React.SetStateAction<PanelState>>;
  toggleSide: () => void;
  toggleBottom: () => void;
  closeMobileSide: () => void;
  goHome: () => void;
  goBack: () => void;
  goForward: () => void;
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
  const [showSide, setShowSide] = useState<PanelState>("");
  const [showBottom, setShowBottom] = useState<PanelState>("");
  const router = useRouter();

  /* Panel */
  function toggleBottom() {
    setShowBottom((prev: boolean | "") => {
      if (prev === "") {
        return true;
      }
      return !prev;
    });
  }
  function toggleSide() {
    setShowSide((prev: boolean | "") => {
      if (prev === "") {
        // 데스크톱: false(닫기), 모바일: true(열기)
        return !(window.innerWidth > 768);
      }
      return !prev;
    });
  }
  function closeMobileSide() {
    if (!(window.innerWidth > 768)) {
      setShowSide(false);
    }
  }

  /* History */
  function goHome() {
    router.push(PATHS.HOME);
  }
  function goBack() {
    router.back();
  }
  function goForward() {
    router.forward();
  }

  useEffect(() => {
    const isWindows = checkWindows();
    function onKeyDownCb(e: KeyboardEvent) {
      // Panel
      if ((e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const key = e.key;
        switch (key) {
          case "b":
            return toggleSide();
          case "j":
            return toggleBottom();
        }
      }
      // History
      const isGoBack = isWindows
        ? (e.altKey && e.key === 'ArrowLeft')
        : (e.ctrlKey && e.key === '-');
      const isGoForward = isWindows
        ? (e.altKey && e.key === 'ArrowRight')
        : (e.ctrlKey && e.shiftKey && e.key === '-');
      if (isGoBack) {
        return goBack();
      } if (isGoForward) {
        return goForward();
      }
    }
    document.addEventListener("keydown", onKeyDownCb);
    return () => {
      document.removeEventListener("keydown", onKeyDownCb);
    };
  }, []);

  return (
    <PanelContext.Provider value={{
      showSide,
      showBottom,
      setShowSide,
      setShowBottom,
      toggleBottom,
      toggleSide,
      closeMobileSide,
      goHome,
      goBack,
      goForward,
    }}>
      {children}
    </PanelContext.Provider>
  );
}