import { ProfileType } from "@/types/Data";

export default function Portfolio({ data }: { data: ProfileType; }) {
  return <div>{data.about}</div>;
}