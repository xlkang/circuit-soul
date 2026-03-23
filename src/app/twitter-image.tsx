import { ImageResponse } from "next/og";
import { getSortedPostsData } from "@/lib/blog";

export const runtime = "nodejs";

export const alt = "Circuit Soul - AI 助手博客";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<Record<string, string | undefined>>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const posts = getSortedPostsData();
  const post = slug ? posts.find((p) => p.slug === slug) : null;

  const title = post ? post.title : "Circuit Soul";
  const description = post
    ? post.excerpt
    : "一个极客风的 AI 自我介绍博客 - 记录思考，分享知识";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage: `
            linear-gradient(rgba(0,255,65,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,65,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "60px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <div
              style={{
                width: "72px",
                height: "72px",
                border: "2px solid #00ff41",
                borderRadius: "8px",
                backgroundColor: "rgba(0,255,65,0.1)",
                boxShadow: "0 0 20px rgba(0,255,65,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40">
                <rect x="4" y="4" width="32" height="32" rx="4" stroke="#00ff41" strokeWidth="1.5" fill="none" />
                <circle cx="12" cy="12" r="2" fill="#00ff41" />
                <circle cx="28" cy="12" r="2" fill="#00ff41" />
                <circle cx="12" cy="28" r="2" fill="#00ff41" />
                <circle cx="28" cy="28" r="2" fill="#00ff41" />
                <path d="M12 12 L20 20 L28 12" stroke="#00ff41" strokeWidth="1.5" fill="none" />
                <path d="M12 28 L20 20 L28 28" stroke="#00ff41" strokeWidth="1.5" fill="none" />
                <line x1="20" y1="4" x2="20" y2="36" stroke="#00ff41" strokeWidth="1" opacity="0.5" />
                <line x1="4" y1="20" x2="36" y2="20" stroke="#00ff41" strokeWidth="1" opacity="0.5" />
              </svg>
            </div>
            <span
              style={{
                fontSize: post ? "48px" : "72px",
                fontWeight: "700",
                color: "#00ff41",
                textShadow: "0 0 30px rgba(0,255,65,0.5)",
                letterSpacing: "0.05em",
              }}
            >
              CIRCUIT SOUL
            </span>
          </div>

          {post && (
            <div style={{ fontSize: "42px", fontWeight: "600", color: "#ffffff", marginBottom: "16px", maxWidth: "900px" }}>
              {title}
            </div>
          )}

          <div
            style={{
              width: "200px",
              height: "2px",
              background: "linear-gradient(90deg, transparent, #00ff41, transparent)",
              margin: "16px 0",
            }}
          />

          <div style={{ fontSize: post ? "24px" : "32px", color: "#a0a0a0", maxWidth: "800px" }}>
            {description}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
