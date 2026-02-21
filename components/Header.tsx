"use client";

import styles from "./Header.module.css";
import { usePanel } from "@/providers/PanelProvider";
import CONFIG from "@/constants/config";
import { checkWindows } from "@/libs/checker";
import { useSyncExternalStore } from "react";

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
        <button
          className={`codicon codicon-arrow-left ${styles.historyButton}`}
          onClick={goBack}
          title={`Go Back (${TITLE_GO_BACK})`}
        />
        <button
          className={`codicon codicon-arrow-right ${styles.historyButton}`}
          onClick={goForward}
          title={`Go Forward (${TITLE_GO_FOR})`}
        />
      </div>
      <div className={styles.title} onClick={goHome}>
        {CONFIG.NICKNAME}
      </div>
      <div className={styles.buttonList}>
        <button
          className={`codicon codicon-layout-panel ${styles.toggleButton} ${styles.bottom}`}
          onClick={toggleBottom}
          title={`Toggle Panel (${TITLE_BOTTOM})`}
        />
        <button
          className={`codicon codicon-layout-sidebar-right ${styles.toggleButton} ${styles.right}`}
          onClick={toggleSide}
          title={`Toggle Side Bar (${TITLE_SIDE})`}
        />
      </div>
    </header>
  );
}
