import Markdown from "@/components/Markdown";
import { readMd } from "@/libs/readFile";

export default async function Page({ params }: { params: Promise<{ subject: string; }>; }) {
  const { subject } = await params;
  const data = await readMd("practice", `${subject}.md`);
  return (
    <Markdown>
      {data}
    </Markdown>
  );
}
