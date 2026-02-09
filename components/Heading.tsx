import styles from "./Heading.module.css";

interface Props {
  id: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

function H2({ id, icon, children }: Props) {
  return (
    <h2 className={styles.heading} id={id}>
      {icon}
      {children}
    </h2>
  );
}

function H3({ icon, children }: Pick<Props, "icon" | "children">) {
  return (
    <h3 className={styles.heading}>
      {icon}
      {children}
    </h3>
  );
}

const Heading = {
  H2, H3
};

export default Heading;
