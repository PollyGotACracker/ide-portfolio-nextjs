import { getRepoCommits, getRepoInfo } from "@/apis/github";
import styles from "./Footer.module.css";
import Link from "next/link";
import TimeAgo from "./TimeAgo";
import { LuGitBranch } from "react-icons/lu";
import { FaCodeCommit } from "react-icons/fa6";

export default async function Footer() {
  const data = await getRepoInfo();
  const [commit] = await getRepoCommits({ perPage: 1 });
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <Link
          href={data.html_url}
          target="_blank"
          className={`codicon codicon-repo ${styles.repoLink}`}
          title="Open a Repository"
        />
        <div
          className={`${styles.branch} ${styles.item} ${styles.highlight}`}
          title={`${data.name} (Git) - ${data.default_branch}`}
        >
          <LuGitBranch />
          <span>{data.default_branch}</span>
        </div>
        <div
          className={`${styles.name} ${styles.item}`}
          title={`Current workspace: ${data.name}`}
        >
          {data.name}
        </div>
      </div>
      <div className={styles.wrapper}>
        <CommitTime name={commit.commit.author.name} message={commit.commit.message} date={commit.commit.author.date} />
        <div
          className={`${styles.lang} ${styles.item} ${styles.highlight}`}
          title="Language"
        >
          <i className="codicon codicon-json" />
          <span>{data.language}</span>
        </div>
        <div
          className={`codicon codicon-bell ${styles.bell} ${styles.highlight}`}
          title="Notifications (Not Supported)"
        />
      </div>
    </footer >
  );
}

function CommitTime({ name, message, date }: { name: string, message: string, date: string; }) {
  return (
    <div
      className={`${styles.commit} ${styles.item}`}
      title={`${name}, ${message}`}
    >
      <FaCodeCommit />
      <TimeAgo date={date} locale="en" />
    </div>
  );
}