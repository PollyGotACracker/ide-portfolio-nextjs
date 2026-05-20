import styles from "./Trainings.module.css";
import Link from "next/link";
import Heading from "@/components/Heading";
import List from "@/components/List";
import Markdown from "@/components/Markdown";
import { FILES } from "@/constants/dir";
import { HOME_HEADINGS } from "@/constants/label";
import { readJson } from "@/utils/readFile";
import { TrainingType } from "@/types/Data";
import { MdLink } from "react-icons/md";
import { GoLinkExternal } from "react-icons/go";

const { id, label } = HOME_HEADINGS.TRAINING;

export default async function Trainings() {
  const data: TrainingType[] = await readJson(FILES.TRAININGS);
  return <TrainingsUI data={data} />;
}

function Links({ links }: Pick<TrainingType, "links">) {
  if (!links?.length) return null;
  return (
    <ul className={styles.linkList}>
      {links.map((i) => (
        <li className={styles.textWrapper} key={i.label}>
          <MdLink />
          <div className={styles.linkWrapper}>
            <Link className={styles.link} href={i.url} prefetch={false}>
              {i.label}
            </Link>
            <GoLinkExternal />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function TrainingsUI({ data }: { data: TrainingType[] }) {
  return (
    <section data-id={id}>
      <Heading.H2 id={id}>{label}</Heading.H2>
      <ul className={styles.list}>
        {data.map((i) => (
          <li className={styles.item} key={i.start_at}>
            <span
              className={styles.range}
            >{`${i.start_at} ~ ${i?.end_at ?? ``}`}</span>
            <div className={styles.content}>
              <div className={styles.nameWrapper}>
                <span className={styles.name}>{i.name}</span>
                <span className={styles.institution}>{i.institution}</span>
              </div>
              {i?.description && (
                <List className={styles.descList}>
                  {i?.description?.map((j) => (
                    <li key={j}>
                      <Markdown>{j}</Markdown>
                    </li>
                  ))}
                </List>
              )}
              <Links links={i?.links} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
