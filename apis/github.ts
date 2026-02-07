import { Event, User } from "@/types/Github";
import { GITHUB_USERNAME, githubFetcher } from ".";

export async function getUser() {
  const res: User = await githubFetcher("/user");
  return res;
}

export async function getUserEvents() {
  const res: Event[] = await githubFetcher(`/users/${GITHUB_USERNAME}/events`);
  return res;
}