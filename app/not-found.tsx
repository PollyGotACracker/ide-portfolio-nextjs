import styles from "@/styles/status.module.css";
import Status from "@/components/svgs/Status";
import GoHomeButton from "@/components/GoHomeButton";
import MainLayout from "@/components/layouts/MainLayout";
import { MESSAGES } from "@/constants/string";

export default function NotFoundPage() {
  return (
    <MainLayout>
      <section className={styles.section}>
        <Status status={404} size="min(400px, 100%)" />
        <p className={styles.desc}>{MESSAGES.PAGE_NOT_FOUND}</p>
        <div className={styles.buttonBox}>
          <GoHomeButton />
        </div>
      </section>
    </MainLayout>
  );
}
