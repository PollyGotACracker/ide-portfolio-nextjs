"use client";

import styles from "./PageTabs.module.css";
import buttonChipStyles from "@/components/ButtonChip.module.css";
import { Download } from "pixelarticons/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useActiveId } from "@/providers/ActiveIdProvider";
import {
  FILES,
  HeadingItem,
  PAGE_HEADINGS,
  PAGES,
  Separator,
} from "@/constants/label";
import { Hash as IconHash } from "pixelarticons/react";
import { Link as IconLink } from "pixelarticons/react";
import { FileText as IconFileText } from "pixelarticons/react";
import { CircleQuestion as IconCircleQuestion } from "pixelarticons/react";
import { cn } from "@/utils/cn";

const IconStyles = { width: 16 };
export default function PageTabs() {
  const { activeId, parentPath, pathname } = useActiveId();
  const pageLabel = PAGE_MAP.get(parentPath);
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
      <ul className={cn(styles.tabList, "scrollbarHidden")} ref={containerRef}>
        {headings &&
          headings.map((e) => {
            const href = !!e.separator
              ? `${parentPath}${e.separator}${e.id}`
              : `/${e.id}`;
            const isMatched = !!e.separator
              ? activeId === e.id
              : pathname === href;

            return (
              <Tab
                key={e.id}
                href={href}
                ref={isMatched ? activeTabRef : null}
                isMatched={isMatched}
                {...e}
              />
            );
          })}
        {!pageLabel && <LostTab />}
      </ul>
      <div className={styles.rightWrapper}>
        <DownloadLink />
      </div>
    </div>
  );
}

type TabProps = {
  href: string;
  isMatched: boolean;
  ref?: React.Ref<HTMLLIElement>;
} & HeadingItem;

function Tab({ href, isMatched, label, separator, ref }: TabProps) {
  return (
    <li ref={ref}>
      <Link href={href} className={cn(styles.tab, isMatched && styles.active)}>
        {IconMap[separator]}
        <span className={styles.tabLabel}>{label}</span>
      </Link>
    </li>
  );
}

function LostTab() {
  return (
    <li className={cn(styles.tab, styles.lost)}>
      <IconCircleQuestion />
      <span className={styles.tabLabel}>
        {/* {decodeURIComponent(path).replace("/", "")} */}
        404
      </span>
    </li>
  );
}

function DownloadLink() {
  return (
    <a
      className={cn(buttonChipStyles.button, styles.download)}
      href={`${PAGES.FILES.param}${portfolio.separator}${portfolio.id}`}
      title="Download Portfolio"
      download
    >
      <Download width={20} />
    </a>
  );
}

const PAGE_MAP = new Map(Object.values(PAGES).map((i) => [i.param, i.label]));
const portfolio = FILES.PORTFOLIO;
const IconMap: Record<Separator, React.ReactNode> = {
  "#": <IconHash {...IconStyles} />,
  "/": <IconLink {...IconStyles} />,
  "": <IconFileText {...IconStyles} />,
};
