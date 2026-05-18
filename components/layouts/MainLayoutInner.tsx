"use client";

import styles from "./MainLayoutInner.module.css";
import { usePanel } from "@/providers/PanelProvider";
import Header from "./Header";
import PageTabs from "./PageTabs";

interface MainLayoutProps {
  children: React.ReactNode;
  aside: React.ReactNode;
  bottom: React.ReactNode;
  footer: React.ReactNode;
}
export default function MainLayoutInner({
  children,
  aside,
  bottom,
  footer,
}: MainLayoutProps) {
  const { showSide, showBottom, setShowSide } = usePanel();

  return (
    <div
      className={styles.container}
      data-right={showSide}
      data-bottom={showBottom}
    >
      <Header />
      <PageTabs />
      <main className={`${styles.main} scrollbar`}>{children}</main>
      {aside}
      {bottom}
      {footer}
      <div className={styles.overlay} onClick={() => setShowSide(false)} />
    </div>
  );
}
