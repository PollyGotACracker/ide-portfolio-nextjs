import styles from "./Extension.module.css";
import Details from "./Details";
import { IoInvertMode } from "react-icons/io5";
import { RiFontSize2 } from "react-icons/ri";

interface ExtensionProps {
  name: string;
  description: string;
  icon: React.ReactNode;
}
export default function Extensions() {
  return (
    <Details title="installed">
      <ul className={styles.extList}>
        <Extension name="Dark Mode" description="UI Theme" icon={<IoInvertMode />} />
        <Extension name="Font Size" description="Adjust font size" icon={<RiFontSize2 />} />
      </ul>
    </Details>
  );
}

function Extension({ name, description, icon }: ExtensionProps) {
  return (
    <li className={styles.ext}>
      {icon}
      <div className={styles.extName}>{name}</div>
      <p className={styles.extDesc}>{description}</p>
      <button className={styles.extButton}>enable</button>
    </li>
  );
}