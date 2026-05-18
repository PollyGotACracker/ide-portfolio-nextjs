import styles from "./ProjectThumb.module.css";
import Link from "next/link";
import ImageBox from "@/components/ImageBox";
import { PATHS } from "@/constants/path";

interface ProjectThumbProps {
  title: string;
  id: string | number;
  image?: string;
}

export default function ProjectThumb({ title, id, image }: ProjectThumbProps) {
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
      <span className={styles.title}>{title}</span>
    </Link>
  );
}
