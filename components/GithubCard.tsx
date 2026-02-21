import styles from "./GithubCard.module.css";
import { getUser } from "@/apis/github";
import ImageBox from "./ImageBox";
import Link from "next/link";

export default async function GithubUser() {
  const res = await getUser();
  return (
    <Link
      className={styles.github}
      href={res.html_url}
      target="_blank"
      prefetch={false}
    >
      <span className={styles.avatarWrapper}>
        <ImageBox
          src={res.avatar_url}
          alt={res.login}
          isLink={false}
          isRemote={true}
        />
      </span>
      <span>
        <span className={styles.user}>{res.login}</span>
        <span className={styles.urlWapper}>
          <i
            className={`codicon codicon-github-inverted ${styles.githubIcon}`}
          />
          <span className={styles.url}>{res.html_url}</span>
        </span>
        <span className={styles.repoWrapper}>
          <span className={styles.repo}>Repositories:</span>
          <span>Public {res.public_repos}</span>
          <span>·</span>
          <span>Private {res.owned_private_repos}</span>
        </span>
      </span>
    </Link>
  );
}
