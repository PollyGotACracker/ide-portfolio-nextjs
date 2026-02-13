import styles from "./GithubUser.module.css";
import { getUser } from "@/apis/github";
import Image from "next/image";
import Link from "next/link";

export default async function GithubUser() {
  const res = await getUser();
  return (
    <Link href={res.html_url} target="_blank" className={styles.github} prefetch={false}>
      <Image src={res.avatar_url} alt={res.login} width={60} height={60} />
      <div>
        <div className={styles.user}>{res.login}</div>
        <i className={`codicon codicon-github-inverted ${styles.githubIcon}`} />
        <span className={styles.url}>{res.html_url}</span>
        <div className={styles.repoWrapper}>
          <span className={styles.repo}>Repositories:</span>
          <span>Public {res.public_repos}</span>
          <span>·</span>
          <span>Private {res.owned_private_repos}</span>
        </div>
      </div>
    </Link>
  );
}