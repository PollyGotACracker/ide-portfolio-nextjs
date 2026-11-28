"use client";

import styles from "./SourceControl.module.css";
import Link from "next/link";
import Details from "@/components/Details";
import TimeAgo from "@/components/TimeAgo";
import { RepoActivity } from "@/types/Github";

export default function SourceControl({ data }: { data: RepoActivity[] }) {
  return (
    <Details title="graph" showScrollbar={true}>
      <ul className={styles.eventList}>
        {data &&
          data.map((e) => {
            const repoName = e.repo.split("/").at(-1);
            return (
              <li className={styles.event} key={`${e.repo}:${e.id}`}>
                <Link
                  className={styles.eventLink}
                  href={`https://github.com/${e.repo}/commit/${e.after}`}
                  target="_blank"
                >
                  <span className={styles.eventWrapper}>
                    <span className={styles.eventType}>Push:</span>
                    <span className={styles.repoName}>{repoName}</span>
                  </span>
                  <span className={styles.desc}>
                    <span className={styles.refText}>
                      {getRefText(e.ref)}
                    </span>
                    <TimeAgo date={e.timestamp} />
                  </span>
                </Link>
              </li>
            );
          })}
      </ul>
    </Details>
  );
}

function getRefText(ref: string) {
  return ref.split("/").at(-1);
}
