import styles from "./page.module.css";
import Profile from "@/app/(home)/_components/Profile";
import Skills from "@/app/(home)/_components/Skills";
import Projects from "@/app/(home)/_components/Projects";
import Experiences from "@/app/(home)/_components/Experiences";
import Trainings from "@/app/(home)/_components/Trainings";
import Courses from "@/app/(home)/_components/Courses";

export default function Portfolio() {
  return (
    <main className={styles.printPage}>
      <Profile />
      <Skills />
      <Projects />
      <Experiences />
      <Trainings />
      <Courses />
    </main>
  );
}