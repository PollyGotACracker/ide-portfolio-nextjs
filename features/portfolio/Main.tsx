import styles from "./Main.module.css";
import { getUser } from "@/apis/github";
import { FaChevronDown } from "react-icons/fa6";
import MainContent from "./MainContent";
import MainAside from "./MainAside";

export default async function Main({ chevron = true }: { chevron?: boolean }) {
  const res = await getUser();

  return (
    <section data-id="main" className={styles.section}>
      <MainContent />
      <MainAside data={res} />
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
