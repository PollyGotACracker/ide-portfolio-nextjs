import { getRepoCommits, getRepoInfo } from "@/apis/github";
import Footer from "./Footer";

export default async function FooterFetched() {
  const [data, commits] = await Promise.all([
    getRepoInfo().catch(() => null),
    getRepoCommits({ perPage: 1 }).catch(() => null),
  ]);
  return <Footer data={data} commit={commits?.[0] ?? null} />;
}
