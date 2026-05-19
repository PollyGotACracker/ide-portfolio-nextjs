"use client";

import styles from "./SourceControl.module.css";
import Link from "next/link";
import Details from "@/components/Details";
import TimeAgo from "@/components/TimeAgo";
import { Event, EventType } from "@/types/Github";
import { cn } from "@/utils/cn";

export default function SourceControl({ data }: { data: Event[] }) {
  return (
    <Details title="graph" showScrollbar={true}>
      <ul className={styles.eventList}>
        {data &&
          data.map((e) => {
            if (e.type !== EventType.Push) return null;
            const repoName = e.repo.name.split("/").at(-1);
            return (
              <li className={styles.event} key={e.id}>
                <Link
                  className={cn(styles.eventLink, !e.public && styles.private)}
                  href={`https://github.com/${e.repo.name}/commit/${e.payload.head}`}
                  target="_blank"
                >
                  <span className={styles.eventWrapper}>
                    <span className={styles.eventType}>
                      {getEventText(e.type)}:
                    </span>
                    <span className={styles.repoName}>{repoName}</span>
                  </span>
                  <span className={styles.desc}>
                    <span className={styles.refText}>
                      {getRefText(e.payload.ref)}
                    </span>
                    <TimeAgo date={e.created_at} />
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

function getEventText(type: string) {
  return type.slice(0, -5);
}
