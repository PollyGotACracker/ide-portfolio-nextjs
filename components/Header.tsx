'use client';

import styles from "./Header.module.css";

interface HeaderProps {
  setShowAside: React.Dispatch<React.SetStateAction<boolean | "">>;
  setShowFooter: React.Dispatch<React.SetStateAction<boolean | "">>;
}
export default function Header({ setShowAside, setShowFooter }: HeaderProps) {
  function callback(prev: boolean | "") {
    if (prev === "") {
      // 데스크톱: false(닫기), 모바일: true(열기)
      return !(window.innerWidth > 768);
    }
    return !prev;
  }

  function toggleFooter() {
    setShowFooter(callback);
  };

  function toggleAside() {
    setShowAside(callback);
  };

  return (
    <header className={styles.header}>
      {process.env.NEXT_PUBLIC_NAME}
      <div className={styles.buttonList}>
        <button className={`codicon codicon-layout-panel ${styles.toggleButton}`} onClick={toggleFooter} />
        <button className={`codicon codicon-layout-sidebar-right ${styles.toggleButton}`} onClick={toggleAside} />
      </div>
    </header>);
}