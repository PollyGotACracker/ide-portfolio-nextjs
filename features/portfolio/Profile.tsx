// REMOVED

import styles from "./Profile.module.css";
import Heading from "@/components/Heading";
import Markdown from "@/components/Markdown";
import { ProfileType } from "@/types/Data";
import { FILES } from "@/constants/dir";
import { readJson } from "@/utils/readFile";
import { FaGraduationCap } from "react-icons/fa6";
import { FaCertificate } from "react-icons/fa6";

const { id, label } = { id: "profile", label: "소개" };
const HOME_SUBHEADINGS = {
  EDUCATION: { id: "education", label: "학력", separator: "#" },
  CERTIFICATIONS: { id: "certifications", label: "자격증", separator: "#" },
};

export default async function Profile() {
  const data: ProfileType = await readJson(FILES.PROFILE);
  return <ProfileUI data={data} />;
}

export function ProfileUI({ data }: { data: ProfileType }) {
  return (
    <section data-id={id} className={styles.section}>
      <Heading.H2 id={id}>{label}</Heading.H2>
      <Markdown className={styles.about}>{data.about}</Markdown>
      <Educations data={data.educations} />
      <Certifications data={data.certifications} />
    </section>
  );
}

function Educations({ data }: { data: ProfileType["educations"] }) {
  return (
    <>
      <Heading.H3 icon={<FaGraduationCap />}>
        {HOME_SUBHEADINGS.EDUCATION.label}
      </Heading.H3>
      <ul className={styles.list}>
        {data.map((i) => (
          <li className={styles.item} key={i.start_at}>
            <span
              className={styles.range}
            >{`${i.start_at} ~ ${i?.end_at ?? ``}`}</span>
            <span>{`${i.institution} ${i.major} ${i.degree}`}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function Certifications({ data }: { data: ProfileType["certifications"] }) {
  return (
    <>
      <Heading.H3 icon={<FaCertificate />}>
        {HOME_SUBHEADINGS.CERTIFICATIONS.label}
      </Heading.H3>
      <ul className={styles.list}>
        {data.map((i) => (
          <li className={styles.item} key={i.date}>
            <span className={styles.range}>{i.date}</span>
            <span>{`${i.name} (${i.issuer})`}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
