import { redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  redirect(`/api/images/${path.join("/")}`);
}
