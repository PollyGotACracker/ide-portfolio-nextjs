import styles from "./Main.module.css";
import Link from "next/link";
import type { ProfileType } from "@/types/Data";
import type { User } from "@/types/Github";
import CONFIG from "@/constants/config";
import { cn } from "@/utils/cn";
import { MdMailOutline } from "react-icons/md";
import { GoLinkExternal } from "react-icons/go";

const email = CONFIG.NEXT_PUBLIC_EMAIL;

export default function MainAside({ data }: { data: User & ProfileType }) {
  return (
    <aside className={styles.heroSide}>
      <MetaList
        items={[
          {
            label: "Email",
            value: (
              <div className={styles.linkWrapper}>
                <MdMailOutline size={16} />
                <Link
                  className={styles.link}
                  href={`mailto:${email}`}
                  prefetch={false}
                >
                  {email}
                </Link>
              </div>
            ),
          },
          {
            label: "GitHub",
            value: (
              <div className={styles.linkWrapper}>
                <img
                  src={data.avatar_url}
                  alt={data.login}
                  width={16}
                  height={16}
                />
                <Link
                  className={styles.link}
                  href={data.html_url}
                  target="_blank"
                  prefetch={false}
                >
                  {data.login}
                </Link>
                <GoLinkExternal />
              </div>
            ),
          },
        ]}
      />
      <StrengthList items={data.strengths} />
    </aside>
  );
}

type MetaItem = {
  label: string;
  value: React.ReactNode;
};

function MetaList({ items }: { items: MetaItem[] }) {
  return (
    <dl className={styles.metaList}>
      {items.map((item, i) => (
        <div
          key={item.label}
          className={cn(
            styles.metaListRow,
            i === items.length - 1 && styles.metaListRowLast,
          )}
        >
          <dt className={styles.metaListLabel}>{item.label}</dt>
          <dd className={styles.metaListValue}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function StrengthList({ items }: { items: string[] }) {
  return (
    <section>
      <h3 className={styles.strengthsTitle}>Strengths</h3>
      <ul className={styles.strengthsList}>
        {items.map((text) => (
          <li key={text} className={styles.strengthsItem}>
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
