import styles from "./SourceControl.module.css";
import Link from "next/link";
import { getUserEvents } from "@/apis/github";
import Details from "./Details";

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
              <Link className={`${styles.eventLink} ${privateStyle}`} href={`https://github.com/${i.repo.name}`} target="_blank">
                <EventType type={i.type} />
                <span>{repoName}</span>
                <div className={styles.createdAt}>{i.created_at}</div>
              </Link>
            </li>);
        })}
      </ul>
    </Details>
  );
}

function EventType({ type }: { type: string; }) {
  const text = type.slice(0, -5);
  return <span className={styles.eventType}>{text}:</span>;
}