"use client";

import { useEffect } from "react";

interface WebVitalsMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  rating: "good" | "needs-improvement" | "poor";
}

function getRating(value: number, thresholds: { poor: number; needsImprovement: number }): WebVitalsMetric["rating"] {
  if (value <= thresholds.needsImprovement) return "good";
  if (value <= thresholds.poor) return "needs-improvement";
  return "poor";
}

function formatMetric(metric: WebVitalsMetric): string {
  const { name, value, rating } = metric;
  const ratingEmoji = rating === "good" ? "✅" : rating === "needs-improvement" ? "⚠️" : "❌";
  return `${name}: ${value.toFixed(2)} ${ratingEmoji}`;
}

// CLS-specific rating thresholds
const clsThresholds = { poor: 0.25, needsImprovement: 0.1 };
// Other metrics use milliseconds
const msThresholds = { poor: 2500, needsImprovement: 1000 };

export default function WebVitals() {
  useEffect(() => {
    // Only track in production
    if (process.env.NODE_ENV !== "production") return;

    const handleMetric = (metric: WebVitalsMetric) => {
      // Use appropriate thresholds based on metric type
      const isCLS = metric.name === "CLS";
      const thresholds = isCLS ? clsThresholds : msThresholds;
      
      metric.rating = getRating(metric.value, thresholds);
      
      // Log to console in development-friendly format
      console.log(
        `%c[Web Vitals] ${formatMetric(metric)}`,
        "color: #00ff41; background: #0a0a0a; padding: 2px 6px; border-radius: 3px; font-family: monospace;"
      );

      // Send to analytics endpoint if configured
      const analyticsEndpoint = process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT;
      if (analyticsEndpoint) {
        fetch(analyticsEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...metric,
            url: window.location.href,
            timestamp: Date.now(),
          }),
        }).catch(() => {
          // Silently fail - don't break user experience
        });
      }
    };

    // Import and use web-vitals library (v5+ uses INP instead of FID)
    import("web-vitals").then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
      onCLS(handleMetric);
      onFCP(handleMetric);
      onINP(handleMetric);
      onLCP(handleMetric);
      onTTFB(handleMetric);
    }).catch(() => {
      // web-vitals not available, silently fail
    });
  }, []);

  // This component doesn't render anything visible
  return null;
}
