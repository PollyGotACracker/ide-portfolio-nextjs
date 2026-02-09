'use client';

import styles from "./Extension.module.css";
import { useTheme } from "@/contexts/ThemeProvider";
import { useFontSize } from "@/contexts/FontSizeProvider";
import Details from "./Details";
import { IoInvertMode } from "react-icons/io5";
import { RiFontSize2 } from "react-icons/ri";

interface ExtensionProps {
  name: string;
  onToggle: () => void;
  state: boolean;
  onValue: string;
  offValue: string;
  icon: React.ReactNode;
}
export default function Extensions() {
  const { themeState, toggleTheme } = useTheme();
  const { fontSizeState, toggleFontSize } = useFontSize();

  return (
    <Details title="installed">
      <ul className={styles.extList}>
        <Extension name="UI Theme" onToggle={toggleTheme} state={themeState} onValue="dark" offValue="light" icon={<IoInvertMode />} />
        <Extension name="Font Size" onToggle={toggleFontSize} state={fontSizeState} onValue="large" offValue="medium" icon={<RiFontSize2 />} />
      </ul>
    </Details>
  );
}

function Extension({ name, onToggle, onValue, offValue, state, icon }: ExtensionProps) {
  return (
    <li className={styles.ext}>
      {icon}
      <div className={styles.extName}>{name}</div>
      <p className={styles.extDesc}>{`current: ${state ? onValue : offValue}`}</p>
      <button
        onClick={onToggle}
        className={`${styles.extButton} ${state ? styles.active : styles.inactive}`}
      >
        {state ? "Enabled" : "Disabled"}
      </button>
    </li>
  );
}



