import CONFIG from "@/constants/config";
import styles from "./Info.module.css";
import { FaUserCircle } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

export default function Info() {
  const name = CONFIG.NEXT_PUBLIC_NAME;
  const email = CONFIG.NEXT_PUBLIC_EMAIL;

  return (
    <>
      <div className={styles.text}><FaUserCircle /><span>{name}</span></div>
      <div className={styles.text}><MdAlternateEmail /><span>{email}</span></div>
    </>
  );
}