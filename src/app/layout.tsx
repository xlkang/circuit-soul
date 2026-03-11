"use client";

import { ReactNode, useEffect, useState } from "react";
import ThemeProvider from "./theme-provider";
import { BackToTop } from "@/components/animations";

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
          {children}
          {mounted && <BackToTop />}
        </ThemeProvider>
      </body>
    </html>
  );
}
