import styles from "./Profile.module.css";
import GithubUser from "@/components/GithubUser";
import Heading from "@/components/Heading";
import Markdown from "@/components/Markdown";
import List from "@/components/List";
import { ProfileType } from "@/types/Data";
import { HOME_HEADINGS, HOME_SUBHEADINGS } from "@/constants/label";
import { FILES } from "@/constants/dir";
import { getJson } from "@/libs/getter";
import { MdModeComment } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";
import { FaCertificate } from "react-icons/fa6";

const { id, label } = HOME_HEADINGS.PROFILE;

export default async function Profile() {
  const data: ProfileType = await getJson(FILES.PROFILE);
  return <ProfileUI data={data} />;
}

export function ProfileUI({ data }: { data: ProfileType; }) {
  return (
    <section className={styles.section}>
      <Heading.H2 id={id} icon={<MdModeComment />}>{label}</Heading.H2>
      <GithubUser />
      <Markdown>{data.about}</Markdown>
      <Educations data={data.educations} />
      <Certifications data={data.certifications} />
    </section>
  );
}

function Educations({ data }: { data: ProfileType["educations"]; }) {
  return (
    <>
      <Heading.H3 icon={<FaGraduationCap />}>{HOME_SUBHEADINGS.EDUCATION.label}</Heading.H3>
      <List className={styles.list}>
        {data.map((i) =>
          <li className={styles.item} key={i.start_at}>
            <span>{`${i.start_at} ~ ${i?.end_at ?? ``}`}</span>
            <span>{`${i.institution} ${i.major} ${i.degree}`}</span>
          </li>
        )}
      </List>
    </>
  );
}

function Certifications({ data }: { data: ProfileType["certifications"]; }) {
  return (
    <>
      <Heading.H3 icon={<FaCertificate />}>{HOME_SUBHEADINGS.CERTIFICATIONS.label}</Heading.H3>
      <List className={styles.list}>
        {data.map((i) =>
          <li className={styles.item} key={i.date}>
            <span>{i.date}</span>
            <span>{`${i.name} (${i.issuer})`}</span>
          </li>
        )}
      </List>
    </>
  );
}
