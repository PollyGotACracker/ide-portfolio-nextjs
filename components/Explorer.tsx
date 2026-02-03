'use client';

import styles from "./Explorer.module.css";
import { useState } from "react";
import Link from "next/link";
import { PAGES, HOME_HEADINGS, LOG_HEADINGS } from "@/constants/label";

export default function Explorer() {
  const [activeMenu, setActiveMenu] = useState<string | null>(PAGES.HOME.param);

  function renderItem(page: Page, menu: Heading[]) {
    const isActive = activeMenu === page.param;
    const activeStyle = isActive ? styles.active : "";
    const chevronClass = isActive ? "chevron-down" : "chevron-right";
    const folderClass = isActive ? "folder-opened" : "folder";

    function handleToggle() {
      setActiveMenu((prev) => prev === page.param ? null : page.param);
    }

    return (
      <div className={`${styles.menuItem} ${activeStyle}`}>
        <div className={styles.menuName}>
          <button className={`codicon codicon-${chevronClass} ${styles.toggle}`} onClick={handleToggle} />
          <Link className={`codicon codicon-${folderClass} ${styles.menuLink}`} href={page.param}>{page.title}</Link>
        </div>
        <div className={styles.submenuWrapper}>
          <ul className={styles.submenuContent}>
            {menu.map(({ id, label }) =>
              <li className={styles.submenuName} key={id} >
                <Link className={`codicon codicon-file ${styles.submenuLink}`} href={`${page.param}#${id}`}>{label}</Link>
              </li>
            )}
          </ul>
        </div>
      </div >
    );
  }

  return (
    <nav>
      {renderItem(PAGES.HOME, HOME_HEADINGS_DATA)}
      {renderItem(PAGES.LOG, LOG_HEADINGS_DATA)}
    </nav>
  );
}
interface Page {
  param: string;
  title: string;
}
interface Heading {
  id: string;
  label: string;
};

const HOME_HEADINGS_DATA: Heading[] = Object.values(HOME_HEADINGS);
const LOG_HEADINGS_DATA: Heading[] = Object.values(LOG_HEADINGS);
