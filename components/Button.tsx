"use client";

import { cn } from "@/utils/cn";
import styles from "./Button.module.css";

export default function Button({
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
