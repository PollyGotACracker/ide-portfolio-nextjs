"use client";

import styles from "./Explorer.module.css";
import Link from "next/link";
import { useActiveId } from "@/providers/ActiveIdProvider";
import { usePanel } from "@/providers/PanelProvider";
import {
  PAGES,
  HOME_HEADINGS,
  PRACTICE_HEADINGS,
  DOWNLOAD_FILES,
} from "@/constants/label";
import Details from "@/components/Details";
import Codicon from "@/components/Codicon";
import { cn } from "@/utils/cn";

export default function Explorer() {
  const { closeMobileSide } = usePanel();
  const { activeId, parentPath } = useActiveId();

  function handleOptionalClose(e: React.SyntheticEvent) {
    const target = e.target as HTMLElement;
    const anchor = target.closest("a");
    if (anchor) {
      closeMobileSide();
    }
  }

  function renderPage(page: Page, menu: SubPage[]) {
    const isActive = parentPath === page.param;

    return (
      <Details
        cClassName={cn(
          styles.menuContainer,
          isActive && styles.containerActive,
        )}
        className={styles.menu}
        title={<div className={styles.menuLink}>{page.label}</div>}
        openIcon={<Codicon name="folder-opened" />}
        closeIcon={<Codicon name="folder" />}
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
    return (
      <ul>
        {menu.map(({ id, label, separator }) => {
          const href = `${param}${separator}${id}`;
          const link = !download ? (
            <Link className={styles.submenuLink} href={href}>
              <Codicon name="file" />
              {label}
            </Link>
          ) : (
            <a className={styles.submenuLink} href={href} download>
              <Codicon name="file" />
              {label}
            </a>
          );

          return (
            <li
              className={cn(styles.submenu, activeId === id && styles.active)}
              key={id}
            >
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
