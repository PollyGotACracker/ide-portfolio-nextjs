import styles from "./ProjectTypeTag.module.css";
import { ProjectTypeValue } from "@/types/Data";
import { cn } from "@/utils/cn";

const TYPE_LABELS: Record<ProjectTypeValue, string> = {
  team: "팀",
  personal: "개인",
  side: "사이드",
  service: "서비스",
  other: "기타",
};

export default function ProjectTypeTag({ type }: { type: ProjectTypeValue }) {
  return (
    <span className={cn(styles.typeTag, styles[type])}>
      {TYPE_LABELS[type]}
    </span>
  );
}
