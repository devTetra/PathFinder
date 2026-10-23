function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-border animate-pulse rounded-md ${className}`}
      aria-hidden="true"
    />
  );
}

const TABS = ["Overview", "Skills", "Responsibilities", "Related Careers"];

function RelatedCareerCardSkeleton() {
  return (
    <div className="border-border bg-surface rounded-xl border p-3">
      <SkeletonBlock className="mb-2.5 h-15 w-full rounded-lg" />
      <SkeletonBlock className="mx-auto h-2.5 w-2/3" />
    </div>
  );
}

export function CareerDetailSkeleton() {
  return (
    // <main className="bg-background min-h-screen">
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="bg-surface rounded-2xl p-5 shadow-sm sm:p-8 lg:p-10">
        {/* Static — not data-dependent */}

        {/* Illustration banner */}
        <SkeletonBlock className="mb-5 h-50 w-full rounded-2xl" />

        {/* Title */}
        <SkeletonBlock className="mb-5 h-6 w-[45%]" />

        {/* Static tab nav */}
        <div className="border-border mb-6 flex gap-1 overflow-x-auto border-b">
          {TABS.map((tab, i) => (
            <span
              key={tab}
              className={`px-3.5 py-2.5 text-sm font-bold whitespace-nowrap ${
                i === 0
                  ? "text-primary border-primary border-b-2"
                  : "text-text-muted"
              }`}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* Overview */}
        <SkeletonBlock className="mb-3 h-3 w-24" />
        <div className="mb-7 space-y-2">
          <SkeletonBlock className="h-2.5 w-full" />
          <SkeletonBlock className="h-2.5 w-full" />
          <SkeletonBlock className="h-2.5 w-[70%]" />
        </div>

        {/* Skills */}
        <SkeletonBlock className="mb-3 h-3 w-24" />
        <div className="mb-7 flex flex-wrap gap-2">
          <SkeletonBlock className="h-6.5 w-30 rounded-lg opacity-60" />
          <SkeletonBlock className="h-6.5 w-37.5 rounded-lg opacity-60" />
          <SkeletonBlock className="h-6.5 w-25 rounded-lg opacity-60" />
          <SkeletonBlock className="h-6.5 w-35 rounded-lg opacity-60" />
          <SkeletonBlock className="h-6.5 w-22.5 rounded-lg opacity-60" />
        </div>

        {/* Responsibilities */}
        <SkeletonBlock className="mb-3 h-3 w-32" />
        <div className="mb-8 space-y-2.5">
          <SkeletonBlock className="h-2.5 w-[85%]" />
          <SkeletonBlock className="h-2.5 w-[92%]" />
          <SkeletonBlock className="h-2.5 w-[78%]" />
          <SkeletonBlock className="h-2.5 w-[88%]" />
        </div>

        {/* CTA */}
        <SkeletonBlock className="mb-8 h-11 w-47.5 rounded-lg opacity-60" />

        {/* Related careers */}
        <SkeletonBlock className="border-border mb-3 h-3 w-32 border-t pt-6" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <RelatedCareerCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
