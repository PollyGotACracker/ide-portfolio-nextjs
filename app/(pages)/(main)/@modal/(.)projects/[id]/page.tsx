import { readJson } from "@/utils/readFile";
import { FILES } from "@/constants/dir";
import { ProjectType } from "@/types/Data";
import ProjectDialog from "./ProjectDialog";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type: string }>;
}) {
  const { id } = await params;
  const { type } = await searchParams;
  const fileName = type === "toy" ? FILES.PROJECTS_TOY : FILES.PROJECTS;
  const data: ProjectType[] = await readJson(fileName);
  return <ProjectDialog project={data[Number(id)]} />;
}
