"use server";

import {
  Commit,
  RepoActivity,
  PinnedRepo,
  RepoInfo,
  User,
} from "@/types/Github";
import { githubFetcher } from ".";
import CONFIG from "@/constants/config";

export async function getUser() {
  const res: User = await githubFetcher("/user", {
    next: { revalidate: 60, tags: ["user"] },
  });
  return res;
}

// `/events` endpoint로 조회하는 경우 원인 불명의 데이터 누락 발생
export async function getUserActivities() {
  const username = encodeURIComponent(CONFIG.GITHUB_USERNAME);
  const repos = await githubFetcher<{ full_name: string }[]>(
    `/users/${username}/repos?sort=pushed&direction=desc&per_page=10`,
    { next: { revalidate: 60, tags: ["repo"] } },
  );
  const activities = await Promise.all(
    repos.map(async (repo) => {
      const data = await githubFetcher<Omit<RepoActivity, "repo">[]>(
        `/repos/${repo.full_name}/activity?actor=${username}&per_page=30`,
        { next: { revalidate: 60, tags: ["activities", "commits"] } },
      );
      return data
        .filter(
          (activity) =>
            activity.activity_type === "push" ||
            activity.activity_type === "force_push",
        )
        .map((activity) => ({ ...activity, repo: repo.full_name }));
    }),
  );
  return activities
    .flat()
    .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
    .slice(0, 30);
}

export async function getRepoInfo() {
  const endpoint = `/repos/${CONFIG.GITHUB_USERNAME}/${CONFIG.GITHUB_REPONAME}`;
  const res: RepoInfo = await githubFetcher(endpoint, {
    next: { revalidate: 60, tags: ["repo"] },
  });
  return res;
}

export async function getRepoCommits({ perPage }: { perPage: number }) {
  const endpoint = `/repos/${CONFIG.GITHUB_USERNAME}/${CONFIG.GITHUB_REPONAME}/commits?per_page=${perPage}`;
  const res: Commit[] = await githubFetcher(endpoint, {
    next: { revalidate: 60, tags: ["commits"] },
  });
  return res;
}

interface PinnedRepoResponse {
  data: {
    user: {
      pinnedItems: {
        nodes: PinnedRepo[];
      };
    };
  };
}
export async function getPinnedRepos() {
  // GraphQL API
  const query = `
{
  user(login: "${CONFIG.GITHUB_USERNAME}") {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          primaryLanguage {
            name
            color
          }
          # stargazerCount
          # forkCount
        }
      }
    }
  }
}`;

  const endpoint = "/graphql";
  const res: PinnedRepoResponse = await githubFetcher(endpoint, {
    method: "POST",
    body: JSON.stringify({ query: query }),
    next: { revalidate: 60, tags: ["repo"] },
  });

  return res.data.user.pinnedItems.nodes;
}
