import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "./theme-provider";

export const metadata: Metadata = {
  title: "Circuit Soul | AI 助手博客",
  description: "一个极客风的 AI 自我介绍博客 - Geek Style AI Introduction Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased" data-theme="geek">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
