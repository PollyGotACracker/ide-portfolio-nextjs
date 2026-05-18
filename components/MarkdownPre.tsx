"use client";

import styles from "./MarkdownPre.module.css";
import btnStyles from "./Button.module.css";
import { useRef, useState } from "react";
import { cn } from "@/utils/cn";

type MarkdownPreProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLPreElement>;
export default function MarkdownPre({ children, ...props }: MarkdownPreProps) {
  const [copied, setCopied] = useState(false);
  const textRef = useRef<HTMLPreElement>(null);

  const onCopy = () => {
    if (textRef.current) {
      navigator.clipboard.writeText(textRef.current.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={onCopy} className={cn(styles.button, btnStyles.button)}>
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre ref={textRef} {...props}>
        {children}
      </pre>
    </div>
  );
}
