"use client";

import styles from "./Header.module.css";
import { useSyncExternalStore } from "react";
import { usePanel } from "@/providers/PanelProvider";
import CONFIG from "@/constants/config";
import { checkWindows } from "@/utils/checker";
import ButtonChip from "@/components/ButtonChip";
import Codicon from "@/components/Codicon";
import { cn } from "@/utils/cn";

const subscribe = () => () => {};
const getSnapshot = () => checkWindows();
const getServerSnapshot = () => undefined;

export default function Header() {
  const { toggleBottom, toggleSide, goHome, goBack, goForward } = usePanel();
  const isWindows = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const TITLE_GO_BACK = isWindows ? "Alt+LeftArrow" : "Ctrl+-";
  const TITLE_GO_FOR = isWindows ? "Alt+RightArrow" : "Ctrl+Shift+-";
  const TITLE_BOTTOM = isWindows ? "Ctrl+J" : "Cmd+J";
  const TITLE_SIDE = isWindows ? "Ctrl+B" : "Cmd+B";

  return (
    <header className={styles.header}>
      <div className={styles.buttonList}>
        <ButtonChip
          className={styles.historyButton}
          onClick={goBack}
          title={`Go Back (${TITLE_GO_BACK})`}
        >
          <Codicon name="arrow-left" className={styles.icon} />
        </ButtonChip>
        <ButtonChip
          className={styles.historyButton}
          onClick={goForward}
          title={`Go Forward (${TITLE_GO_FOR})`}
        >
          <Codicon name="arrow-right" className={styles.icon} />
        </ButtonChip>
      </div>
      <ButtonChip className={styles.title} onClick={goHome}>
        {CONFIG.NICKNAME}
      </ButtonChip>
      <div className={styles.buttonList}>
        <ButtonChip
          className={cn(styles.toggleButton, styles.bottom)}
          onClick={toggleBottom}
          title={`Toggle Panel (${TITLE_BOTTOM})`}
        >
          <Codicon name="layout-panel" className={styles.icon} />
        </ButtonChip>
        <ButtonChip
          className={cn(styles.toggleButton, styles.right)}
          onClick={toggleSide}
          title={`Toggle Side Bar (${TITLE_SIDE})`}
        >
          <Codicon name="layout-sidebar-right" className={styles.icon} />
        </ButtonChip>
      </div>
    </header>
  );
}
