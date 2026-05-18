import type { Metadata } from "next";
import { Noto_Sans, Geist } from "next/font/google";
import { cookies } from "next/headers";
import CONFIG from "@/constants/config";
import ThemeProvider from "@/providers/ThemeProvider";
import FontSizeProvider from "@/providers/FontSizeProvider";
import PanelProvider from "@/providers/PanelProvider";
import "@/styles/globals.css";
import "@vscode/codicons/dist/codicon.css";
import { cn } from "@/utils/cn";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: `${CONFIG.NICKNAME} Portfolio`,
      },
    ],
  },
};

const codeToRunOnClient = `(function () {
  const m = document.cookie.match(/(?:^|; )theme=([^;]*)/);
  const theme = m ? m[1] : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', theme === 'dark');
  if (!m) document.cookie = 'theme=' + theme + ';path=/;max-age=31536000';

  const f = document.cookie.match(/(?:^|; )font_size=([^;]*)/);
  if (f) document.documentElement.style.setProperty('--font-size', f[1]);
})()`;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const initialDark = cookieStore.get("theme")?.value === "dark";
  const initialLarge = cookieStore.get("font_size")?.value === "20px";

  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />
      </head>
      <body className={notoSans.variable}>
        <ThemeProvider initialDark={initialDark}>
          <FontSizeProvider initialLarge={initialLarge}>
            <PanelProvider>{children}</PanelProvider>
          </FontSizeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
