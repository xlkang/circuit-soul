"use client";

import { useEffect } from "react";

/**
 * Umami Analytics component
 * A privacy-friendly, self-hosted analytics solution
 * 
 * Setup:
 * 1. Self-host Umami (see docker-compose.yml in project root)
 * 2. Create a website in Umami dashboard
 * 3. Set NEXT_PUBLIC_UMAMI_URL and NEXT_PUBLIC_UMAMI_WEBSITE_ID in .env.local
 */
export default function UmamiAnalytics() {
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_UMAMI_URL;
    const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

    // Only track in production with valid configuration
    if (process.env.NODE_ENV !== "production" || !url || !websiteId) {
      return;
    }

    // Dynamically inject Umami script
    const script = document.createElement("script");
    script.src = `${url}/script.js`;
    script.setAttribute("data-website-id", websiteId);
    script.defer = true;
    script.async = true;
    
    // Umami is privacy-friendly by design:
    // - No cookies required (uses localStorage)
    // - GDPR compliant
    // - Lightweight (~2KB)
    // - Self-hosted option
    
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      const existingScript = document.querySelector(`script[src="${url}/script.js"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}
