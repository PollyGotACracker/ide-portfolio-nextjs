/* 소개 */
export interface ProfileType {
  about: string;
  skills: string[];
  strengths: string[];
}

// /* 학력 */
// export interface EducationType {
//   degree: string;
//   major: string;
//   institution: string;
//   start_at: string;
//   end_at?: string;
// }

// /* 자격증 */
// export interface CertificationType {
//   name: string;
//   date: string;
//   issuer: string;
// }

// /* 주요 역량 */
// export interface SkillsType {
//   frontend: {
//     name: string;
//     capabilities: string[]; // markdown
//   }[];
//   infra: string[];
//   design: string[];
//   backend: string[];
// }

export type LinkType = { label: string; url?: string };
/* 프로젝트 */
export type ProjectTypeValue =
  | "team"
  | "personal"
  | "side"
  | "service"
  | "other";
export interface ProjectType {
  title: string;
  type: ProjectTypeValue;
  repo_url?: string;
  site_url?: string;
  is_active?: boolean;
  start_at: string;
  end_at?: string;
  images?: string[];
  stacks: string[];
  features: { title: string; details?: string[] }[]; // markdown
  links?: LinkType[];
}

/* 경력 */
export interface ExperienceType {
  company: string;
  position: string;
  job_title: string;
  start_at: string;
  end_at?: string;
  responsibilities: string[]; // markdown
  stacks: string[];
  description?: string[]; // markdown
  links?: LinkType[];
}

/* 교육(훈련) */
export interface TrainingType {
  name: string;
  start_at: string;
  end_at?: string;
  institution: string;
  description?: string[]; // markdown
  links?: LinkType[];
}

/* 강의 */
export interface CourseType {
  title: string;
  instructor: string;
  url?: string;
  is_completed: boolean;
}

/* Bottom: Problems */
export type ProblemType = string;

/* Bottom: Output */
export interface OutputType {
  version: string;
  features: string[];
}
