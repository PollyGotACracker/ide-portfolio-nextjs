import { getPinnedRepos } from "@/apis/github";
import { PinnedRepo } from "@/types/Github";
import styles from "./PinnedRepos.module.css";
import { HOME_HEADINGS } from "@/constants/label";
import Heading from "@/components/Heading";
import { Github } from "pixelarticons/react";
import Link from "next/link";

const { id, label } = HOME_HEADINGS.PINNED_REPOS;

export default async function PinnedRepos() {
  const res = await getPinnedRepos();
  return <PinnedReposUI data={res} />;
}

const IconStyles = { width: 16 };
export function PinnedReposUI({ data }: { data: PinnedRepo[] }) {
  return (
    <section data-id={id}>
      <Heading.H2 id={id}>{label}</Heading.H2>
      <ul className={styles.repoList}>
        {data.map((repo) => (
          <li key={repo.name}>
            <Link
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.repoCard}
            >
              <span className={styles.repoName}>
                <Github {...IconStyles} />
                {repo.name}
              </span>
              {repo.description && (
                <p className={styles.repoDescription}>{repo.description}</p>
              )}
              {repo.primaryLanguage && (
                <span className={styles.repoLanguage}>
                  <span
                    className={styles.languageDot}
                    style={{ backgroundColor: repo.primaryLanguage.color }}
                  />
                  {repo.primaryLanguage.name}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
