"use client";

import styles from "./SidePanel.module.css";
import { useState } from "react";
import Codicon from "@/components/Codicon";
import { cn } from "@/utils/cn";

interface SidePanelProps {
  explorer: React.ReactNode;
  search: React.ReactNode;
  sourceControl: React.ReactNode;
  extensions: React.ReactNode;
}

export default function SidePanel({
  explorer,
  search,
  sourceControl,
  extensions,
}: SidePanelProps) {
  const [activeMenu, setActiveMenu] = useState<Menu>("explorer");

  const MENU_CONFIG = {
    explorer: { icon: "files", name: "Files", scrollbar: true, comp: explorer },
    search: { icon: "search", name: "Search", scrollbar: true, comp: search },
    sourceControl: {
      icon: "source-control",
      name: "Source Control",
      scrollbar: false,
      comp: sourceControl,
    },
    extensions: {
      icon: "extensions",
      name: "Extensions",
      scrollbar: false,
      comp: extensions,
    },
  } as const;
  type Menu = keyof typeof MENU_CONFIG;

  function renderButton(id: Menu) {
    return (
      <button
        className={cn(styles.menuButton, activeMenu === id && styles.active)}
        onClick={() => setActiveMenu(id)}
        name={MENU_CONFIG[id].name}
      >
        <Codicon name={MENU_CONFIG[id].icon} />
      </button>
    );
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.menuList}>
        {renderButton("explorer")}
        {renderButton("search")}
        {renderButton("sourceControl")}
        {renderButton("extensions")}
      </div>
      <div
        className={cn(
          styles.contentWrapper,
          MENU_CONFIG[activeMenu].scrollbar ? "scrollbar" : "scrollbarHidden",
        )}
      >
        {MENU_CONFIG[activeMenu].comp}
      </div>
    </aside>
  );
}
