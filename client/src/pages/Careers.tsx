import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Search, SearchX } from "lucide-react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useCareers } from "../hooks/useServer";
import { ErrorState } from "../components/ErrorState";
import { CareerCardSkeleton } from "../components/CareerCardSkeleton";
import { EmptyState } from "./EmptyState";

export const Careers = () => {
  const [search, setSearch] = useState<string>("");
  useDocumentTitle("Explore Careers");
  const { data: careers, isLoading, isError, refetch } = useCareers();

  const filteredCareers = careers?.filter((career) =>
    career.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <Navbar />
      <main className="bg-background rounded-2xl p-8">
        <h2 className="mb-1.5 text-2xl font-extrabold">Explore careers</h2>
        <p className="text-text-secondary mb-5 text-sm">
          Browse every career path we cover, or search for something specific.
        </p>

        <div className="bg-surface border-border mb-4 flex items-center gap-2 rounded-lg border px-4 py-3">
          <Search className="text-text-muted" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search careers..."
            className="placeholder:text-text-muted text-text-secondary w-full bg-transparent text-sm outline-none"
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search for any career"
          />
        </div>
        <h3 className="mb-3.5 text-[15px] font-bold">Career paths</h3>
        {isLoading ? (
          <div className="mt-7 grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-x-10 md:gap-y-10 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <CareerCardSkeleton key={item} />
            ))}
          </div>
        ) : isError ? (
          <ErrorState
            title="Couldn't load careers"
            message="Something went wrong while loading the career paths."
            onRetry={refetch}
          />
        ) : filteredCareers && filteredCareers.length > 0 ? (
          <div className="mt-7 grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-x-10 md:gap-y-10 lg:grid-cols-3">
            {filteredCareers.map((career) => (
              <article
                key={career.slug}
                className="bg-surface border-border flex h-full flex-col rounded-xl border p-4 transition-shadow hover:shadow-md"
              >
                <div className="bg-primary-soft mb-3 flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-lg">
                  <img
                    src={career.illustrationKey}
                    alt={career.name}
                    className="h-4/5 w-4/5 object-contain"
                  />
                </div>
                <h4 className="mb-1.5 text-sm font-bold">{career.name}</h4>
                <p className="text-text-secondary mb-3 flex-1 text-xs leading-6">
                  {career.shortDescription}
                </p>
                <Link
                  to={`${career.slug}`}
                  className="text-primary group flex items-center gap-1 text-xs font-bold"
                >
                  Explore
                  <ArrowRight
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={SearchX}
            title="No careers found"
            message="Try a different search term."
          />
        )}
      </main>
      <Footer />
    </div>
  );
};
