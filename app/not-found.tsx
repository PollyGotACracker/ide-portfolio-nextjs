import styles from "@/styles/status.module.css";
import Status from "@/components/svgs/Status";
import GoHomeButton from "@/components/GoHomeButton";
import MainImporter from "@/components/layouts/MainImporter";

export default function NotFoundPage() {
  return (
    <MainImporter>
      <section className={styles.section}>
        <Status status={404} size="min(400px, 100%)" />
        <p className={styles.desc}>페이지를 찾을 수 없습니다.</p>
        <div className={styles.buttonBox}>
          <GoHomeButton />
        </div>
      </section>
    </MainImporter>
  );
}
