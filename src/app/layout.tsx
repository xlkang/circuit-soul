import { JetBrains_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import ThemeProvider from "./theme-provider";
import { metadata } from "./metadata";
import ServiceWorkerRegistration from "@/components/service-worker-registration";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// 使用统一的 metadata 配置
export { metadata };

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${jetbrainsMono.variable} antialiased`} data-theme="geek">
        <ServiceWorkerRegistration />
        <ThemeProvider>
          <ViewTransitions>
            {children}
          </ViewTransitions>
        </ThemeProvider>
      </body>
    </html>
  );
}
