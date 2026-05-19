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
  INDEPENDENT_HEADINGS,
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
      <ul className={styles.submenuList}>
        {menu.map(({ id, label, separator }) => {
          const isActive = activeId === id;
          const href = `${param}${separator}${id}`;

          return (
            <li
              className={cn(
                styles.submenu,
                styles.border,
                isActive && styles.active,
              )}
              key={id}
            >
              <MenuLink href={href} download={download}>
                {label}
              </MenuLink>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <>
      <Details title="pages" onClick={handleOptionalClose}>
        <nav>
          {renderPage(PAGES.HOME, HomeHeadings)}
          {renderPage(PAGES.PRACTICE, PracticeHeadings)}
          {IndependentHeadings.map((e) => {
            const href = `/${e.id}`;
            const isActive = parentPath === href;
            return (
              <li
                className={cn(styles.submenu, isActive && styles.active)}
                key={e.id}
              >
                <MenuLink href={href} download={false}>
                  {e.label}
                </MenuLink>
              </li>
            );
          })}
        </nav>
      </Details>
      <Details title="download">
        {renderSubpages(PAGES.DOWNLOAD.param, DownloadFiles, true)}
      </Details>
    </>
  );
}

interface MenuLinkProps {
  href: string;
  download: boolean;
  children: React.ReactNode;
}
function MenuLink({ href, download, children }: MenuLinkProps) {
  return !download ? (
    <Link className={styles.submenuLink} href={href}>
      <Codicon name="file" />
      {children}
    </Link>
  ) : (
    <a className={styles.submenuLink} href={href} download>
      <Codicon name="file" />
      {children}
    </a>
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
const IndependentHeadings: SubPage[] = Object.values(INDEPENDENT_HEADINGS);
const DownloadFiles: SubPage[] = Object.values(DOWNLOAD_FILES);
