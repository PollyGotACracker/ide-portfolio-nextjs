"use client";

import { cn } from "@/utils/cn";
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

  function handleToggle() {
    if (disabled) return;
    setIsActive((prev) => {
      if (onToggle) onToggle(!prev);
      return !prev;
    });
  }

  return (
    <div
      className={cn(styles.details, cClassName, isActive && styles.active)}
      onClick={onClick}
    >
      <button
        className={cn(styles.summary, className)}
        onClick={handleToggle}
        disabled={disabled}
      >
        {!disabled && (
          <Codicon name={isActive ? "chevron-down" : "chevron-right"} />
        )}
        {isActive ? openIcon : closeIcon}
        {title}
      </button>
      <div
        className={cn(
          styles.contentWrapper,
          showTransition && styles.transition,
        )}
      >
        <div
          className={cn(
            styles.content,
            showScrollbar ? "scrollbar" : "scrollbarHidden",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
