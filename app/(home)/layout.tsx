'use client';

import '@vscode/codicons/dist/codicon.css';
import styles from "./layout.module.css";
import { useState } from 'react';
import Sidebar from "@/components/Sidebar";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomeLayout({ children }: { children: React.ReactNode; }) {
  const [showAside, setShowAside] = useState<boolean | "">("");
  const [showFooter, setShowFooter] = useState<boolean | "">("");

  return (
    <div
      className={styles.container}
      data-aside={showAside}
      data-footer={showFooter}>
      <Header setShowAside={setShowAside} setShowFooter={setShowFooter} />
      <main className={styles.main}>{children}</main>
      <Sidebar />
      <Footer />
    </div>
  );
}