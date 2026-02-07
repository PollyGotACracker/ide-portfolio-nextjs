import styles from "./Heading.module.css";

interface H2Props {
  id: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

function H2({ id, icon, children }: H2Props) {
  return (
    <h2 className={styles.heading} id={id}>
      {icon}
      {children}
    </h2>
  );
}

const Heading = {
  H2,
};

export default Heading;
