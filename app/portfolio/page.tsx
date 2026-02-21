import { notFound } from "next/navigation";
import { headers } from "next/headers";
import styles from "./page.module.css";
import Info from "@/components/Info";
import Profile from "@/app/(root)/(main)/_components/Profile";
import Skills from "@/app/(root)/(main)/_components/Skills";
import Projects from "@/app/(root)/(main)/_components/Projects";
import Experiences from "@/app/(root)/(main)/_components/Experiences";
import Trainings from "@/app/(root)/(main)/_components/Trainings";
import Courses from "@/app/(root)/(main)/_components/Courses";

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
      <Info />
      <Profile />
      <Skills />
      <Projects />
      <Experiences />
      <Trainings />
      <Courses />
    </main>
  );
}
