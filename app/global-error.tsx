'use client';

import styles from "./status.module.css";
import Status from "@/components/svgs/Status";
import Button from "@/components/Button";
import GoHomeButton from "@/components/GoHomeButton";

export default function GlobalErrorPage({
  reset,
}: {
  error?: Error & { digest?: string; };
  reset: () => void;
}) {

  return (
    <html>
      <body>
        <section className={styles.section}>
          <Status status={500} size="min(400px, 100%)" />
          <p className={styles.desc}>치명적인 오류가 발생했습니다.</p>
          <div className={styles.buttonBox}>
            <Button onClick={() => reset()}>다시 시도</Button>
            <GoHomeButton />
          </div>
        </section>
      </body>
    </html>
  );
}