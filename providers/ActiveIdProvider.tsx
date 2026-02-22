"use client";

import { createContext, useContext } from "react";
import useObserver from "@/hooks/useObserver";
import { getFirstPath, getLastPathId } from "@/libs/getPath";
import { usePathname } from "next/navigation";

interface ActvieIdContextType {
  activeId: string | null;
  activeSectionId: string | null;
  parentPath: string;
  lastPathId: string;
}

const ActiveIdContext = createContext<ActvieIdContextType | null>(null);

export function useActiveId() {
  const state = useContext(ActiveIdContext);
  if (!state) {
    throw new Error("useActiveId must be used within a ActiveIdProvider.");
  }
  return state;
}

export default function ActiveIdProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const parentPath = getFirstPath(pathname);
  const lastPathId = getLastPathId(pathname);
  const activeSectionId = useObserver("section[data-id]");
  const activeId = activeSectionId ?? lastPathId;

  return (
    <ActiveIdContext.Provider
      value={{ parentPath, lastPathId, activeSectionId, activeId }}
    >
      {children}
    </ActiveIdContext.Provider>
  );
}
