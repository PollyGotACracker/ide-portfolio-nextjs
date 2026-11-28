"use client";

import styles from "./MainScroller.module.css";
import { ArrowBigDown } from "pixelarticons/react";

export default function MainScroller() {
  const onClick = () => {
    const element = document.querySelector("[id]");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  return (
    <button onClick={onClick} className={styles.chevron}>
      <ArrowBigDown />
    </button>
  );
}
