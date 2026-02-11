import styles from "./page.module.css";
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import Main from "../(home)/_components/Main";
import Profile from "@/app/(home)/_components/Profile";
import Skills from "@/app/(home)/_components/Skills";
import Projects from "@/app/(home)/_components/Projects";
import Experiences from "@/app/(home)/_components/Experiences";
import Trainings from "@/app/(home)/_components/Trainings";
import Courses from "@/app/(home)/_components/Courses";

export default async function Portfolio() {
  // pdf 생성용 페이지이므로 직접 접근 차단
  const headersList = await headers();
  const bypassToken = headersList.get('x-build-id');
  const secret = process.env.BUILD_BYPASS_TOKEN;
  if (!bypassToken || bypassToken !== secret) {
    return notFound();
  }

  return (
    <main className={styles.printPage}>
      <Main />
      <Profile />
      <Skills />
      <Projects />
      <Experiences />
      <Trainings />
      <Courses />
    </main>
  );
}