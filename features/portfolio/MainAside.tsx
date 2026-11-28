import styles from "./Main.module.css";
import Link from "next/link";
import type { ProfileType } from "@/types/Data";
import type { User } from "@/types/Github";
import CONFIG from "@/constants/config";
import { cn } from "@/utils/cn";
import { Mail } from "pixelarticons/react";
import { Github } from "pixelarticons/react";
import { ExternalLink } from "pixelarticons/react";

const email = CONFIG.NEXT_PUBLIC_EMAIL;

const IconsStyles = { width: 20 };
export default function MainAside({ data }: { data: User & ProfileType }) {
  return (
    <aside className={styles.heroSide}>
      <MetaList
        items={[
          {
            icon: <Mail {...IconsStyles} />,
            label: "Email",
            value: (
              <div className={styles.linkWrapper}>
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
            icon: <Github {...IconsStyles} />,
            label: "Github",
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
                <ExternalLink width={16} />
              </div>
            ),
          },
        ]}
      />
    </aside>
  );
}

type MetaItem = {
  icon: React.ReactNode;
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
          {item.icon}
          <dt className={styles.metaListLabel}>{item.label}</dt>
          <dd className={styles.metaListValue}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
