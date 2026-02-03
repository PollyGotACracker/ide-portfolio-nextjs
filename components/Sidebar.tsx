'use client';

import styles from "./Sidebar.module.css";
import { useState } from "react";
import Explorer from "./Explorer";
import Search from "./Search";
import SourceControl from "./SourceControl";
import Extensions from "./Extensions";

const MENU_CONFIG = {
  explorer: { icon: "files", name: "Files", comp: <Explorer /> },
  search: { icon: "search", name: "Search", comp: <Search /> },
  sourceControl: { icon: "source-control", name: "Source Control", comp: <SourceControl /> },
  extensions: { icon: "extensions", name: "Extensions", comp: <Extensions /> },
} as const;
type Menu = keyof typeof MENU_CONFIG;

export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState<Menu>("explorer");

  function renderButton(id: Menu) {
    const activeStyle = activeMenu === id ? styles.active : "";
    return (
      <button
        className={`${styles.menuButton} ${activeStyle}`}
        onClick={() => setActiveMenu(id)}
        name={MENU_CONFIG[id].name}
      >
        <i className={`${styles.icon} codicon codicon-${MENU_CONFIG[id].icon}`} />
      </button>
    );
  };

  return (
    <aside className={styles.sidebar}>
      {renderButton("explorer")}
      {renderButton("search")}
      {renderButton("sourceControl")}
      {renderButton("extensions")}
      {MENU_CONFIG[activeMenu].comp}
    </aside>
  );
}

;;
