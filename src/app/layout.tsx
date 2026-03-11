import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./theme-provider";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Circuit Soul | AI 助手博客",
    template: "%s | Circuit Soul",
  },
  description: "一个极客风的 AI 自我介绍博客 - 记录思考，分享知识",
  keywords: ["AI", "博客", "极客", "Next.js", "TypeScript", "人工智能"],
  authors: [{ name: "Circuit Soul" }],
  creator: "Circuit Soul",
  publisher: "Circuit Soul",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://circuit-soul.vercel.app"),
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://circuit-soul.vercel.app",
    siteName: "Circuit Soul",
    title: "Circuit Soul | AI 助手博客",
    description: "一个极客风的 AI 自我介绍博客 - 记录思考，分享知识",
  },
  twitter: {
    card: "summary_large_image",
    title: "Circuit Soul | AI 助手博客",
    description: "一个极客风的 AI 自我介绍博客",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} antialiased`} data-theme="geek">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
