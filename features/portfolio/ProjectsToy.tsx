import styles from "./ProjectsToy.module.css";
import { HOME_HEADINGS } from "@/constants/label";
import { FILES } from "@/constants/dir";
import { readJson } from "@/utils/readFile";
import type { ProjectType } from "@/types/Data";
import Heading from "@/components/Heading";
import ProjectThumb from "./ProjectThumb";

const { id, label } = HOME_HEADINGS.PROJECTS_TOY;

export default async function ProjectsToy() {
  const data: ProjectType[] = await readJson(FILES.PROJECTS_TOY);
  return <ProjectsToyUI data={data} />;
}

export function ProjectsToyUI({ data }: { data: ProjectType[] }) {
  return (
    <section data-id={id}>
      <Heading.H2 id={id}>{label}</Heading.H2>
      <ul className={styles.projectList}>
        {data.map((e, i) => (
          <li key={e.title}>
            <ProjectThumb title={e.title} id={i} image={e.images?.[0]} />
          </li>
        ))}
      </ul>
    </section>
  );
}
