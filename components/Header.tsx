'use client';

import styles from "./Header.module.css";
import { useRouter } from "next/navigation";
import { PAGES } from "@/constants/label";
import { usePanel } from "@/contexts/PanelProvider";

export default function Header() {
  const { toggleFooter, toggleAside } = usePanel();
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
      <div className={styles.title} onClick={handleGoHome}>{process.env.NEXT_PUBLIC_NICKNAME}</div>
      <div className={styles.buttonList}>
        <button
          className={`codicon codicon-layout-panel ${styles.toggleButton} ${styles.footer}`}
          onClick={toggleFooter}
        />
        <button
          className={`codicon codicon-layout-sidebar-right ${styles.toggleButton} ${styles.aside}`}
          onClick={toggleAside}
        />
      </div>
    </header>);
}