"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4">
      <div className="max-w-md w-full bg-[#111] border border-red-500/30 rounded-lg p-6">
        <h2 className="text-xl font-mono text-red-400 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-400 font-mono text-sm mb-4">
          {error.message || "An unexpected error occurred"}
        </p>
        {error.digest && (
          <p className="text-gray-500 font-mono text-xs mb-4">
            Error ID: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="w-full py-2 px-4 bg-[#22d3ee]/10 hover:bg-[#22d3ee]/20 text-[#22d3ee] border border-[#22d3ee]/30 rounded font-mono text-sm transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
