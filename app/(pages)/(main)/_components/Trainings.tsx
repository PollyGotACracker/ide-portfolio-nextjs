import styles from "./Trainings.module.css";
import Heading from "@/components/Heading";
import List from "@/components/List";
import Markdown from "@/components/Markdown";
import { FILES } from "@/constants/dir";
import { HOME_HEADINGS } from "@/constants/label";
import { readJson } from "@/libs/readFile";
import { TrainingType } from "@/types/Data";

const { id, label } = HOME_HEADINGS.TRAINING;

export default async function Trainings() {
  const data: TrainingType[] = await readJson(FILES.TRAININGS);
  return <TrainingsUI data={data} />;
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
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
