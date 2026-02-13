import styles from "./Main.module.css";
import Coding from "@/components/svgs/Coding";
import GithubUser from "@/components/GithubUser";
import { FaChevronDown } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

export default function Main() {
  const name = process.env.NEXT_PUBLIC_NAME;
  const email = process.env.NEXT_PUBLIC_EMAIL;

  return (
    <section data-id="" className={styles.section}>
      <Coding size="min(250px, 100%)" />
      <div className={styles.text}><FaUserCircle /><span>{name}</span></div>
      <div className={styles.text}><MdAlternateEmail /><span>{email}</span></div>
      <GithubUser />
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