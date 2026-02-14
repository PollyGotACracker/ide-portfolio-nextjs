'use client';

import styles from "./SidePanel.module.css";
import { useState } from "react";

interface SidePanelProps {
  explorer: React.ReactNode;
  search: React.ReactNode;
  sourceControl: React.ReactNode;
  extensions: React.ReactNode;
}

export default function SidePanel({ explorer, search, sourceControl, extensions }: SidePanelProps) {
  const [activeMenu, setActiveMenu] = useState<Menu>("explorer");

  const MENU_CONFIG = {
    explorer: { icon: "files", name: "Files", comp: explorer },
    search: { icon: "search", name: "Search", comp: search },
    sourceControl: { icon: "source-control", name: "Source Control", comp: sourceControl },
    extensions: { icon: "extensions", name: "Extensions", comp: extensions },
  } as const;
  type Menu = keyof typeof MENU_CONFIG;

  function renderButton(id: Menu) {
    const activeStyle = activeMenu === id ? ` ${styles.active}` : "";
    return (
      <button
        className={`${styles.menuButton}${activeStyle}`}
        onClick={() => setActiveMenu(id)}
        name={MENU_CONFIG[id].name}
      >
        <i className={`${styles.icon} codicon codicon-${MENU_CONFIG[id].icon}`} />
      </button>
    );
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.menuList}>
        {renderButton("explorer")}
        {renderButton("search")}
        {renderButton("sourceControl")}
        {renderButton("extensions")}
      </div>
      <div className={`${styles.contentWrapper} scrollbar`}>
        {MENU_CONFIG[activeMenu].comp}
      </div>
    </aside>
  );
}