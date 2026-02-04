export interface User {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  owned_private_repos: number;
}

export interface Event {
  id: string;
  type: "PushEvent" | "CreateEvent" | "DeleteEvent",
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravator_id: string;
    url: string;
    avatar_url: string;
  },
  repo: {
    id: number;
    name: string;
    url: string;
  },
  payload: {
    repository_id: number;
    push_id: number;
    ref: string;
    head: string;
    before: string;
  },
  public: boolean;
  created_at: string;
}