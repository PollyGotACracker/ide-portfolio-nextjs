"use client";

import styles from "./PageTabs.module.css";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useActiveId } from "@/providers/ActiveIdProvider";
import {
  DOWNLOAD_FILES,
  HeadingItem,
  PAGE_HEADINGS,
  PAGES,
  Separator,
} from "@/constants/label";
import { IoBrowsersOutline } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";

export default function PageTabs() {
  const { activeId, parentPath } = useActiveId();
  const pageLabel = pageMap.get(parentPath);
  const headings = pageLabel && PAGE_HEADINGS.get(parentPath);

  const containerRef = useRef<HTMLUListElement>(null);
  const activeTabRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const activeTab = activeTabRef.current;
    if (!container || !activeTab) return;

    const containerRect = container.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();

    // container 중앙 및 활성탭 중앙으로 이동
    const offset =
      activeTab.offsetLeft -
      container.offsetLeft -
      containerRect.width / 2 +
      tabRect.width / 2;

    container.scrollTo({ left: offset, behavior: "smooth" });
  }, [activeId]);

  return (
    <div className={styles.pageTabs}>
      <ul className={`${styles.tabList} scrollbarHidden`} ref={containerRef}>
        {headings &&
          headings.map((i) => (
            <Tab
              key={i.id}
              isMatched={activeId === i.id}
              ref={activeId === i.id ? activeTabRef : null}
              params={parentPath}
              {...i}
            />
          ))}
        {!pageLabel && <LostTab path={parentPath} />}
      </ul>
      <div className={styles.rightWrapper}>
        <DownloadLink />
      </div>
    </div>
  );
}

type TabProps = {
  params: string;
  isMatched: boolean;
  ref?: React.Ref<HTMLLIElement>;
} & HeadingItem;

function Tab({ params, isMatched, id, label, separator, ref }: TabProps) {
  const activeStyle = isMatched ? ` ${styles.active}` : ``;
  return (
    <li ref={ref}>
      <Link
        href={`${params}${separator}${id}`}
        className={`${styles.tab}${activeStyle}`}
      >
        {IconMap[separator]}
        <span className={styles.tabLabel}>{label}</span>
      </Link>
    </li>
  );
}

function LostTab({ path }: { path: string }) {
  return (
    <li className={`${styles.tab} ${styles.lost}`}>
      <IoBrowsersOutline />
      <span className={styles.tabLabel}>
        {decodeURIComponent(path).replace("/", "")}
      </span>
    </li>
  );
}

function DownloadLink() {
  return (
    <a
      className={styles.download}
      href={`${PAGES.DOWNLOAD.param}${portfolio.separator}${portfolio.id}`}
      title="Download Portfolio"
      download
    >
      <i className="codicon codicon-download" />
    </a>
  );
}

const pageMap = new Map(Object.values(PAGES).map((i) => [i.param, i.label]));
const portfolio = DOWNLOAD_FILES.PORTFOLIO;
const IconMap: Record<Separator, React.ReactNode> = {
  "#": <FaHashtag />,
  "/": <FaLink />,
};
