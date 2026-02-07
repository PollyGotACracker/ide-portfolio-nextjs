import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./reset.css";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const title = process.env.NEXT_PUBLIC_NICKNAME;
const url = process.env.NEXT_PUBLIC_URL;
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
        alt: `${process.env.NEXT_PUBLIC_NICKNAME} Portfolio`,
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
