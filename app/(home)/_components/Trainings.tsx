import styles from "./Trainings.module.css";
import Heading from "@/components/Heading";
import List from '@/components/List';
import { HOME_HEADINGS } from "@/constants/label";
import { getJson } from "@/libs/getter";
import { TrainingType } from "@/types/Data";
import { PiTargetBold } from "react-icons/pi";

const file = "trainings.json";
const { id, label } = HOME_HEADINGS.TRAINING;

export default async function Trainings() {
  const data: TrainingType[] = await getJson(file);
  return <TrainingsUI data={data} />;
}

export function TrainingsUI({ data }: { data: TrainingType[]; }) {
  return (
    <section>
      <Heading.H2 id={id} icon={<PiTargetBold />}>{label}</Heading.H2>
      <ul>
        {data.map((i) =>
          <li className={styles.item} key={i.start_at}>
            <span className={styles.range}>{`${i.start_at} ~ ${i?.end_at ?? ``}`}</span>
            <div className={styles.content}>
              <div className={styles.nameWrapper}>
                <span className={styles.name}>{i.name}</span>
                <span className={styles.institution}>{i.institution}</span>
              </div>
              {i?.description && <List className={styles.descList}>{i?.description?.map((j) => <li key={j}>{j}</li>)}</List>}
            </div>
          </li>
        )}
      </ul>
    </section>
  );
}