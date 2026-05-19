"use client";

import { createContext, useContext } from "react";
import useObserver from "@/hooks/useObserver";
import { getFirstPath, getLastPathId } from "@/utils/getPath";
import { usePathname } from "next/navigation";

interface ActvieIdContextType {
  activeId: string | null;
  activeSectionId: string | null;
  parentPath: string;
  lastPathId: string;
  pathname: string;
}

const ActiveIdContext = createContext<ActvieIdContextType | null>(null);

export function useActiveId() {
  const DEFAULT_STATE: ActvieIdContextType = {
    activeId: null,
    activeSectionId: null,
    parentPath: "",
    lastPathId: "",
    pathname: "",
  };
  return useContext(ActiveIdContext) ?? DEFAULT_STATE;
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
      value={{ parentPath, lastPathId, activeSectionId, activeId, pathname }}
    >
      {children}
    </ActiveIdContext.Provider>
  );
}
