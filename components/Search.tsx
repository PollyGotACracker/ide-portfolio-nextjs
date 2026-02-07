import styles from "./Search.module.css";
import Details from "./Details";

export default function Search() {
  return (
    <Details title="search" disabled={true}>
      <div className={styles.inputWrapper}>
        <input className={styles.keyword} />
      </div>
    </Details>);
}