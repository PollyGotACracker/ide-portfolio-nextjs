import styles from "./Main.module.css";
import Coding from "@/components/svgs/Coding";
import Info from "@/components/Info";
import GithubCard from "@/components/GithubCard";
import { FaChevronDown } from "react-icons/fa6";

export default function Main() {
  return (
    <section data-id="" className={styles.section}>
      <Coding size="min(300px, 100%)" />
      <div className={styles.wrapper}>
        <div className={styles.textWrapper}>
          <Info />
        </div>
        <GithubCard />
      </div>
      <ScrollChevron />
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