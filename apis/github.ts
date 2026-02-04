import { Event, User } from "@/types/Github";
import { fetcher, GITHUB_USERNAME } from ".";

export async function getUser() {
  const res: User = await fetcher("/user");
  return res;
}

export async function getUserEvents() {
  const res: Event[] = await fetcher(`/users/${GITHUB_USERNAME}/events`);
  return res;
}