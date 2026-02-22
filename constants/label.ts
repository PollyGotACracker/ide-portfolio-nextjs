import { PATHS } from "./path";

export type Separator = "/" | "#";
export type PageItem = { param: string; label: string };
export type Pages = Record<string, PageItem>;
export type HeadingItem = { id: string; label: string; separator: Separator };
export type Headings = Record<string, HeadingItem>;
export type PageHeadingsMap = Map<string, HeadingItem[]>;

export const PAGES: Pages = {
  HOME: { param: PATHS.HOME, label: "홈" },
  PRACTICE: { param: PATHS.PRACTICE, label: "연습" },
  // TROUBLESHOOTING: { param: PATHS.TROUBLESHOOTING, label: "트러블슈팅" },
  DOWNLOAD: { param: PATHS.STATIC_FILES, label: "다운로드" },
};

export const DOWNLOAD_FILES: Headings = {
  PORTFOLIO: { id: "portfolio.pdf", label: "포트폴리오", separator: "/" },
};

export const HOME_HEADINGS: Headings = {
  PROFILE: { id: "profile", label: "소개", separator: "#" },
  SKILLS: { id: "skills", label: "주요 역량", separator: "#" },
  PROJECTS: { id: "projects", label: "프로젝트", separator: "#" },
  EXPERIENCE: { id: "experience", label: "경력", separator: "#" },
  TRAINING: { id: "training", label: "교육", separator: "#" },
  COURSES: { id: "courses", label: "강의", separator: "#" },
};

export const HOME_SUBHEADINGS: Headings = {
  EDUCATION: { id: "education", label: "학력", separator: "#" },
  CERTIFICATIONS: { id: "certifications", label: "자격증", separator: "#" },
};

export const PRACTICE_HEADINGS: Headings = {
  TEST: { id: "test", label: "테스트", separator: "/" },
};

export const PAGE_HEADINGS: PageHeadingsMap = new Map([
  [PATHS.HOME, Object.values(HOME_HEADINGS)],
  [PATHS.PRACTICE, Object.values(PRACTICE_HEADINGS)],
]);
