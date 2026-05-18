import { cn } from "@/utils/cn";
import styles from "./List.module.css";

interface ListProps {
  className?: string;
  children: React.ReactNode;
}
export default function List({ className, children }: ListProps) {
  return <ul className={cn(styles.list, className)}>{children}</ul>;
}
