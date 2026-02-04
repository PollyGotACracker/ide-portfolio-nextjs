'use client';

import '@vscode/codicons/dist/codicon.css';
import styles from "./MainLayout.module.css";
import Header from '@/components/Header';
import { usePanel } from '@/contexts/PanelProvider';

interface MainLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  footer: React.ReactNode;
}
export default function MainLayout({ children, sidebar, footer }: MainLayoutProps) {
  const { showAside, showFooter, setShowAside, setShowFooter } = usePanel();

  return (
    <div
      className={styles.container}
      data-aside={showAside}
      data-footer={showFooter}>
      <Header setShowAside={setShowAside} setShowFooter={setShowFooter} />
      <main className={styles.main}>{children}</main>
      {sidebar}
      {footer}
    </div>
  );
}