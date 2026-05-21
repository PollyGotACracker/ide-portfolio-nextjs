import styles from "./Experiences.module.css";
import Link from "next/link";
import Heading from "@/components/Heading";
import List from "@/components/List";
import Markdown from "@/components/Markdown";
import { FILES } from "@/constants/dir";
import { HOME_HEADINGS } from "@/constants/label";
import { readJson } from "@/utils/readFile";
import { ExperienceType } from "@/types/Data";
import { MdLink } from "react-icons/md";
import { GoLinkExternal } from "react-icons/go";

const { id, label } = HOME_HEADINGS.EXPERIENCE;

export default async function Experiences() {
  const data: ExperienceType[] = await readJson(FILES.EXPERIENCES);
  return <ExperiencesUI data={data} />;
}

function Stacks({ stacks }: Pick<ExperienceType, "stacks">) {
  if (!stacks.length) return null;
  return (
    <div className={styles.stackWrapper}>
      <ul className={styles.stackList}>
        {stacks.map((i) => (
          <li className={styles.stack} key={i}>
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Description({ description }: Pick<ExperienceType, "description">) {
  if (!description?.length) return null;
  return (
    <List className={styles.descriptionList}>
      {description.map((detail) => (
        <li key={detail}>
          <Markdown>{detail}</Markdown>
        </li>
      ))}
    </List>
  );
}

function Links({ links }: Pick<ExperienceType, "links">) {
  if (!links?.length) return null;
  return (
    <ul className={styles.linkList}>
      {links.map((i) => (
        <li className={styles.textWrapper} key={i.label}>
          <MdLink />
          <div className={styles.linkWrapper}>
            {i.url ? (
              <Link className={styles.link} href={i.url} prefetch={false}>
                {i.label}
              </Link>
            ) : (
              <span>{i.label}</span>
            )}
            {i.url && <GoLinkExternal />}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ExperiencesUI({ data }: { data: ExperienceType[] }) {
  return (
    <section data-id={id}>
      <Heading.H2 id={id}>{label}</Heading.H2>
      <ul className={styles.list}>
        {data.map((i) => (
          <li className={styles.item} key={i.start_at}>
            <span
              className={styles.range}
            >{`${i.start_at} ~ ${i?.end_at ?? ``}`}</span>
            <div className={styles.content}>
              <div className={styles.roleWrapper}>
                <span
                  className={styles.role}
                >{`${i.job_title} | ${i.position}`}</span>
                <span className={styles.company}>{i.company}</span>
              </div>
              <List className={styles.responsibilityList}>
                {i.responsibilities?.map((j) => (
                  <li key={j}>
                    <Markdown>{j}</Markdown>
                  </li>
                ))}
              </List>
              <Stacks stacks={i.stacks} />
              <Description description={i.description} />
              <Links links={i.links} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
