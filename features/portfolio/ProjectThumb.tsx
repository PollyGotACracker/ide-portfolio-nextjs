import styles from "./ProjectThumb.module.css";
import Link from "next/link";
import ImageBox from "@/components/ImageBox";
import ProjectTypeTag from "@/components/ProjectTypeTag";
import { PATHS } from "@/constants/path";
import { ProjectTypeValue } from "@/types/Data";

interface ProjectThumbProps {
  title: string;
  id: string | number;
  image?: string;
  type: ProjectTypeValue;
}

export default function ProjectThumb({
  title,
  id,
  image,
  type,
}: ProjectThumbProps) {
  return (
    <Link
      href={`${PATHS.PROJECTS}/${id}?type=toy`}
      prefetch={false}
      scroll={false}
      className={styles.thumb}
    >
      <div className={styles.image}>
        {image && <ImageBox src={image} alt={title} isLink={false} />}
      </div>
      <div className={styles.footer}>
        <span className={styles.title}>{title}</span>
        <ProjectTypeTag type={type} />
      </div>
    </Link>
  );
}
