import styles from "./Main.module.css";
import { FaChevronDown } from "react-icons/fa6";

export default function Main() {
  const name = process.env.NEXT_PUBLIC_NAME;
  const email = process.env.NEXT_PUBLIC_EMAIL;

  return (
    <section className={styles.section}>
      <div></div>
      <div>{name}</div>
      <div>{email}</div>
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