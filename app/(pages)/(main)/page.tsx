import styles from "./page.module.css";
import Main from "@/features/portfolio/Main";
import Projects from "@/features/portfolio/Projects";
import ProjectsToy from "@/features/portfolio/ProjectsToy";
import Experiences from "@/features/portfolio/Experiences";
import Trainings from "@/features/portfolio/Trainings";
import PinnedRepos from "@/features/portfolio/PinnedRepos";

export default function Home() {
  return (
    <div className={styles.content}>
      <Main />
      <div className={styles.stopper} />
      <Experiences />
      <Projects />
      <ProjectsToy />
      <Trainings />
      <PinnedRepos />
    </div>
  );
}
