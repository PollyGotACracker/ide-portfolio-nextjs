import SourceControl from "./SourceControl";
import { getUserActivities } from "@/apis/github";

export default async function SourceControlFetched() {
  const data = await getUserActivities();
  return <SourceControl data={data} />;
}
