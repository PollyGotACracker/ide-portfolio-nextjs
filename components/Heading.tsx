import styles from "./Heading.module.css";

interface H2Props {
  id: string;
  label: string;
}

function H2({ id, label }: H2Props) {
  return <h2 className={styles.heading} id={id}>{label}</h2>;
}

const Heading = {
  H2,
};

export default Heading;
