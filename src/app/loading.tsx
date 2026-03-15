export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#22d3ee]/30 border-t-[#22d3ee] rounded-full animate-spin" />
        <p className="text-[#22d3ee] font-mono text-sm animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
