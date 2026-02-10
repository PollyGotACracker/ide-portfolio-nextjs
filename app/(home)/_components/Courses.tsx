import styles from "./Courses.module.css";
import Heading from "@/components/Heading";
import { HOME_HEADINGS } from "@/constants/label";
import { getJson } from "@/libs/getter";
import { CourseType, } from "@/types/Data";
import { FaChalkboard } from "react-icons/fa";
import { IoMdSquareOutline } from "react-icons/io";
import { IoMdCheckboxOutline } from "react-icons/io";

const file = "courses.json";
const { id, label } = HOME_HEADINGS.COURSES;

export default async function Courses() {
  const data: CourseType[] = await getJson(file);
  return <CoursesUI data={data} />;
}

export function CoursesUI({ data }: { data: CourseType[]; }) {
  return (
    <section>
      <Heading.H2 id={id} icon={<FaChalkboard />}>{label}</Heading.H2>
      <ul>
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