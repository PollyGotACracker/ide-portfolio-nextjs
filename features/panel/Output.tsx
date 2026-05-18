import styles from "./Output.module.css";
import { getJsonFile } from "@/utils/getFile";
import { OutputType } from "@/types/Data";
import { FILES_EXTRA } from "@/constants/dir";
import { cn } from "@/utils/cn";

export default async function Output() {
  const data = await getJsonFile<OutputType[]>(...FILES_EXTRA.OUTPUT);
  return (
    <ul className={cn(styles.output, "scrollbar")}>
      {data.map((i) => (
        <li key={i.version}>
          <span>{i.version}</span>
          <ul>
            {i.features.map((j) => (
              <li key={j}>{j}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
