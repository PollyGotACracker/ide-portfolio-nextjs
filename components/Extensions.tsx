'use client';

import styles from "./Extension.module.css";
import { useState } from "react";
import Details from "./Details";
import { IoInvertMode } from "react-icons/io5";
import { RiFontSize2 } from "react-icons/ri";


interface ExtensionProps {
  name: string;
  onToggle: (prev: boolean) => boolean;
  onValue: string;
  offValue: string;
  icon: React.ReactNode;
  initialValue: boolean;
}
export default function Extensions() {
  function toggleUITheme(prev: boolean) {

    return !prev;
  }
  function toggleFontSize(prev: boolean) {

    return !prev;
  }

  return (
    <Details title="installed">
      <ul className={styles.extList}>
        <Extension name="UI Theme" onToggle={toggleUITheme} initialValue={true} onValue="dark" offValue="light" icon={<IoInvertMode />} />
        <Extension name="Font Size" onToggle={toggleFontSize} initialValue={false} onValue="large" offValue="medium" icon={<RiFontSize2 />} />
      </ul>
    </Details>
  );
}

function Extension({ name, onToggle, onValue, offValue, initialValue, icon }: ExtensionProps) {
  const [state, setState] = useState(initialValue);

  function handleChangeState() {
    setState(onToggle);
  }

  return (
    <li className={styles.ext}>
      {icon}
      <div className={styles.extName}>{name}</div>
      <p className={styles.extDesc}>{`current: ${state ? onValue : offValue}`}</p>
      <button
        onClick={handleChangeState}
        className={`${styles.extButton} ${state ? styles.active : styles.inactive}`}
      >
        {state ? "Enabled" : "Disabled"}
      </button>
    </li>
  );
}