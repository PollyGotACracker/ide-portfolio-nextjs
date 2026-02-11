import { STATIC_FILES_DIR } from "./dir";

export const PAGES = {
  HOME: { param: "/", label: "홈" },
  LOG: { param: "/log", label: "기록" },
  DOWNLOAD: { param: STATIC_FILES_DIR, label: "다운로드" },
};

export const DOWNLOAD_FILES = {
  PORTFOLIO: { id: "portfolio.pdf", label: "포트폴리오", separator: "/" }
};

export const HOME_HEADINGS = {
  PROFILE: { id: "profile", label: "소개", separator: "#" },
  SKILLS: { id: "skills", label: "주요 역량", separator: "#" },
  PROJECTS: { id: "projects", label: "프로젝트", separator: "#" },
  EXPERIENCE: { id: "experience", label: "경력", separator: "#" },
  TRAINING: { id: "training", label: "교육", separator: "#" },
  COURSES: { id: "courses", label: "강의", separator: "#" },
};

export const HOME_SUBHEADINGS = {
  EDUCATION: { id: "education", label: "학력", separator: "#" },
  CERTIFICATIONS: { id: "certifications", label: "자격증", separator: "#" },
};

export const LOG_HEADINGS = {
  TEST: { id: "test", label: "테스트", separator: "#" }
};