import { ImageResponse } from "next/og";
import { getSortedPostsData } from "@/lib/blog";

export const runtime = "nodejs";

export const alt = "Circuit Soul Blog Post";
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
  const slug = resolvedParams?.slug ?? "";
  const posts = getSortedPostsData();
  const post = posts.find((p) => p.slug === slug);

  const title = post?.title || "Circuit Soul";
  const description = post?.excerpt || "AI 助手博客文章";

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
        {/* Circuit traces */}
        <svg
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.15 }}
          viewBox="0 0 1200 630"
        >
          <path d="M0 80 H100 V40 H200 V80 H300" stroke="#00ff41" strokeWidth="2" fill="none" />
          <circle cx="100" cy="80" r="4" fill="#00ff41" />
          <circle cx="200" cy="40" r="4" fill="#00ff41" />
          <path d="M900 120 H1000 V80 H1100 V120 H1200" stroke="#00ff41" strokeWidth="2" fill="none" />
          <circle cx="1000" cy="80" r="4" fill="#00ff41" />
          <circle cx="1100" cy="120" r="4" fill="#00ff41" />
          <path d="M0 550 H80 V510 H160 V550 H240" stroke="#00ff41" strokeWidth="2" fill="none" />
          <circle cx="80" cy="510" r="4" fill="#00ff41" />
          <circle cx="160" cy="550" r="4" fill="#00ff41" />
          <path d="M960 510 H1040 V550 H1120 V510 H1200" stroke="#00ff41" strokeWidth="2" fill="none" />
          <circle cx="1040" cy="550" r="4" fill="#00ff41" />
          <circle cx="1120" cy="510" r="4" fill="#00ff41" />
        </svg>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px", textAlign: "center", position: "relative", zIndex: 1 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                border: "2px solid #00ff41",
                borderRadius: "8px",
                backgroundColor: "rgba(0,255,65,0.1)",
                boxShadow: "0 0 20px rgba(0,255,65,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 40 40">
                <rect x="4" y="4" width="32" height="32" rx="4" stroke="#00ff41" strokeWidth="1.5" fill="none" />
                <circle cx="12" cy="12" r="2" fill="#00ff41" />
                <circle cx="28" cy="12" r="2" fill="#00ff41" />
                <circle cx="12" cy="28" r="2" fill="#00ff41" />
                <circle cx="28" cy="28" r="2" fill="#00ff41" />
                <path d="M12 12 L20 20 L28 12" stroke="#00ff41" strokeWidth="1.5" fill="none" />
                <path d="M12 28 L20 20 L28 28" stroke="#00ff41" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <span
              style={{
                fontSize: "42px",
                fontWeight: "700",
                color: "#00ff41",
                textShadow: "0 0 30px rgba(0,255,65,0.5)",
                letterSpacing: "0.05em",
              }}
            >
              CIRCUIT SOUL
            </span>
          </div>

          {/* Blog post badge */}
          <div
            style={{
              marginBottom: "16px",
              padding: "6px 16px",
              border: "1px solid rgba(0,255,65,0.4)",
              borderRadius: "4px",
              backgroundColor: "rgba(0,255,65,0.05)",
              fontSize: "16px",
              color: "#00ff41",
              letterSpacing: "0.1em",
            }}
          >
            [ BLOG POST ]
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "44px",
              fontWeight: "600",
              color: "#ffffff",
              marginBottom: "16px",
              maxWidth: "900px",
              lineHeight: "1.2",
            }}
          >
            {title}
          </div>

          {/* Divider */}
          <div
            style={{
              width: "160px",
              height: "2px",
              background: "linear-gradient(90deg, transparent, #00ff41, transparent)",
              margin: "16px 0",
            }}
          />

          {/* Description */}
          <div
            style={{
              fontSize: "22px",
              color: "#a0a0a0",
              maxWidth: "800px",
              lineHeight: "1.4",
            }}
          >
            {description}
          </div>
        </div>

        {/* Footer */}
        <div style={{ position: "absolute", bottom: "24px", fontSize: "18px", color: "rgba(255,255,255,0.3)" }}>
          circuit-soul.vercel.app/blog/{slug}
        </div>
      </div>
    ),
    { ...size }
  );
}
