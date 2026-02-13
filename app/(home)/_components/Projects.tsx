import styles from "./Projects.module.css";
import Link from "next/link";
import Markdown from "@/components/Markdown";
import Heading from "@/components/Heading";
import ImageBox from "@/components/ImageBox";
import List from "@/components/List";
import { HOME_HEADINGS } from "@/constants/label";
import { getJson } from "@/libs/getter";
import { ProjectType } from "@/types/Data";
import { MdMonitor } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { PiLinkSimpleBold } from "react-icons/pi";
import { FaTools } from "react-icons/fa";
import { FILES } from "@/constants/dir";

const { id, label } = HOME_HEADINGS.PROJECTS;

export default async function Projects() {
  const data: ProjectType[] = await getJson(FILES.PROJECTS);
  return <ProjectsUI data={data} />;
}

export function ProjectsUI({ data }: { data: ProjectType[]; }) {
  return (
    <section data-id={id}>
      <Heading.H2 id={id} icon={<MdMonitor />}>{label}</Heading.H2>
      <ul className={styles.projectList}>
        {data.map((i) =>
          <li className={styles.project} key={i.title}>
            <div className={styles.titleWrapper}>
              <Heading.H3>{i.title}</Heading.H3>
              <DateRange startAt={i.start_at} endAt={i?.end_at} />
            </div>
            <ImageGrid images={i?.images} />
            <div className={styles.content}>
              <RepoLink repoUrl={i?.repo_url} />
              <SiteLink siteUrl={i?.site_url} isActive={i?.is_active} />
              <StackList stacks={i.stacks} />
              <FeatureList features={i.features} />
              <ExtraLinks links={i?.links} />
            </div>
          </li>)}
      </ul>
    </section >
  );
}

function DateRange({ startAt, endAt }: { startAt: ProjectType["start_at"], endAt?: ProjectType["end_at"]; }) {
  return (
    <div className={styles.rangeWrapper}>
      <FaCalendarAlt />
      <span className={styles.range}>
        {`${startAt}${endAt ? ` ~ ${endAt}` : ``}`}
      </span>
    </div>
  );
}

function RepoLink({ repoUrl }: { repoUrl?: ProjectType["repo_url"]; }) {
  const repoName = repoUrl?.split("/").at(-1);
  if (repoUrl) return (
    <div className={styles.textWrapper}>
      <FaGithub />
      <Link className={styles.link} href={repoUrl} prefetch={false}>{repoName}</Link>
    </div>
  );
}

function ImageGrid({ images }: Pick<ProjectType, "images">) {
  if (images) return (
    <div className={styles.imageGrid}>
      {images?.map((i) => <ImageBox key={i} src={i} alt={i} />)}
    </div>
  );
}

function SiteLink({ siteUrl, isActive }: { siteUrl?: ProjectType["site_url"], isActive?: ProjectType["is_active"]; }) {
  if (siteUrl) return (
    <div className={styles.textWrapper}>
      <PiLinkSimpleBold />
      <Link href={siteUrl} className={`${styles.link}${isActive ? "" : ` ${styles.inactive}`}`} prefetch={false}>
        {siteUrl}
      </Link>
    </div>
  );
}

function StackList({ stacks }: Pick<ProjectType, "stacks">) {
  return (
    <div className={styles.textWrapper}>
      <FaTools />
      <ul className={styles.stackList}>
        {stacks.map((i) => <li className={styles.stack} key={i}>{i}</li>)}
      </ul>
    </div>);
}

function FeatureList({ features }: Pick<ProjectType, "features">) {
  return (
    <List className={styles.FeatureList}>
      {features.map((i) =>
        <li className={styles.feature} key={i}>
          <Markdown>{i}</Markdown>
        </li>
      )}
    </List>
  );
}

function ExtraLinks({ links }: Pick<ProjectType, "links">) {
  if (links) return (
    <ul className={styles.extraLinkList}>
      {links?.map((i) =>
        <li className={styles.textWrapper} key={i.label}>
          <PiLinkSimpleBold />
          <Link className={styles.link} href={i.url} prefetch={false}>{i.label}</Link>
        </li>)}
    </ul>
  );
}