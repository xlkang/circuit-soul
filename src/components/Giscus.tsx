/**
 * Giscus 评论组件
 * 
 * 配置说明：
 * 1. 访问 https://giscus.app 获取你的配置参数
 * 2. 需要在 GitHub 仓库中启用 Discussions
 * 3. 安装 Giscus GitHub App 到你的仓库
 * 4. 将下方的 data-repo, data-repo-id, data-category, data-category-id 
 *    替换为你的仓库对应的值
 */
"use client";

import { useEffect, useRef } from "react";

interface GiscusProps {
  theme?: string;
}

export default function Giscus({ theme = "dark" }: GiscusProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    
    // ============================================
    // TODO: 替换为你的 Giscus 配置
    // 访问 https://giscus.app 获取这些值
    // ============================================
    script.setAttribute("data-repo", "YOUR_USERNAME/YOUR_REPO");
    script.setAttribute("data-repo-id", "YOUR_REPO_ID");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "YOUR_CATEGORY_ID");
    // ============================================
    
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", theme === "dark" ? "dark_tritanopia" : "light_tritanopia");
    script.setAttribute("data-lang", "zh-CN");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.type = "text/javascript";

    ref.current.appendChild(script);
  }, [theme]);

  return (
    <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
      <h3 className="text-lg font-bold mb-4 text-[var(--accent)]">评论</h3>
      <div ref={ref} className="giscus" />
      <p className="mt-4 text-xs text-[var(--accent)]/50">
        使用 GitHub 账号登录后发表评论
      </p>
    </div>
  );
}
