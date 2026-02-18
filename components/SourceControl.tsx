import styles from "./SourceControl.module.css";
import Link from "next/link";
import { getUserEvents } from "@/apis/github";
import Details from "./Details";
import TimeAgo from "./TimeAgo";
import { EventType } from "@/types/Github";

export default async function SourceControl() {
  const data = await getUserEvents();

  return (
    <Details title="graph" showScrollbar={true}>
      <ul className={styles.eventList}>
        {data.map((i) => {
          if (i.type !== EventType.Push) return null;
          const repoName = i.repo.name.split("/").at(-1);
          const privateStyle = i.public ? "" : ` ${styles.private}`;
          return (
            <li className={styles.event} key={i.id}>
              <Link
                className={`${styles.eventLink}${privateStyle}`}
                href={`https://github.com/${i.repo.name}/commit/${i.payload.head}`}
                target="_blank"
              >
                <div className={styles.eventWrapper}>
                  <span className={styles.eventType}>{getEventText(i.type)}:</span>
                  <span className={styles.repoName}>{repoName}</span>
                </div>
                <div className={styles.desc}>
                  <span>{getRefText(i.payload.ref)}</span>
                  <TimeAgo date={i.created_at} />
                </div>
              </Link>
            </li>);
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