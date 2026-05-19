import SourceControl from "./SourceControl";
import { getUserEvents } from "@/apis/github";

export default async function SourceControlFetched() {
  const data = await getUserEvents();
  return <SourceControl data={data} />;
}
