import styles from "./Main.module.css";
import { getUser } from "@/apis/github";
import type { ProfileType } from "@/types/Data";
import { FaChevronDown } from "react-icons/fa6";
import MainContent from "./MainContent";
import MainAside from "./MainAside";
import { readJson } from "@/utils/readFile";
import { FILES } from "@/constants/dir";

export default async function Main({ chevron = true }: { chevron?: boolean }) {
  const [user, profile] = await Promise.all([
    getUser(),
    readJson<ProfileType>(FILES.PROFILE),
  ]);

  return (
    <section data-id="main" className={styles.section}>
      <MainContent data={profile} />
      <MainAside data={{ ...user, ...profile }} />
      {chevron && <ScrollChevron />}
    </section>
  );
}

function ScrollChevron() {
  return (
    <div className={styles.chevron}>
      <FaChevronDown />
    </div>
  );
}
