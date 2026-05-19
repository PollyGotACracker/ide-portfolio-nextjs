"use client";

import styles from "./Footer.module.css";
import Link from "next/link";
import TimeAgo from "@/components/TimeAgo";
import { LuGitBranch } from "react-icons/lu";
import { FaCodeCommit } from "react-icons/fa6";
import Codicon from "@/components/Codicon";
import { cn } from "@/utils/cn";
import { RepoInfo, Commit } from "@/types/Github";

interface FooterProps {
  data: RepoInfo | null;
  commit: Commit | null;
}

export default function Footer({ data, commit }: FooterProps) {
  if (!data) return <footer className={styles.footer} />;
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <Link
          href={data.html_url}
          target="_blank"
          className={styles.repoLink}
          title="Open a Repository"
        >
          <Codicon name="repo" className={styles.icon} />
        </Link>
        <div
          className={cn(styles.branch, styles.item, styles.highlight)}
          title={`${data.name} (Git) - ${data.default_branch}`}
        >
          <LuGitBranch />
          <span>{data.default_branch}</span>
        </div>
        <div
          className={cn(styles.name, styles.item)}
          title={`Current workspace: ${data.name}`}
        >
          {data.name}
        </div>
      </div>
      <div className={styles.wrapper}>
        {commit && (
          <CommitTime
            name={commit.commit.author.name}
            message={commit.commit.message}
            date={commit.commit.author.date}
          />
        )}
        <div
          className={cn(styles.lang, styles.item, styles.highlight)}
          title="Language"
        >
          <Codicon name="json" className={styles.icon} />
          <span>{data.language}</span>
        </div>
        <Codicon
          name="bell"
          className={cn(styles.bell, styles.highlight, styles.icon)}
          title="Notifications (Not Supported)"
        />
      </div>
    </footer>
  );
}

function CommitTime({
  name,
  message,
  date,
}: {
  name: string;
  message: string;
  date: string;
}) {
  return (
    <div
      className={cn(styles.commit, styles.item)}
      title={`${name}, ${message}`}
    >
      <FaCodeCommit className={styles.icon} />
      <TimeAgo date={date} locale="en" />
    </div>
  );
}
