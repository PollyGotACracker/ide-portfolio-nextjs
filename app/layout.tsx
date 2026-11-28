import type { Metadata } from "next";
import { Noto_Sans, Pixelify_Sans } from "next/font/google";
import { cookies } from "next/headers";
import CONFIG from "@/constants/config";
import ThemeProvider from "@/providers/ThemeProvider";
import FontSizeProvider from "@/providers/FontSizeProvider";
import PanelProvider from "@/providers/PanelProvider";
import "@/styles/globals.css";
import "@vscode/codicons/dist/codicon.css";
import { cn } from "@/utils/cn";
import {
  codeToRunOnClient,
  COOKIE_FONT_SIZE,
  COOKIE_THEME,
} from "@/utils/theme";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});
const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const initialDark =
    cookieStore.get(COOKIE_THEME.KEY)?.value === COOKIE_THEME.INIT;
  const initialLarge =
    cookieStore.get(COOKIE_FONT_SIZE.KEY)?.value === COOKIE_FONT_SIZE.INIT;

  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={cn(pixelifySans.variable, initialDark && "dark")}
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
