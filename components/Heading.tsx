import styles from "./Heading.module.css";

interface Props {
  className?: string;
  id: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

function H2({ className, id, icon, children }: Props) {
  return (
    <h2 className={`${styles.heading}${className ? ` ${className}` : ""}`} id={id}>
      {icon}
      {children}
    </h2>
  );
}

function H3({ className, icon, children }: Omit<Props, "id">) {
  return (
    <h3 className={`${styles.heading}${className ? ` ${className}` : ""}`}>
      {icon}
      {children}
    </h3>
  );
}

const Heading = {
  H2, H3
};

export default Heading;
