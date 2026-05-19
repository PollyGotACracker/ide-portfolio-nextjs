import styles from "./Courses.module.css";
import Heading from "@/components/Heading";
import { FILES } from "@/constants/dir";
import { INDEPENDENT_HEADINGS } from "@/constants/label";
import { readJson } from "@/utils/readFile";
import { CourseType } from "@/types/Data";
import { IoMdSquareOutline } from "react-icons/io";
import { IoMdCheckboxOutline } from "react-icons/io";

const { id, label } = INDEPENDENT_HEADINGS.COURSES;

export default async function Courses() {
  const data: CourseType[] = await readJson(FILES.COURSES);
  return <CoursesUI data={data} />;
}

export function CoursesUI({ data }: { data: CourseType[] }) {
  return (
    <section data-id={id}>
      <Heading.H2 id={id}>{label}</Heading.H2>
      <ul className={styles.list}>
        {data.map((i) => (
          <li className={styles.item} key={i.title}>
            {i.is_completed ? <IoMdCheckboxOutline /> : <IoMdSquareOutline />}
            <span className={styles.instructor}>{i.instructor}</span>
            <span className={styles.title}>{i.title}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
