'use client';

import styles from "./Button.module.css";

export default function Button({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${styles.button}${className ? ` ${className}` : ""}`} {...props}>
      {children}
    </button>
  );
}