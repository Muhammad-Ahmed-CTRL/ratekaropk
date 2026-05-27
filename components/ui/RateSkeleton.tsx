export function RateSkeleton() {
  return (
    <div className="bg-card border border-[rgba(0,245,196,0.1)] rounded-card p-6 w-full">
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.05)] pb-4 mb-6">
        <div className="h-5 w-32 bg-[rgba(255,255,255,0.05)] rounded shimmer" />
        <div className="h-5 w-16 bg-[rgba(255,255,255,0.05)] rounded shimmer" />
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-1 flex flex-col items-center border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.05)] last:border-0 pb-4 md:pb-0">
            <div className="h-4 w-12 bg-[rgba(255,255,255,0.05)] rounded mb-3 shimmer" />
            <div className="h-10 w-24 bg-[rgba(255,255,255,0.05)] rounded mb-2 shimmer" />
            <div className="h-4 w-20 bg-[rgba(255,255,255,0.05)] rounded shimmer" />
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4">
        <div className="h-12 w-full bg-[rgba(255,255,255,0.05)] rounded-full shimmer" />
      </div>
    </div>
  );
}
