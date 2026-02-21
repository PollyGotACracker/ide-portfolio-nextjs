"use client";

import styles from "@/styles/status.module.css";
import Status from "@/components/svgs/Status";
import ErrResetButton from "@/components/ErrResetButton";
import GoHomeButton from "@/components/GoHomeButton";
import { MESSAGES } from "@/constants/string";

export default function ErrorPage({
  reset,
}: {
  error?: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className={styles.section}>
      <Status status={500} size="min(400px, 100%)" />
      <p className={styles.desc}>{MESSAGES.PAGE_ERROR}</p>
      <div className={styles.buttonBox}>
        <ErrResetButton onClick={reset} />
        <GoHomeButton />
      </div>
    </section>
  );
}
