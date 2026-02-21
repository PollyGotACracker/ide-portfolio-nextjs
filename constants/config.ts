const CONFIG = {
  ENV: process.env.NODE_ENV,
  IS_DEV: process.env.NODE_ENV === "development",
  IS_PROD: process.env.NODE_ENV === "production",

  NICKNAME: "Polly Got A Cracker",
  NEXT_PUBLIC_NAME: process.env.NEXT_PUBLIC_NAME,
  NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL,
  NEXT_PUBLIC_PROD_URL: process.env.NEXT_PUBLIC_PROD_URL,

  GITHUB_USERNAME: "PollyGotACracker",
  GITHUB_REPONAME: "ide-portfolio-nextjs",
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  BUILD_BYPASS_TOKEN: process.env.BUILD_BYPASS_TOKEN,
};

export default CONFIG;
