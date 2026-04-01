import { JetBrains_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import ThemeProvider from "./theme-provider";
import { metadata } from "./metadata";
import ServiceWorkerRegistration from "@/components/service-worker-registration";
import WebVitals from "@/components/WebVitals";

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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Circuit Soul",
    url: "https://circuit-soul.vercel.app",
    description: "A geek-style technical blog exploring code, design, and self-evolution.",
    publisher: {
      "@type": "Organization",
      name: "Circuit Soul",
      logo: {
        "@type": "ImageObject",
        url: "https://circuit-soul.vercel.app/icon.svg",
      },
    },
  };

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${jetbrainsMono.variable} antialiased`} data-theme="geek">
        {/* Skip to main content - accessibility improvement */}
        <a
          href="#main-content"
          className="skip-link"
        >
          跳转到主要内容
        </a>
        <ServiceWorkerRegistration />
        <ThemeProvider>
          <ViewTransitions>
            {children}
          </ViewTransitions>
        </ThemeProvider>
        <WebVitals />
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
