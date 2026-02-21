"use client";

import styles from "./Explorer.module.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { usePanel } from "@/providers/PanelProvider";
import useObserver from "@/hooks/useObserver";
import {
  PAGES,
  HOME_HEADINGS,
  PRACTICE_HEADINGS,
  DOWNLOAD_FILES,
} from "@/constants/label";
import Details from "./Details";

export default function Explorer() {
  const pathname = usePathname();
  const { closeMobileSide } = usePanel();
  const activeId = useObserver("section[data-id]");
  const [activeMenu, setActiveMenu] = useState<string>(pathname);

  useEffect(() => {
    setActiveMenu(pathname);
  }, [pathname]);

  function handleOptionalClose(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    const anchor = target.closest("a");
    if (anchor) {
      closeMobileSide();
    }
  }

  function renderPage(page: Page, menu: SubPage[]) {
    const isActive = activeMenu === page.param;
    const activeStyle = isActive ? ` ${styles.containerActive}` : ``;

    return (
      <Details
        cClassName={`${styles.menuContainer}${activeStyle}`}
        className={styles.menu}
        title={<div className={styles.menuLink}>{page.label}</div>}
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

  function renderSubpages(
    param: Page["param"],
    menu: SubPage[],
    download = false,
  ) {
    const subpageClass = `codicon codicon-file ${styles.submenuLink}`;
    return (
      <ul>
        {menu.map(({ id, label, separator }) => {
          const activeClass = activeId === id ? ` ${styles.active}` : ``;
          const href = `${param}${separator}${id}`;
          const link = !download ? (
            <Link className={subpageClass} href={href} prefetch={false}>
              {label}
            </Link>
          ) : (
            <a className={subpageClass} href={href} download>
              {label}
            </a>
          );

          return (
            <li className={`${styles.submenu}${activeClass}`} key={id}>
              {link}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <>
      <Details title="pages">
        <nav className={styles.linkList}>
          {renderPage(PAGES.HOME, HomeHeadings)}
          {renderPage(PAGES.PRACTICE, PracticeHeadings)}
        </nav>
      </Details>
      <Details title="download">
        {renderSubpages(PAGES.DOWNLOAD.param, DownloadFiles, true)}
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
}

const HomeHeadings: SubPage[] = Object.values(HOME_HEADINGS);
const PracticeHeadings: SubPage[] = Object.values(PRACTICE_HEADINGS);
const DownloadFiles: SubPage[] = Object.values(DOWNLOAD_FILES);
