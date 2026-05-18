import { cn } from "@/utils/cn";
import styles from "./Heading.module.css";

interface Props {
  className?: string;
  id: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

function H2({ className, id, icon, children }: Props) {
  return (
    <h2 className={cn(styles.heading, className)} id={id}>
      {icon}
      {children}
    </h2>
  );
}

function H3({ className, icon, children }: Omit<Props, "id">) {
  return (
    <h3 className={cn(styles.heading, className)}>
      {icon}
      {children}
    </h3>
  );
}

const Heading = {
  H2,
  H3,
};

export default Heading;
