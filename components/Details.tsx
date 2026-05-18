"use client";

import Codicon from "./Codicon";
import styles from "./Details.module.css";
import { useState } from "react";

interface DetailsProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  cClassName?: string;
  className?: string;
  onClick?: (e: React.SyntheticEvent) => unknown;
  onToggle?: (prev: boolean) => void;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  initialOpen?: boolean;
  disabled?: boolean;
  showScrollbar?: boolean;
  showTransition?: boolean;
}
export default function Details({
  title,
  children,
  cClassName,
  className,
  onClick,
  onToggle,
  openIcon,
  closeIcon,
  initialOpen = true,
  disabled = false,
  showScrollbar = false,
  showTransition = true,
}: DetailsProps) {
  const [isActive, setIsActive] = useState<boolean>(initialOpen);
  const activeStyle = isActive ? styles.active : "";
  const chevronClass = isActive ? "chevron-down" : "chevron-right";

  function handleToggle() {
    if (disabled) return;
    setIsActive((prev) => {
      if (onToggle) onToggle(!prev);
      return !prev;
    });
  }

  return (
    <div
      className={`${styles.details} ${activeStyle}${cClassName ? ` ${cClassName}` : ``}`}
      onClick={onClick}
    >
      <button
        className={`${styles.summary}${className ? ` ${className}` : ``}`}
        onClick={handleToggle}
        disabled={disabled}
      >
        {!disabled && <Codicon name={chevronClass} />}
        {isActive ? openIcon : closeIcon}
        {title}
      </button>
      <div
        className={`${styles.contentWrapper}${showTransition ? ` ${styles.transition}` : ""}`}
      >
        <div
          className={`${styles.content} ${showScrollbar ? "scrollbar" : "scrollbarHidden"}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
