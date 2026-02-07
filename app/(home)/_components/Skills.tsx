import styles from "./Skills.module.css";
import Heading from "@/components/Heading";
import { SkillsType } from "@/types/Data";
import { HOME_HEADINGS } from "@/constants/label";
import { getJson } from "@/libs/getter";
import { FaTools } from "react-icons/fa";

const { id, label } = HOME_HEADINGS.SKILLS;

export default async function Skills() {
  const data: SkillsType = await getJson("skills.json");

  return (
    <section>
      <Heading.H2 id={id} icon={<FaTools />}>{label}</Heading.H2>
      <ul className={styles.skillList}>
        {data.frontend.map((i) =>
          <li key={i.name}>
            <span className={styles.skillName}>
              {iconMap[i.name]}
              <span>{i.name}</span>
            </span>
            {i.capabilities.map((c) => <p className={styles.capability} key={c}>{c}</p>)}
          </li>
        )}
      </ul>
    </section>);
}

import { SiHtml5 } from "react-icons/si";
import { SiCss3 } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { SiReactquery } from "react-icons/si";
import { SiMockserviceworker } from "react-icons/si";

const iconMap: Record<string, React.ReactNode> = {
  "HTML": <SiHtml5 />,
  "CSS": <SiCss3 />,
  "JavaScript": <SiJavascript />,
  "TypeScript": <SiTypescript />,
  "React": <SiReact />,
  "Next.js": <RiNextjsFill size={20} />,
  "React-Query": <SiReactquery />,
  "MSW": <SiMockserviceworker />,
};