/* 소개 */
export interface Profile {
  name: string;
  email: string;
  about: string; // markdown
}

/* 주요 역량 */
export interface Skills {
  frontend: {
    name: string;
    capabilities: string[]; // markdown
  }[];
  infra: string[];
  design: string[];
  backend: string[];
}

/* 프로젝트 */
export interface Project {
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
export interface Experience {
  company: string;
  position: string;
  start_at: string;
  end_at?: string;
  description: string[]; // markdown
}

/* 학력 */
export interface Education {
  degree: string;
  major: string;
  institution: string;
  start_at: string;
  end_at?: string;
}

/* 자격증 */
export interface Certification {
  name: string;
  start_at: string;
  end_at?: string;
  issuer: string;
}

/* 교육(훈련) */
export interface Training {
  name: string;
  start_at: string;
  end_at?: string;
  description: string[]; // markdown
  institution: string;
}

/* 강의 */
export interface Course {
  platform: string;
  list: {
    title: string;
    instructor: string;
    url?: string;
    is_completed: boolean;
  }[];
}