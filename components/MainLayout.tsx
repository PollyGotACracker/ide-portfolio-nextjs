'use client';

import '@vscode/codicons/dist/codicon.css';
import styles from "./MainLayout.module.css";
import Header from '@/components/Header';
import { usePanel } from '@/contexts/PanelProvider';
import PageTabs from './PageTabs';

interface MainLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  footer: React.ReactNode;
}
export default function MainLayout({ children, sidebar, footer }: MainLayoutProps) {
  const { showAside, showFooter } = usePanel();

  return (
    <div
      className={styles.container}
      data-aside={showAside}
      data-footer={showFooter}>
      <Header />
      <PageTabs />
      <main className={`${styles.main} scrollbar`}>{children}</main>
      {sidebar}
      {footer}
    </div>
  );
}