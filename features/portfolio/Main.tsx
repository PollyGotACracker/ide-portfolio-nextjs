import styles from "./Main.module.css";
import { getUser } from "@/apis/github";
import type { ProfileType } from "@/types/Data";
import MainContent from "./MainContent";
import MainAside from "./MainAside";
import MainScroller from "./MainScroller";
import { readJson } from "@/utils/readFile";
import { FILES } from "@/constants/dir";

export default async function Main({
  scroller = true,
}: {
  scroller?: boolean;
}) {
  const [user, profile] = await Promise.all([
    getUser(),
    readJson<ProfileType>(FILES.PROFILE),
  ]);

  return (
    <section data-id="main" className={styles.section}>
      <MainContent data={profile} />
      <MainAside data={{ ...user, ...profile }} />
      {scroller && <MainScroller />}
    </section>
  );
}
