import styles from "./page.module.css";
import Main from "./_components/Main";
import Profile from "./_components/Profile";
import Projects from "./_components/Projects";
import Experiences from "./_components/Experiences";
import Trainings from "./_components/Trainings";
import Courses from "./_components/Courses";

export default function Home() {
  return (
    <div className={styles.content}>
      <Main />
      <div className={styles.stopper} />
      <Profile />
      <Projects />
      <Experiences />
      <Trainings />
      <Courses />
    </div>
  );
}
