import { RefreshCcw } from "lucide-react";
import { Link } from "react-router";

function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-border animate-pulse rounded-md ${className}`}
      aria-hidden="true"
    />
  );
}

function RiasecRowSkeleton() {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <SkeletonBlock className="size-7 shrink-0 rounded-md" />

          <div className="min-w-0 flex-1 space-y-1.5">
            <SkeletonBlock className="h-3.5 w-24" />
            <SkeletonBlock className="h-3 w-32" />
          </div>
        </div>

        <SkeletonBlock className="h-3.5 w-8 shrink-0" />
      </div>

      <SkeletonBlock className="h-2 w-full rounded-full" />
    </div>
  );
}

function OtherMatchRowSkeleton() {
  return (
    <div className="border-border bg-surface flex items-center justify-between gap-4 rounded-xl border px-4 py-4 sm:px-5">
      <SkeletonBlock className="h-3.5 w-32" />

      <div className="flex shrink-0 items-center gap-2">
        <SkeletonBlock className="h-3.5 w-14" />
        <SkeletonBlock className="size-4 rounded-full" />
      </div>
    </div>
  );
}

export function ResultsSkeleton() {
  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="bg-surface rounded-2xl p-5 shadow-sm sm:p-8 lg:p-10">
          <header className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1 space-y-2">
                <SkeletonBlock className="h-7 w-40 sm:h-8" />
                <SkeletonBlock className="h-4 w-64 max-w-full" />
              </div>

              <SkeletonBlock className="h-9 w-9 shrink-0 rounded-lg sm:h-10 sm:w-28" />
            </div>
          </header>

          <div className="mt-10 space-y-10">
            {/* RIASEC profile */}
            <section className="space-y-5">
              <div className="space-y-1.5">
                <SkeletonBlock className="h-3 w-40" />
                <SkeletonBlock className="h-4 w-72 max-w-full" />
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <RiasecRowSkeleton key={i} />
                ))}
              </div>
            </section>

            {/* Top career match */}
            <section className="space-y-4">
              <SkeletonBlock className="h-3 w-32" />

              <article className="border-border overflow-hidden rounded-2xl border">
                <div className="bg-primary/5 flex min-h-40 items-center justify-center px-6 py-6 sm:min-h-48">
                  <SkeletonBlock className="h-36 w-36 rounded-xl bg-white/40 sm:h-44 sm:w-44" />
                </div>

                <div className="bg-surface space-y-5 p-5 sm:p-7">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <SkeletonBlock className="h-6 w-40" />
                    <SkeletonBlock className="h-6 w-24 rounded-lg" />
                  </div>

                  <div className="space-y-2">
                    <SkeletonBlock className="h-3.5 w-full max-w-2xl" />
                    <SkeletonBlock className="h-3.5 w-2/3 max-w-md" />
                  </div>

                  <SkeletonBlock className="h-10 w-44 rounded-lg" />
                </div>
              </article>
            </section>

            {/* Other career matches */}
            <section className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <SkeletonBlock className="h-3 w-36" />
                <SkeletonBlock className="h-3 w-16" />
              </div>

              <div className="space-y-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <OtherMatchRowSkeleton key={i} />
                ))}
              </div>
            </section>

            {/* Retake Assessment — real, not skeleton */}
            <section className="border-border border-t pt-8 text-center">
              <div className="mx-auto max-w-md space-y-4">
                <p className="text-text-muted text-sm leading-5">
                  Want to see how a different set of answers changes your
                  matches?
                </p>

                <Link
                  to="/assessment"
                  className="bg-primary hover:bg-primary-dark group inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <RefreshCcw
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:rotate-90"
                  />
                  Retake Assessment
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
