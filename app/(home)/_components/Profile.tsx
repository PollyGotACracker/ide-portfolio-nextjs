import Heading from "@/components/Heading";
import { ProfileType } from "@/types/Data";
import { HOME_HEADINGS } from "@/constants/label";
import { getJson } from "@/libs/getter";
import { MdModeComment } from "react-icons/md";

const file = "profile.json";
const { id, label } = HOME_HEADINGS.PROFILE;

export default async function Profile() {
  const data: ProfileType = await getJson(file);

  return (
    <section>
      <Heading.H2 id={id} icon={<MdModeComment />}>{label}</Heading.H2>
      <div>{data.about}</div>
    </section>
  );
}
