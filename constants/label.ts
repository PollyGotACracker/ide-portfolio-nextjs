import { getMapItemFromHeading } from "@/utils/getPath";
import { PATHS } from "./path";

export type Separator = "/" | "#" | "";
export type PageItem = { param: string; label: string };
export type Pages = Record<string, PageItem>;
export type HeadingItem = { id: string; label: string; separator: Separator };
export type Headings = Record<string, HeadingItem>;
export type PageHeadingsMap = Map<string, HeadingItem[]>;

export const PAGES: Pages = {
  HOME: { param: PATHS.HOME, label: "홈" },
  COURSES: { param: PATHS.COURSES, label: "강의" },
  PROJECTS: { param: PATHS.PROJECTS, label: "프로젝트" },
  IMAGES: { param: PATHS.IMAGES, label: "이미지" },
  BLOG: { param: PATHS.EXTERNAL_BLOG, label: "블로그" },
  FILES: { param: PATHS.FILES, label: "파일" },
};

export const HOME_HEADINGS: Headings = {
  EXPERIENCE: { id: "experience", label: "경력", separator: "#" },
  PROJECTS: { id: "projects", label: "프로젝트", separator: "#" },
  PROJECTS_TOY: { id: "projects-toy", label: "토이 프로젝트", separator: "#" },
  TRAINING: { id: "training", label: "교육", separator: "#" },
  PINNED_REPOS: { id: "pinned-repos", label: "주요 저장소", separator: "#" },
};

export const INDEPENDENT_HEADINGS: Headings = {
  COURSES: {
    id: "courses",
    label: PAGES.COURSES.label,
    separator: "",
  },
};

export const EXTERNAL_LINKS: Headings = {
  BLOG: { id: "", label: "블로그", separator: "" },
};

export const FILES: Headings = {
  PORTFOLIO: { id: "portfolio.pdf", label: "포트폴리오", separator: "/" },
};

export const PAGE_HEADINGS: PageHeadingsMap = new Map([
  [PATHS.HOME, Object.values(HOME_HEADINGS)],
  [PATHS.COURSES, [INDEPENDENT_HEADINGS.COURSES]],
]);

export const TERMINAL_CD_MAP = new Map<string, string>([
  ...getMapItemFromHeading(PATHS.HOME, HOME_HEADINGS),
  ...getMapItemFromHeading("", INDEPENDENT_HEADINGS),
]);
