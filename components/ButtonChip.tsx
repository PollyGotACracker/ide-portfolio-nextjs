"use client";

import { cn } from "@/utils/cn";
import styles from "./ButtonChip.module.css";

export default function ButtonChip({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(styles.button, className)} {...props}>
      {children}
    </button>
  );
}
