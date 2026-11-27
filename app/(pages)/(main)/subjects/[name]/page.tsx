import Markdown from "@/components/Markdown";
import { readMd } from "@/utils/readFile";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const data = await readMd("subjects", `${name}.md`);
  return <Markdown>{data}</Markdown>;
}
