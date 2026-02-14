'use client';

import styles from "./Footer.module.css";
import { useState } from "react";
import { usePanel } from "@/contexts/PanelProvider";

interface FooterProps {
  problems: React.ReactNode;
  output: React.ReactNode;
  terminal: React.ReactNode;
}

export default function Footer({ problems, output, terminal }: FooterProps) {
  const { setShowFooter } = usePanel();
  const [activeMenu, setActiveMenu] = useState<Menu>("terminal");

  const MENU_CONFIG = {
    problems: { name: "Problems", comp: problems },
    output: { name: "Output", comp: output },
    terminal: { name: "Terminal", comp: terminal },
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
        {MENU_CONFIG[id].name}
      </button>
    );
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.menuList}>
        {renderButton("problems")}
        {renderButton("output")}
        {renderButton("terminal")}
        <button className={`codicon codicon-close ${styles.closeButton}`} onClick={() => setShowFooter(false)} />
      </div>
      <div className={styles.content}>{MENU_CONFIG[activeMenu].comp}</div>
    </footer>
  );
}