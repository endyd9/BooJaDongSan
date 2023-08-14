import Header from "@/components/header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SWRProvider } from "./swr-provider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

declare global {
  interface Window {
    kakao: any;
  }
}

export const metadata: Metadata = {
  title: "부자동산",
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1 user-scalable=no",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="w-full max-w-xl mx-auto">
        <SWRProvider>
          <Header />
          {children}
        </SWRProvider>
      </body>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" async />
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`}
      />
    </html>
  );
}
