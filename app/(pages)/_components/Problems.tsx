import styles from "./Problems.module.css";
import { getJsonFile } from "@/libs/getFile";
import { FILES_EXTRA } from "@/constants/dir";
import { ProblemType } from "@/types/Data";

export default async function Problems() {
  const data = await getJsonFile<ProblemType[]>(...FILES_EXTRA.PROBLEMS);
  return (
    <ul className={`${styles.problems} scrollbar`}>
      {data.map((i) =>
        <li key={i}>{i}</li>)}
    </ul>
  );
}