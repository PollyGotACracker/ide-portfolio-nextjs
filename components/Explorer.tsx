'use client';

import styles from "./Explorer.module.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { usePanel } from "@/contexts/PanelProvider";
import { PAGES, HOME_HEADINGS, LOG_HEADINGS, DOWNLOAD_FILES } from "@/constants/label";
import Details from "./Details";

export default function Explorer() {
  const pathname = usePathname();
  const { closeMobileAside } = usePanel();
  const [activeMenu, setActiveMenu] = useState<string>(pathname);

  useEffect(() => { setActiveMenu(pathname); }, [pathname]);

  function handleOptionalClose(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    if (anchor) {
      closeMobileAside();
    };
  }

  function renderPage(page: Page, menu: SubPage[]) {
    const isActive = activeMenu === page.param;

    return (
      <Details
        className={styles.menu}
        title={<Link className={styles.menuLink} href={page.param}>{page.label}</Link>}
        openIcon={<i className={`codicon codicon-folder-opened`} />}
        closeIcon={<i className={`codicon codicon-folder`} />}
        initialOpen={isActive}
        showTransition={false}
        onClick={handleOptionalClose}
      >
        {renderSubpages(page.param, menu)}
      </Details>
    );
  }

  function renderSubpages(param: Page["param"], menu: SubPage[]) {
    const subpageClass = `codicon codicon-file ${styles.submenuLink} child`;

    return (
      <ul>
        {menu.map(({ id, label, separator }) =>
          <li className={styles.submenu} key={id}>
            <Link className={subpageClass} href={`${param}${separator}${id}`}>
              {label}
            </Link>
          </li>
        )}
      </ul>
    );
  }

  return (
    <>
      <Details title="pages">
        <nav className={styles.linkList}>
          {renderPage(PAGES.HOME, HomeHeadings)}
          {renderPage(PAGES.LOG, LogHeadings)}
        </nav>
      </Details>
      <Details title="download">
        {renderSubpages(PAGES.DOWNLOAD.param, DownloadFiles)}
      </Details>
    </>
  );
}

interface Page {
  param: string;
  label: string;
}
interface SubPage {
  id: string;
  label: string;
  separator: string;
};

const HomeHeadings: SubPage[] = Object.values(HOME_HEADINGS);
const LogHeadings: SubPage[] = Object.values(LOG_HEADINGS);
const DownloadFiles: SubPage[] = Object.values(DOWNLOAD_FILES);
