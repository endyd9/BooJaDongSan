import Header from "@/components/header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SWRProvider } from "./swr-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "부자동산",
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1 user-scalable=no",
};

export default function RootLayout({
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
    </html>
  );
}
