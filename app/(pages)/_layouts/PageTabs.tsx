"use client";

import { PAGES } from "@/constants/label";
import styles from "./PageTabs.module.css";
import { usePathname } from "next/navigation";
import { getFirstPath } from "@/libs/getPath";

export default function PageTabs() {
  const pathname = usePathname();
  const parentPath = getFirstPath(pathname);
  return (
    <ul className={styles.tabList}>
      <li className={styles.tab}>
        <i className="codicon codicon-browser" />
        <span>
          {pageMap.get(parentPath) ??
            decodeURIComponent(parentPath).split("/").at(-1)}
        </span>
      </li>
    </ul>
  );
}

const pageMap = new Map(Object.values(PAGES).map((i) => [i.param, i.label]));
