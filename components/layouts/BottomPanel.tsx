"use client";

import styles from "./BottomPanel.module.css";
import { useState } from "react";
import { usePanel } from "@/providers/PanelProvider";
import Codicon from "@/components/Codicon";
import { cn } from "@/utils/cn";

interface BottomPanelProps {
  problems: React.ReactNode;
  output: React.ReactNode;
  terminal: React.ReactNode;
}

export default function BottomPanel({
  problems,
  output,
  terminal,
}: BottomPanelProps) {
  const { setShowBottom } = usePanel();
  const [activeMenu, setActiveMenu] = useState<Menu>("terminal");

  const MENU_CONFIG = {
    problems: { name: "Problems", comp: problems },
    output: { name: "Output", comp: output },
    terminal: { name: "Terminal", comp: terminal },
  } as const;
  type Menu = keyof typeof MENU_CONFIG;

  function renderButton(id: Menu) {
    return (
      <button
        className={cn(styles.menuButton, activeMenu === id && styles.active)}
        onClick={() => setActiveMenu(id)}
        name={MENU_CONFIG[id].name}
      >
        {MENU_CONFIG[id].name}
      </button>
    );
  }

  return (
    <div className={styles.bottom}>
      <div className={styles.menuList}>
        {renderButton("problems")}
        {renderButton("output")}
        {renderButton("terminal")}
        <button
          className={styles.closeButton}
          onClick={() => setShowBottom(false)}
        >
          <Codicon name="close" />
        </button>
      </div>
      <div className={styles.content}>{MENU_CONFIG[activeMenu].comp}</div>
    </div>
  );
}
