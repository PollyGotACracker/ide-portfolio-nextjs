import styles from "./SourceControl.module.css";
import Link from "next/link";
import { getUserEvents } from "@/apis/github";
import Details from "./Details";
import TimeAgo from "./TimeAgo";

export default async function SourceControl() {
  const res = await getUserEvents();

  return (
    <Details title="graph" showScrollbar={true}>
      <ul className={styles.eventList}>
        {res.map((i) => {
          const repoName = i.repo.name.split("/").at(-1);
          const privateStyle = i.public ? "" : styles.private;
          return (
            <li className={styles.event} key={i.id}>
              <Link
                className={`${styles.eventLink} ${privateStyle}`}
                href={`https://github.com/${i.repo.name}/commit/${i.payload.head}`}
                target="_blank"
              >
                <span className={styles.eventType}>{getEventText(i.type)}:</span>
                <span>{repoName}</span>
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