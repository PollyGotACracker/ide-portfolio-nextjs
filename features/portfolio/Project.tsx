import styles from "./Project.module.css";
import Markdown from "@/components/Markdown";
import Heading from "@/components/Heading";
import ImageBox from "@/components/ImageBox";
import List from "@/components/List";
import type { ProjectType } from "@/types/Data";
import ProjectTypeTag from "@/components/ProjectTypeTag";
import { FaGithub } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { MdMonitor } from "react-icons/md";
import Anchor from "@/components/Anchor";
import { MdLink } from "react-icons/md";
import { cn } from "@/utils/cn";

interface ProjectProps {
  /** 프로젝트 데이터 */
  data: ProjectType;
  /** border-radius, box-shadow, background 유무 */
  hasStyle?: boolean;
  /** 제목 유무 */
  hasTitle?: boolean;
}

export default function Project({
  data,
  hasStyle = true,
  hasTitle = true,
}: ProjectProps) {
  return (
    <div className={cn(styles.project, hasStyle && styles.hasStyle)}>
      <div className={styles.titleWrapper}>
        {hasTitle && (
          <Heading.H3 className={styles.title}>{data.title}</Heading.H3>
        )}
        <div className={styles.metaRow}>
          <ProjectTypeTag type={data.type} />
          <DateRange startAt={data.start_at} endAt={data?.end_at} />
        </div>
      </div>
      <ImageGrid images={data?.images} />
      <div className={styles.content}>
        <RepoLink repoUrl={data?.repo_url} />
        <SiteLink siteUrl={data?.site_url} isActive={data?.is_active} />
        <StackList stacks={data.stacks} />
        <FeatureList features={data.features} />
        <ExtraLinks links={data?.links} />
      </div>
    </div>
  );
}

function DateRange({
  startAt,
  endAt,
}: {
  startAt: ProjectType["start_at"];
  endAt?: ProjectType["end_at"];
}) {
  return (
    <div className={styles.rangeWrapper}>
      <FaCalendarAlt />
      <span className={styles.range}>
        {`${startAt}${endAt ? ` ~ ${endAt}` : ``}`}
      </span>
    </div>
  );
}

function RepoLink({ repoUrl }: { repoUrl?: ProjectType["repo_url"] }) {
  const repoName = repoUrl?.split("/").at(-1);
  if (repoUrl)
    return (
      <div className={styles.textWrapper}>
        <FaGithub />
        <Anchor href={repoUrl} showIcon={false}>{repoName}</Anchor>
      </div>
    );
}

function ImageGrid({ images }: Pick<ProjectType, "images">) {
  if (images)
    return (
      <div className={styles.imageGrid}>
        {images?.map((i) => (
          <ImageBox key={i} src={i} alt={i} />
        ))}
      </div>
    );
}

function SiteLink({
  siteUrl,
  isActive,
}: {
  siteUrl?: ProjectType["site_url"];
  isActive?: ProjectType["is_active"];
}) {
  if (siteUrl)
    return (
      <div className={styles.textWrapper}>
        <MdMonitor />
        <div className={styles.linkWrapper}>
          {isActive && (
            <img
              src={`${siteUrl}/favicon.ico`}
              alt="favicon"
              width={16}
              height={16}
            />
          )}
          <Anchor href={siteUrl} isActive={isActive} showIcon={false}>{siteUrl}</Anchor>
        </div>
      </div>
    );
}

function StackList({ stacks }: Pick<ProjectType, "stacks">) {
  return (
    <div className={styles.textWrapper}>
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

function FeatureList({ features }: Pick<ProjectType, "features">) {
  return (
    <List className={styles.FeatureList}>
      {features.map((i) => (
        <li className={styles.feature} key={i.title}>
          <div>
            <Markdown>{i.title}</Markdown>
            {i.details && (
              <List className={styles.detailList}>
                {i.details.map((d) => (
                  <li key={d}>
                    <Markdown>{d}</Markdown>
                  </li>
                ))}
              </List>
            )}
          </div>
        </li>
      ))}
    </List>
  );
}

function ExtraLinks({ links }: Pick<ProjectType, "links">) {
  if (links)
    return (
      <ul className={styles.extraLinkList}>
        {links?.map((i) => (
          <li className={styles.textWrapper} key={i.label}>
            <MdLink />
            <Anchor href={i.url}>
              {i.label}
            </Anchor>
          </li>
        ))}
      </ul>
    );
}
