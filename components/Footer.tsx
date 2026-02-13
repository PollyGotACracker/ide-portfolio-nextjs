'use client';

import styles from "./Footer.module.css";
import { useState } from "react";
import Terminal from "./Terminal";

const MENU_CONFIG = {
  terminal: { name: "Terminal", comp: <Terminal /> },
} as const;
type Menu = keyof typeof MENU_CONFIG;

export default function Footer() {
  const [activeMenu, setActiveMenu] = useState<Menu>("terminal");


  function renderButton(id: Menu) {
    const activeStyle = activeMenu === id ? ` ${styles.active}` : "";
    return (
      <button
        className={`${styles.menuButton}${activeStyle}`}
        onClick={() => setActiveMenu(id)}
        name={MENU_CONFIG[id].name}
      >
        {MENU_CONFIG[id].name}
      </button>
    );
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.menuList}>
        {renderButton("terminal")}
      </div>
      <div className={styles.content}>{MENU_CONFIG[activeMenu].comp}</div>
    </footer>
  );
}