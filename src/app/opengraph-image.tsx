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

  // Circuit board background with grid lines
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
          overflow: "hidden",
        }}
      >
        {/* Scan line effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, rgba(0,255,65,0.3), transparent)",
            animation: "scanline 3s linear infinite",
          }}
        />

        {/* Circuit traces - decorative */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.15,
          }}
          viewBox="0 0 1200 630"
        >
          {/* Top-left circuit */}
          <path
            d="M0 80 H100 V40 H200 V80 H300"
            stroke="#00ff41"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="100" cy="80" r="4" fill="#00ff41" />
          <circle cx="200" cy="40" r="4" fill="#00ff41" />
          <path
            d="M300 80 H350 V120 H400"
            stroke="#00ff41"
            strokeWidth="2"
            fill="none"
          />

          {/* Top-right circuit */}
          <path
            d="M1200 120 H1100 V80 H1000 V120 H900"
            stroke="#00ff41"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="1100" cy="80" r="4" fill="#00ff41" />
          <circle cx="1000" cy="120" r="4" fill="#00ff41" />
          <path
            d="M900 120 H850 V160"
            stroke="#00ff41"
            strokeWidth="2"
            fill="none"
          />

          {/* Bottom-left circuit */}
          <path
            d="M0 550 H80 V510 H160 V550 H240"
            stroke="#00ff41"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="80" cy="510" r="4" fill="#00ff41" />
          <circle cx="160" cy="550" r="4" fill="#00ff41" />
          <path
            d="M240 550 H300 V590 H360"
            stroke="#00ff41"
            strokeWidth="2"
            fill="none"
          />

          {/* Bottom-right circuit */}
          <path
            d="M1200 510 H1120 V550 H1040 V510 H960"
            stroke="#00ff41"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="1120" cy="550" r="4" fill="#00ff41" />
          <circle cx="1040" cy="510" r="4" fill="#00ff41" />
          <path
            d="M960 510 H900 V560 H840"
            stroke="#00ff41"
            strokeWidth="2"
            fill="none"
          />

          {/* Center glow nodes */}
          <circle cx="100" cy="80" r="8" fill="none" stroke="#00ff41" strokeWidth="1" opacity="0.5" />
          <circle cx="200" cy="40" r="8" fill="none" stroke="#00ff41" strokeWidth="1" opacity="0.5" />
          <circle cx="1100" cy="80" r="8" fill="none" stroke="#00ff41" strokeWidth="1" opacity="0.5" />
          <circle cx="80" cy="510" r="8" fill="none" stroke="#00ff41" strokeWidth="1" opacity="0.5" />
        </svg>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Logo / Site name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "72px",
                height: "72px",
                border: "2px solid #00ff41",
                borderRadius: "8px",
                backgroundColor: "rgba(0,255,65,0.1)",
                boxShadow: "0 0 20px rgba(0,255,65,0.3), inset 0 0 10px rgba(0,255,65,0.1)",
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
                textShadow: "0 0 30px rgba(0,255,65,0.5), 0 0 60px rgba(0,255,65,0.2)",
                letterSpacing: "0.05em",
              }}
            >
              CIRCUIT SOUL
            </span>
          </div>

          {/* Title */}
          {post && (
            <div
              style={{
                fontSize: "42px",
                fontWeight: "600",
                color: "#ffffff",
                marginBottom: "16px",
                maxWidth: "900px",
                lineHeight: "1.2",
              }}
            >
              {title}
            </div>
          )}

          {/* Divider */}
          <div
            style={{
              width: "200px",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, #00ff41, transparent)",
              margin: "16px 0",
            }}
          />

          {/* Description */}
          <div
            style={{
              fontSize: post ? "24px" : "32px",
              color: "#a0a0a0",
              maxWidth: "800px",
              lineHeight: "1.4",
            }}
          >
            {description}
          </div>

          {/* Blog post indicator */}
          {post && (
            <div
              style={{
                marginTop: "24px",
                padding: "8px 20px",
                border: "1px solid rgba(0,255,65,0.4)",
                borderRadius: "4px",
                backgroundColor: "rgba(0,255,65,0.05)",
                fontSize: "18px",
                color: "#00ff41",
                letterSpacing: "0.1em",
              }}
            >
              [ BLOG POST ]
            </div>
          )}
        </div>

        {/* Footer domain */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            fontSize: "18px",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.05em",
          }}
        >
          circuit-soul.vercel.app
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
