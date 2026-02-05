import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./reset.css";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const title = process.env.NEXT_PUBLIC_NAME;
const description = `${title} | Frontend Developer Portfolio`;
export const metadata: Metadata = {
  metadataBase: new URL('https://ide-portfolio-nextjs.vercel.app'),
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
        alt: `${process.env.NEXT_PUBLIC_NAME} Portfolio`,
      },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ko">
      <body className={`${notoSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
