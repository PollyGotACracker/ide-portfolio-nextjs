"use client";

import styles from "./ButtonChip.module.css";

export default function ButtonChip({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${styles.button}${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
