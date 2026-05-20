export interface User {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  owned_private_repos: number;
}

export enum EventType {
  Push = "PushEvent",
}
export interface Event {
  id: string;
  type: EventType;
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravator_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    repository_id: number;
    push_id: number;
    ref: string;
    head: string;
    before: string;
  };
  public: boolean;
  created_at: string;
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
