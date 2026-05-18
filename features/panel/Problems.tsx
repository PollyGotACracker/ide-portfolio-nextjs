import styles from "./Problems.module.css";
import { getJsonFile } from "@/utils/getFile";
import { FILES_EXTRA } from "@/constants/dir";
import { ProblemType } from "@/types/Data";
import { cn } from "@/utils/cn";

export default async function Problems() {
  const data = await getJsonFile<ProblemType[]>(...FILES_EXTRA.PROBLEMS);
  return (
    <ul className={cn(styles.problems, "scrollbar")}>
      {data.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}
