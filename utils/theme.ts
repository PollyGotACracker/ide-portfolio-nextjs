export const COOKIE_THEME = {
  KEY: "theme",
  INIT: "dark",
} as const;

export const COOKIE_FONT_SIZE = {
  KEY: "font_size",
  INIT: "20px",
} as const;

export const codeToRunOnClient = `(function () {
  const m = document.cookie.match(/(?:^|; )theme=([^;]*)/);
  const theme = m ? m[1] : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', theme === 'dark');
  if (!m) document.cookie = 'theme=' + theme + ';path=/;max-age=31536000';

  const f = document.cookie.match(/(?:^|; )font_size=([^;]*)/);
  if (f) document.documentElement.style.setProperty('--font-size', f[1]);
})()`;
