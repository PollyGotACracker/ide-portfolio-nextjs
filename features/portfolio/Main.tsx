import styles from "./Main.module.css";
import Link from "next/link";
import CONFIG from "@/constants/config";
import { getUser } from "@/apis/github";
import { MdMailOutline } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";
import { SiHtml5 } from "react-icons/si";
import { SiCss } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { SiReactquery } from "react-icons/si";
import { SiMockserviceworker } from "react-icons/si";
import { cn } from "@/utils/cn";

const nameAlt = CONFIG.NEXT_PUBLIC_NAME_ALT;
const email = CONFIG.NEXT_PUBLIC_EMAIL;
const strengths = [
  "관심 분야에 깊이 파고드는 학습 태도",
  "기술 스택별 repository로 체계적인 정리 습관",
  "매일 기술 아티클을 읽는 꾸준함",
];
const intro = `관심 있는 분야에 깊이 파고들기를 좋아합니다.\n어려운 과제의 해결 방법을 고민하며, 배운 것을 꾸준히 정리합니다.`;
const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "React-Query",
  "MSW",
];

export default async function Main({ chevron = true }: { chevron?: boolean }) {
  const res = await getUser();

  return (
    <section data-id="main" className={styles.section}>
      <div>
        <div className={styles.heroEyebrow}>Frontend Developer</div>
        <h1 className={styles.heroName}>{nameAlt}</h1>
        <p className={styles.heroIntro}>{intro}</p>
        <div className={styles.skillIcons}>
          {skills.map((skill) => (
            <div key={skill} className={styles.skillIcon}>
              {iconMap[skill]}
            </div>
          ))}
        </div>
      </div>
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
                    src={res.avatar_url}
                    alt={res.login}
                    width={16}
                    height={16}
                  />
                  <Link
                    className={styles.link}
                    href={res.html_url}
                    target="_blank"
                    prefetch={false}
                  >
                    {res.login}
                  </Link>
                </div>
              ),
            },
          ]}
        />
        <StrengthList items={strengths} />
      </aside>
      {chevron && <ScrollChevron />}
    </section>
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

function ScrollChevron() {
  return (
    <div className={styles.chevron}>
      <FaChevronDown />
    </div>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  HTML: <SiHtml5 />,
  CSS: <SiCss />,
  JavaScript: <SiJavascript />,
  TypeScript: <SiTypescript />,
  React: <SiReact />,
  "Next.js": <RiNextjsFill size={20} />,
  "React-Query": <SiReactquery />,
  MSW: <SiMockserviceworker />,
};
