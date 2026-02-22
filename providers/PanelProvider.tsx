"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { checkWindows } from "@/libs/checker";
import { PATHS } from "@/constants/path";

const DEFAULT_VALUE = "default";
export type PanelState = boolean | typeof DEFAULT_VALUE;
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

export default function PanelProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSide, setShowSide] = useState<PanelState>(DEFAULT_VALUE);
  const [showBottom, setShowBottom] = useState<PanelState>(DEFAULT_VALUE);
  const router = useRouter();

  /* Panel */
  function toggleBottom() {
    setShowBottom((prev: PanelState) => {
      if (prev === DEFAULT_VALUE) {
        return true;
      }
      return !prev;
    });
  }
  function toggleSide() {
    setShowSide((prev: PanelState) => {
      // 데스크톱 기본값을 open으로 할 경우...
      // if (typeof window === "undefined") return prev;
      // if (prev === DEFAULT_VALUE) {
      //   // 데스크톱: false(닫기), 모바일: true(열기)
      //   return !(window.innerWidth > 768);
      // }
      if (prev === DEFAULT_VALUE) {
        return true;
      }
      return !prev;
    });
  }
  function closeMobileSide() {
    if (typeof window === "undefined") return;
    if (!(window.innerWidth > 768)) {
      setShowSide(false);
    }
  }

  /* History */
  const goHome = () => {
    router.push(PATHS.HOME);
  };
  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  const goForward = useCallback(() => {
    router.forward();
  }, [router]);

  useEffect(() => {
    const isWindows = checkWindows();
    if (isWindows === undefined) return;
    function onKeyDownCb(e: KeyboardEvent) {
      // Panel
      if (e.ctrlKey || e.metaKey) {
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
        ? e.altKey && e.key === "ArrowLeft"
        : e.ctrlKey && e.key === "-";
      const isGoForward = isWindows
        ? e.altKey && e.key === "ArrowRight"
        : e.ctrlKey && e.shiftKey && e.key === "-";
      if (isGoBack) {
        return goBack();
      }
      if (isGoForward) {
        return goForward();
      }
    }
    document.addEventListener("keydown", onKeyDownCb);
    return () => {
      document.removeEventListener("keydown", onKeyDownCb);
    };
  }, [goBack, goForward]);

  return (
    <PanelContext.Provider
      value={{
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
      }}
    >
      {children}
    </PanelContext.Provider>
  );
}
