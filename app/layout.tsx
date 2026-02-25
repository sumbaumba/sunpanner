import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "(주)이에프글로벌코리아 | HJT 720W 프리미엄 솔루션",
  description:
    "대한민국 유일의 HJT 720W 태양광 패널. 23.18% 모듈 효율, 30년 90.3% 출력 보장. 시공사를 위한 최고의 수익률 솔루션.",
  keywords: "HJT 720W, 태양광 패널, 이에프글로벌코리아, 솔라패널, 고효율 태양광",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
