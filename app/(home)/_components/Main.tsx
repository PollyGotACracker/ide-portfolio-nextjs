
import styles from "./Main.module.css";
import Coding from "@/components/svgs/Coding";
import Markdown from "@/components/Markdown";
import { FaChevronDown } from "react-icons/fa6";

export default function Main() {
  const code = `
  \`\`\`ts
  const DATA = {
    name: "${process.env.NEXT_PUBLIC_NAME}",
    email: "${process.env.NEXT_PUBLIC_EMAIL}"
  } as const;
  \`\`\`
  `;

  return (
    <section data-id="" className={styles.section}>
      <Coding size="min(400px, 100%)" />
      <div className={styles.wrapper}>
        <Markdown noMargin transparent>{code}</Markdown>
      </div>
      <ScrollChevron />
    </section>
  );
}

function ScrollChevron() {
  return (
    <div className={styles.chevron}>
      <FaChevronDown />
    </div>
  );
}