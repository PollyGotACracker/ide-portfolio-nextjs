'use client';

import styles from "./Header.module.css";
import { useRouter } from "next/navigation";
import { PAGES } from "@/constants/label";
import { usePanel } from "@/contexts/PanelProvider";

export default function Header() {
  const { setShowAside, setShowFooter } = usePanel();
  const router = useRouter();

  function callback(prev: boolean | "") {
    if (prev === "") {
      // 데스크톱: false(닫기), 모바일: true(열기)
      return !(window.innerWidth > 768);
    }
    return !prev;
  }

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
      <div className={styles.title} onClick={handleGoHome}>{process.env.NEXT_PUBLIC_NAME}</div>
      <div className={styles.buttonList}>
        <button
          className={`codicon codicon-layout-panel ${styles.toggleButton} ${styles.footer}`}
          onClick={() => setShowFooter(callback)}
        />
        <button
          className={`codicon codicon-layout-sidebar-right ${styles.toggleButton} ${styles.aside}`}
          onClick={() => setShowAside(callback)}
        />
      </div>
    </header>);
}