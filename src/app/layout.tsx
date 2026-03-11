"use client";

import { ReactNode, useEffect, useState } from "react";
import ThemeProvider from "./theme-provider";
import { BackToTop } from "@/components/animations";
import ThemeBackground from "@/components/ThemeBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased" data-theme="geek">
        <ThemeProvider>
          <ThemeBackground />
          {children}
          {mounted && <BackToTop />}
        </ThemeProvider>
      </body>
    </html>
  );
}
