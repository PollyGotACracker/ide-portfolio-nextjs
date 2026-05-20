"use server";

import { Commit, Event, PinnedRepo, RepoInfo, User } from "@/types/Github";
import { githubFetcher } from ".";
import CONFIG from "@/constants/config";

export async function getUser() {
  const res: User = await githubFetcher("/user", {
    next: { revalidate: 60, tags: ["user"] },
  });
  return res;
}

export async function getUserEvents() {
  const endpoint = `/users/${CONFIG.GITHUB_USERNAME}/events`;
  const res: Event[] = await githubFetcher(endpoint, {
    next: { revalidate: 60, tags: ["events", "commits"] },
  });
  return res;
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
