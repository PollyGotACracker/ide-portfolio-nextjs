"use client";

import styles from "./Main.module.css";
import CONFIG from "@/constants/config";
import { SiHtml5 } from "react-icons/si";
import { SiCss } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { SiReactquery } from "react-icons/si";
import { SiMockserviceworker } from "react-icons/si";
import { SiJest } from "react-icons/si";
import { ProfileType } from "@/types/Data";

const nameAlt = CONFIG.NEXT_PUBLIC_NAME_ALT;

export default function MainContent({ data }: { data: ProfileType }) {
  function changeCircleToSkillColor(e: React.MouseEvent<HTMLDivElement>) {
    const hero = e.currentTarget.closest(
      `.${styles.heroContent}`,
    ) as HTMLElement;
    const skill = e.currentTarget.getAttribute("data-skill");
    if (skill && hero) {
      hero.style.setProperty("--skill-color-rgb", iconColorMap[skill]);
    }
  }

  return (
    <div className={styles.heroContent}>
      <div className={styles.heroEyebrow}>Frontend Developer</div>
      <h1 className={styles.heroName}>{nameAlt}</h1>
      <p className={styles.heroAbout}>{data.about}</p>
      <div className={styles.skillIcons}>
        {data.skills.map((skill) => (
          <div
            key={skill}
            className={styles.skillIcon}
            data-skill={skill}
            onPointerEnter={changeCircleToSkillColor}
          >
            {iconMap[skill]}
          </div>
        ))}
      </div>
    </div>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  HTML: <SiHtml5 />,
  CSS: <SiCss />,
  JavaScript: <SiJavascript />,
  TypeScript: <SiTypescript />,
  React: <SiReact />,
  "Next.js": (
    <RiNextjsFill size={20} style={{ transform: "translate(-1.8px,-1.8px)" }} />
  ),
  "React-Query": <SiReactquery />,
  MSW: <SiMockserviceworker />,
  Jest: <SiJest />,
};

const iconColorMap: Record<string, string> = {
  HTML: "228, 77, 38",
  CSS: "102, 51, 153",
  JavaScript: "247, 223, 30",
  TypeScript: "49, 120, 198",
  React: "97, 218, 251",
  "Next.js": "0, 0, 0",
  "React-Query": "255, 65, 84",
  MSW: "255, 106, 51",
  Jest: "194, 19, 37",
};
