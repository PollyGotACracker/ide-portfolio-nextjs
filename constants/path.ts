import CONFIG from "./config";

export const PATHS = {
  HOME: "/",
  COURSES: "/courses",
  PROJECTS: "/projects",
  IMAGES: "/images",
  EXTERNAL_BLOG: CONFIG.NEXT_PUBLIC_BLOG_URL!.toString(),
  FILES: "/files",
};

export const PRIVATE_PATHS = {
  PORTFOLIO: "/portfolio",
};
