"use client";

import styles from "./Extension.module.css";
import { useTheme } from "@/providers/ThemeProvider";
import { useFontSize } from "@/providers/FontSizeProvider";
import Details from "@/components/Details";
import { IoInvertMode } from "react-icons/io5";
import { RiFontSize2 } from "react-icons/ri";
import { cn } from "@/utils/cn";

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
    <Details title="installed" showScrollbar={true}>
      <ul className={styles.extList}>
        <Extension
          name="UI Theme"
          onToggle={toggleTheme}
          state={themeState}
          onValue="dark"
          offValue="light"
          icon={<IoInvertMode />}
        />
        <Extension
          name="Font Size"
          onToggle={toggleFontSize}
          state={fontSizeState}
          onValue="large"
          offValue="medium"
          icon={<RiFontSize2 />}
        />
      </ul>
    </Details>
  );
}

function Extension({
  name,
  onToggle,
  onValue,
  offValue,
  state,
  icon,
}: ExtensionProps) {
  return (
    <li className={styles.ext}>
      {icon}
      <div className={styles.extName}>{name}</div>
      <p
        className={styles.extDesc}
      >{`current: ${state ? onValue : offValue}`}</p>
      <button
        onClick={onToggle}
        className={cn(
          styles.extButton,
          state ? styles.active : styles.inactive,
        )}
      >
        {state ? "Enabled" : "Disabled"}
      </button>
    </li>
  );
}
