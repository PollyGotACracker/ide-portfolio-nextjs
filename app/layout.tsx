import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { cookies } from 'next/headers';
import CONFIG from "@/constants/config";
import ThemeProvider from "@/contexts/ThemeProvider";
import FontSizeProvider from "@/contexts/FontSizeProvider";
import "./reset.css";
import "./globals.css";
import '@vscode/codicons/dist/codicon.css';

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const title = CONFIG.NICKNAME;
const url = CONFIG.NEXT_PUBLIC_PROD_URL;
const description = `${title} | Frontend Developer Portfolio`;

export const metadata: Metadata = {
  ...(url && { metadataBase: new URL(url) }),
  title,
  description,
  openGraph: {
    title,
    description,
    images: [
      {
        url: '/og_image.png',
        width: 1200,
        height: 630,
        alt: `${CONFIG.NICKNAME} Portfolio`,
      },
    ],
  },
};


const ScriptTheme = () => {
  const codeToRunOnClient = `(function () {
    const m = document.cookie.match(/(?:^|; )theme=([^;]*)/);
    const theme = m ? m[1] : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
    if (!m) document.cookie = 'theme=' + theme + ';path=/;max-age=31536000';

    const f = document.cookie.match(/(?:^|; )font_size=([^;]*)/);
    if (f) document.documentElement.style.setProperty('--font-size', f[1]);
  })()`;
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const cookieStore = await cookies();
  const initialDark = cookieStore.get('theme')?.value === 'dark';
  const initialLarge = cookieStore.get('font_size')?.value === '20px';

  return (
    <html lang="ko" suppressHydrationWarning>
      <head><ScriptTheme /></head>
      <body className={`${notoSans.variable}`}>
        <ThemeProvider initialDark={initialDark}>
          <FontSizeProvider initialLarge={initialLarge}>
            {children}
          </FontSizeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}