export function LoadingSkeleton() {
  return (
    <div className="w-full max-w-2xl space-y-4 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="h-5 w-32 bg-white/10 rounded mb-3" />
          <div className="h-4 w-full bg-white/10 rounded" />
        </div>
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="h-5 w-24 bg-white/10 rounded mb-3" />
          <div className="h-6 w-32 bg-white/10 rounded" />
        </div>
      </div>
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
        <div className="h-5 w-28 bg-white/10 rounded mb-3" />
        <div className="h-6 w-40 bg-white/10 rounded" />
      </div>
    </div>
  );
}
