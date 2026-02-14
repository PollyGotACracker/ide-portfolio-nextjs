'use client';

import styles from "./Header.module.css";
import { useRouter } from "next/navigation";
import { PAGES } from "@/constants/label";
import { usePanel } from "@/contexts/PanelProvider";
import CONFIG from "@/constants/config";

export default function Header() {
  const { toggleBottom, toggleSide } = usePanel();
  const router = useRouter();

  function handleGoHome() {
    router.push(PAGES.HOME.param);
  }

  return (
    <header className={styles.header}>
      <div className={styles.buttonList}>
        <button
          className={`codicon codicon-arrow-left ${styles.historyButton}`}
          onClick={() => router.back()}
        />
        <button
          className={`codicon codicon-arrow-right ${styles.historyButton}`}
          onClick={() => router.forward()}
        />
      </div>
      <div className={styles.title} onClick={handleGoHome}>{CONFIG.NICKNAME}</div>
      <div className={styles.buttonList}>
        <button
          className={`codicon codicon-layout-panel ${styles.toggleButton} ${styles.bottom}`}
          onClick={toggleBottom}
        />
        <button
          className={`codicon codicon-layout-sidebar-right ${styles.toggleButton} ${styles.right}`}
          onClick={toggleSide}
        />
      </div>
    </header>);
}