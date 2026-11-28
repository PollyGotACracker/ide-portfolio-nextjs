export interface User {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  owned_private_repos: number;
}

export interface RepoActivity {
  id: number;
  activity_type: string;
  repo: string;
  ref: string;
  after: string;
  timestamp: string;
}

export interface RepoInfo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  size: number;
  pushed_at: string;
  updated_at: string;
  created_at: string;
  default_branch: string;
  homepage: string | null;
  license: {
    key: string;
    name: string;
  } | null;
}

export interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
}

export interface PinnedRepo {
  name: string;
  description: string;
  url: string;
  primaryLanguage: { name: string; color: string } | null;
}
