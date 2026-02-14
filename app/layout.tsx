import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./reset.css";
import "./globals.css";
import CONFIG from "@/constants/config";

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
    const themeSaved = localStorage.getItem('theme');
    if (themeSaved) {
      document.documentElement.dataset.theme = themeSaved;
    } else {
      const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    }

    const fontSaved = localStorage.getItem('fontSize');
    if (fontSaved) {
      document.documentElement.style.setProperty('--font-size', fontSaved);
    }
  })()`;
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head><ScriptTheme /></head>
      <body className={`${notoSans.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
