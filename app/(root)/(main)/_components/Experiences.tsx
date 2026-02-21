import styles from "./Experiences.module.css";
import Heading from "@/components/Heading";
import List from "@/components/List";
import Markdown from "@/components/Markdown";
import { FILES } from "@/constants/dir";
import { HOME_HEADINGS } from "@/constants/label";
import { readJson } from "@/libs/readFile";
import { ExperienceType, } from "@/types/Data";
import { FaBriefcase } from "react-icons/fa";

const { id, label } = HOME_HEADINGS.EXPERIENCE;

export default async function Experiences() {
  const data: ExperienceType[] = await readJson(FILES.EXPERIENCES);
  return <ExperiencesUI data={data} />;
}

export function ExperiencesUI({ data }: { data: ExperienceType[]; }) {
  return (
    <section data-id={id}>
      <Heading.H2 id={id} icon={<FaBriefcase />}>{label}</Heading.H2>
      <ul className={styles.list}>
        {data.map((i) =>
          <li className={styles.item} key={i.start_at}>
            <span className={styles.range}>{`${i.start_at} ~ ${i?.end_at ?? ``}`}</span>
            <div className={styles.content}>
              <div className={styles.roleWrapper}>
                <span className={styles.role}>{`${i.job_title} | ${i.position}`}</span>
                <span className={styles.company}>{i.company}</span>
              </div>
              <List className={styles.descList}>
                {i.responsibilities?.map((j) => <li key={j}><Markdown>{j}</Markdown></li>)}
              </List>
            </div>
          </li>
        )}
      </ul>
    </section>
  );
}