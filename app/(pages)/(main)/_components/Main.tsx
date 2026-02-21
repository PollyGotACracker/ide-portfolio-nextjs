
import styles from "./Main.module.css";
import Coding from "@/components/svgs/Coding";
import { FaChevronDown } from "react-icons/fa6";
import Info from "@/components/Info";

export default function Main() {
  return (
    <section data-id="main" className={styles.section} >
      <Coding size="min(250px, 100%)" />
      <div className={styles.wrapper}>
        <Info />
      </div>
      <ScrollChevron />
    </section >
  );
}

function ScrollChevron() {
  return (
    <div className={styles.chevron}>
      <FaChevronDown />
    </div>
  );
}