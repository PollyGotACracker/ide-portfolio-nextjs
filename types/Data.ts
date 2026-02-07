/* 소개 */
export interface ProfileType {
  about: string; // markdown
}

/* 주요 역량 */
export interface SkillsType {
  frontend: {
    name: string;
    capabilities: string[]; // markdown
  }[];
  infra: string[];
  design: string[];
  backend: string[];
}

/* 프로젝트 */
export interface ProjectType {
  title: string;
  repo_url: string;
  site_url?: string;
  is_active?: boolean;
  start_at: string;
  end_at?: string;
  images: string[];
  stacks: string[];
  features: string[]; // markdown
  links?: { label: string; url: string; }[];
}

/* 경력 */
export interface ExperienceType {
  company: string;
  position: string;
  start_at: string;
  end_at?: string;
  description: string[]; // markdown
}

/* 학력 */
export interface EducationType {
  degree: string;
  major: string;
  institution: string;
  start_at: string;
  end_at?: string;
}

/* 자격증 */
export interface CertificationType {
  name: string;
  start_at: string;
  end_at?: string;
  issuer: string;
}

/* 교육(훈련) */
export interface TrainingType {
  name: string;
  start_at: string;
  end_at?: string;
  description: string[]; // markdown
  institution: string;
}

/* 강의 */
export interface CourseType {
  platform: string;
  list: {
    title: string;
    instructor: string;
    url?: string;
    is_completed: boolean;
  }[];
}

export interface PortfolioData {
  profile: ProfileType;
}