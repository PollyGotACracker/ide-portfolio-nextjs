import { notFound } from "next/navigation";
import { headers } from "next/headers";
import styles from "./page.module.css";
import Main from "@/features/portfolio/Main";
import Profile from "@/features/portfolio/Profile";
import Projects from "@/features/portfolio/Projects";
import Experiences from "@/features/portfolio/Experiences";
import Trainings from "@/features/portfolio/Trainings";

export default async function Portfolio() {
  // pdf 생성용 페이지이므로 직접 접근 차단
  const headersList = await headers();
  const bypassToken = headersList.get("x-build-id");
  const secret = process.env.BUILD_BYPASS_TOKEN;
  if (!bypassToken || bypassToken !== secret) {
    return notFound();
  }

  return (
    <main className={styles.printPage}>
      <Main chevron={false} />
      <Profile />
      <Projects />
      <Experiences />
      <Trainings />
    </main>
  );
}
