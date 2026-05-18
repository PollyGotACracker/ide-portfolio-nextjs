import styles from "./Projects.module.css";
import { readJson } from "@/utils/readFile";
import type { ProjectType } from "@/types/Data";
import { HOME_HEADINGS } from "@/constants/label";
import { FILES } from "@/constants/dir";
import Heading from "@/components/Heading";
import Project from "./Project";

const { id, label } = HOME_HEADINGS.PROJECTS;

export default async function Projects() {
  const data: ProjectType[] = await readJson(FILES.PROJECTS);
  return <ProjectsUI data={data} />;
}

export function ProjectsUI({ data }: { data: ProjectType[] }) {
  return (
    <section data-id={id}>
      <Heading.H2 id={id}>{label}</Heading.H2>
      <ul className={styles.projectList}>
        {data.map((e) => (
          <li key={e.title}>
            <Project data={e} />
          </li>
        ))}
      </ul>
    </section>
  );
}
