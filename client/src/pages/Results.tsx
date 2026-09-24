import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Link as LinkIcon,
  RefreshCcw,
} from "lucide-react";

import type { RIASEC } from "../types";
import { useResult } from "../hooks/useServer";
import { Spinner } from "../components/Spinner";
import { ErrorState } from "../components/ErrorState";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { ResultsSkeleton } from "../components/ResultSkeleton";

export const Results = () => {
  const { resultId } = useParams();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showAllMatches, setShowAllMatches] = useState<boolean>(false);
  const meanings: Record<RIASEC, { name: string; description: string }> = {
    R: {
      name: "Realistic",
      description: "Practical, hands-on work",
    },
    I: {
      name: "Investigative",
      description: "Research & problem-solving",
    },
    A: {
      name: "Artistic",
      description: "Creativity & expression",
    },
    S: {
      name: "Social",
      description: "Helping & working with people",
    },
    E: {
      name: "Enterprising",
      description: "Leadership & initiative",
    },
    C: {
      name: "Conventional",
      description: "Organization & structure",
    },
  };

  const handleCopy = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error(`Failed to copy text: ${error}`);
    }
  };

  const {
    data: result,
    isError,
    isLoading,
    refetch,
  } = useResult(resultId as string);

  useDocumentTitle("Your Assessment Results");

  if (isLoading) return <ResultsSkeleton />;
  if (isError || !result)
    return (
      <ErrorState
        title="Couldn't load your result"
        message="Something went wrong while retrieving your assessment result."
        onRetry={refetch}
      />
    );

  const topCareer = result.careerMatches[0];

  const otherMatches = result.careerMatches.slice(1, 5);
  const initialMatches = otherMatches.slice(0, 2);
  const additionalMatches = otherMatches.slice(2, 4);

  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="bg-surface rounded-2xl p-5 shadow-sm sm:p-8 lg:p-10">
          <header className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 space-y-1">
                <h1 className="text-primary-text text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Your Results
                </h1>

                <p className="text-text-secondary max-w-xl text-sm leading-6">
                  Here's what your assessment suggests about your interests.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleCopy(`localhost:5173/results/${result.resultId}`)
                }
                aria-label={isCopied ? "Link copied" : "Copy results link"}
                className="border-border bg-surface text-primary-text hover:border-primary/30 hover:bg-background flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border p-2.5 text-xs font-bold transition-colors duration-200 sm:px-3.5 sm:py-2.5"
              >
                {isCopied ? (
                  <Check aria-hidden="true" className="text-primary size-4" />
                ) : (
                  <LinkIcon
                    aria-hidden="true"
                    className="text-primary size-4"
                  />
                )}

                <span className="hidden sm:inline">
                  {isCopied ? "Link copied!" : "Copy link"}
                </span>
              </button>
            </div>
          </header>

          <div className="mt-10 space-y-10">
            <section className="space-y-5">
              <div className="space-y-1.5">
                <h2 className="text-primary-text text-xs font-bold tracking-[0.08em] uppercase">
                  Your RIASEC profile
                </h2>

                <p className="text-text-muted text-sm leading-5">
                  A widely-used model of the six interest areas that shape
                  career fit.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
                {Object.entries(result.scores)
                  .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
                  .map(([riasec, score]) => {
                    const dimension = riasec as RIASEC;
                    const meaning = meanings[dimension];

                    return (
                      <div key={dimension} className="space-y-2.5">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex min-w-0 items-center gap-2.5">
                            <span className="bg-primary/10 text-primary flex size-7 shrink-0 items-center justify-center rounded-md text-xs font-extrabold">
                              {dimension}
                            </span>

                            <div className="min-w-0">
                              <p className="text-primary-text text-sm font-bold">
                                {meaning.name}
                              </p>

                              <p className="text-text-muted text-xs">
                                {meaning.description}
                              </p>
                            </div>
                          </div>

                          <span className="text-primary shrink-0 text-sm font-extrabold">
                            {score}%
                          </span>
                        </div>

                        <div className="bg-border/70 h-2 overflow-hidden rounded-full">
                          <div
                            className="bg-primary h-full rounded-full transition-[width] duration-500"
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-primary-text text-xs font-bold tracking-[0.08em] uppercase">
                Your top career match
              </h2>

              <article className="border-border overflow-hidden rounded-2xl border">
                <div className="bg-primary/5 flex min-h-40 items-center justify-center px-6 py-6 sm:min-h-48">
                  <img
                    src={topCareer.career.illustrationKey}
                    alt={topCareer.career.name}
                    className="h-36 w-auto max-w-[75%] object-contain sm:h-44"
                  />
                </div>

                <div className="bg-surface space-y-5 p-5 sm:p-7">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="text-primary-text text-xl font-extrabold tracking-tight">
                      {topCareer.career.name}
                    </h3>

                    <span className="bg-primary/10 text-primary w-fit shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold">
                      {topCareer.fit}% match
                    </span>
                  </div>

                  <p className="text-text-secondary max-w-3xl text-sm leading-6">
                    {topCareer.career.description}
                  </p>

                  <Link
                    to={`/career/${topCareer.career.slug}`}
                    className="bg-primary hover:bg-primary-dark group inline-flex w-fit items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    View career details
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </article>
            </section>

            {otherMatches.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-end justify-between gap-4">
                  <h2 className="text-primary-text text-xs font-bold tracking-[0.08em] uppercase">
                    Other career matches
                  </h2>

                  <span className="text-text-muted text-xs">
                    {otherMatches.length} matches
                  </span>
                </div>

                <div className="space-y-2">
                  {initialMatches.map((careerMatch) => (
                    <Link
                      key={careerMatch.career.slug}
                      to={`/career/${careerMatch.career.slug}`}
                      className="border-border bg-surface hover:border-primary/30 group flex items-center justify-between gap-4 rounded-xl border px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm sm:px-5"
                    >
                      <h3 className="text-primary-text text-sm font-semibold">
                        {careerMatch.career.name}
                      </h3>

                      <div className="flex shrink-0 items-center gap-2">
                        <span className="text-primary text-xs font-bold sm:text-sm">
                          {careerMatch.fit}% match
                        </span>

                        <ChevronRight
                          aria-hidden="true"
                          className="text-text-muted group-hover:text-primary size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </div>
                    </Link>
                  ))}

                  {/* Expandable matches */}
                  {additionalMatches.length > 0 && (
                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                        showAllMatches ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="space-y-2 pt-2">
                          {additionalMatches.map((careerMatch) => (
                            <Link
                              key={careerMatch.career.slug}
                              to={`/career/${careerMatch.career.slug}`}
                              className="border-border bg-surface hover:border-primary/30 group flex items-center justify-between gap-4 rounded-xl border px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm sm:px-5"
                            >
                              <h3 className="text-primary-text text-sm font-semibold">
                                {careerMatch.career.name}
                              </h3>

                              <div className="flex shrink-0 items-center gap-2">
                                <span className="text-primary text-xs font-bold sm:text-sm">
                                  {careerMatch.fit}% match
                                </span>

                                <ChevronRight
                                  aria-hidden="true"
                                  className="text-text-muted group-hover:text-primary size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                                />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-1 text-center">
                  <button
                    type="button"
                    onClick={() => setShowAllMatches((current) => !current)}
                    className="text-primary hover:text-primary-dark group inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold transition-colors duration-200"
                  >
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-4 transition-transform duration-300 ${
                        showAllMatches ? "rotate-180" : ""
                      }`}
                    />

                    {showAllMatches
                      ? "Show fewer matches"
                      : "Show 2 more matches"}
                  </button>
                </div>
              </section>
            )}

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
};
