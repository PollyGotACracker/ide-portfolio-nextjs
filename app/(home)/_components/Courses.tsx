import styles from "./Courses.module.css";
import Heading from "@/components/Heading";
import { FILES } from "@/constants/dir";
import { HOME_HEADINGS } from "@/constants/label";
import getJson from "@/libs/getJson";
import { CourseType, } from "@/types/Data";
import { FaChalkboard } from "react-icons/fa";
import { IoMdSquareOutline } from "react-icons/io";
import { IoMdCheckboxOutline } from "react-icons/io";

const { id, label } = HOME_HEADINGS.COURSES;

export default async function Courses() {
  const data: CourseType[] = await getJson(FILES.COURSES);
  return <CoursesUI data={data} />;
}

export function CoursesUI({ data }: { data: CourseType[]; }) {
  return (
    <section data-id={id}>
      <Heading.H2 id={id} icon={<FaChalkboard />}>{label}</Heading.H2>
      <ul className={styles.list}>
        {data.map((i) =>
          <li className={styles.item} key={i.title}>
            {i.is_completed ? <IoMdCheckboxOutline /> : <IoMdSquareOutline />}
            <span className={styles.instructor}>{i.instructor}</span>
            <span className={styles.title}>{i.title}</span>
          </li>
        )}
      </ul>
    </section>
  );
}