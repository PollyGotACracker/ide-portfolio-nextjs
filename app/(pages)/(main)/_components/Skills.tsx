import styles from "./Skills.module.css";
import Heading from "@/components/Heading";
import Markdown from "@/components/Markdown";
import List from "@/components/List";
import { SkillsType } from "@/types/Data";
import { HOME_HEADINGS } from "@/constants/label";
import { FILES } from "@/constants/dir";
import { readJson } from "@/libs/readFile";
import { SiHtml5 } from "react-icons/si";
import { SiCss3 } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { SiReactquery } from "react-icons/si";
import { SiMockserviceworker } from "react-icons/si";

const { id, label } = HOME_HEADINGS.SKILLS;

export default async function Skills() {
  const data: SkillsType = await readJson(FILES.SKILLS);
  return <SkillsUI data={data} />;
}

export function SkillsUI({ data }: { data: SkillsType }) {
  return (
    <section data-id={id}>
      <Heading.H2 id={id}>{label}</Heading.H2>
      <ul className={styles.skillList}>
        {data.frontend.map((i) => (
          <li key={i.name}>
            <Heading.H3 icon={iconMap[i.name]}>{i.name}</Heading.H3>
            <List className={styles.capabilityList}>
              {i.capabilities.map((c) => (
                <li className={styles.capability} key={c}>
                  <Markdown>{c}</Markdown>
                </li>
              ))}
            </List>
          </li>
        ))}
      </ul>
    </section>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  HTML: <SiHtml5 />,
  CSS: <SiCss3 />,
  JavaScript: <SiJavascript />,
  TypeScript: <SiTypescript />,
  React: <SiReact />,
  "Next.js": <RiNextjsFill size={20} />,
  "React-Query": <SiReactquery />,
  MSW: <SiMockserviceworker />,
};
