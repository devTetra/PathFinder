function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-border animate-pulse rounded-md ${className}`}
      aria-hidden="true"
    />
  );
}

export function CareerCardSkeleton() {
  return (
    <article className="bg-surface border-border flex h-full flex-col rounded-xl border p-4">
      <SkeletonBlock className="mb-3 aspect-4/3 w-full rounded-lg" />

      <SkeletonBlock className="mb-2.5 h-4 w-2/3" />

      <div className="mb-4 space-y-1.5">
        <SkeletonBlock className="h-2.5 w-full" />
        <SkeletonBlock className="h-2.5 w-full" />
        <SkeletonBlock className="h-2.5 w-4/5" />
      </div>

      <SkeletonBlock className="h-3 w-1/2 opacity-70" />
    </article>
  );
}
