'use client';

import styles from "./Explorer.module.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { usePanel } from "@/contexts/PanelProvider";
import { PAGES, HOME_HEADINGS, LOG_HEADINGS } from "@/constants/label";
import Details from "./Details";

export default function Explorer() {
  const pathname = usePathname();
  const { closeMobileAside } = usePanel();
  const [activeMenu, setActiveMenu] = useState<string>(pathname);

  useEffect(() => { setActiveMenu(pathname); }, [pathname]);

  function renderItem(page: Page, menu: Heading[]) {
    const isActive = activeMenu === page.param;
    const folderClass = isActive ? "folder-opened" : "folder";

    function handleOptionalClose(e: React.MouseEvent) {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        closeMobileAside();
      };
    }

    return (
      <Details
        className={styles.menuName}
        title={<Link className={`codicon codicon-${folderClass} ${styles.menuLink} parent`} href={page.param}>{page.label}</Link>}
        initialOpen={isActive}
        onClick={handleOptionalClose}
      >
        <ul>
          {menu.map(({ id, label }) =>
            <li className={styles.submenuName} key={id}>
              <Link className={`codicon codicon-file ${styles.submenuLink} child`} href={`${page.param}#${id}`}>{label}</Link>
            </li>
          )}
        </ul>
      </Details>
    );
  }

  return (
    <Details title="pages">
      <nav className={styles.linkList}>
        {renderItem(PAGES.HOME, HOME_HEADINGS_DATA)}
        {renderItem(PAGES.LOG, LOG_HEADINGS_DATA)}
      </nav>
    </Details>
  );
}

interface Page {
  param: string;
  label: string;
}
interface Heading {
  id: string;
  label: string;
};

const HOME_HEADINGS_DATA: Heading[] = Object.values(HOME_HEADINGS);
const LOG_HEADINGS_DATA: Heading[] = Object.values(LOG_HEADINGS);
