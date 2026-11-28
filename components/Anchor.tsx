import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";
import styles from "./Anchor.module.css";

type AnchorProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href?: ComponentProps<typeof Link>["href"];
  isActive?: boolean;
};

export default function Anchor({
  href,
  className,
  children,
  isActive = true,
  ...props
}: AnchorProps) {
  if (!href || !isActive)
    return <span className={styles.inactive}>{children}</span>;

  const isExternal = typeof href === "string" && href.startsWith("http");
  return (
    <Link
      href={href}
      prefetch={false}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(styles.anchor, className)}
      {...props}
    >
      {children}
      {/* {href && isExternal && showIcon && (
        <ExternalLink width={16} />
      )} */}
    </Link>
  );
}
