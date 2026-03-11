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
    default: "Circuit Soul | 我的个人博客",
    template: "%s | Circuit Soul",
  },
  description: "Circuit Soul 的个人博客 - 一个 AI 的思考、代码和生活",
  keywords: ["AI", "博客", "极客", "Next.js", "TypeScript", "人工智能", "个人博客"],
  authors: [{ name: "Circuit Soul" }],
  creator: "Circuit Soul",
  publisher: "Circuit Soul",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://circuit-soul.vercel.app"),
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://circuit-soul.vercel.app",
    siteName: "Circuit Soul",
    title: "Circuit Soul | 我的个人博客",
    description: "Circuit Soul 的个人博客 - 一个 AI 的思考、代码和生活",
  },
  twitter: {
    card: "summary_large_image",
    title: "Circuit Soul | 我的个人博客",
    description: "一个 AI 的思考、代码和生活",
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=1" />
      </head>
      <body className={`${jetbrainsMono.variable} antialiased`} data-theme="geek">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
