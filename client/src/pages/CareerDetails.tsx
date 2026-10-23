import { ArrowLeft, SearchX } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useCareer, useRelatedCareers } from "../hooks/useServer";
import { ErrorState } from "../components/ErrorState";
import { EmptyState } from "./EmptyState";
import { CareerDetailSkeleton } from "../components/CareerDetailSkeleton";
import axios from "axios";

export const CareerDetails = () => {
  const { slug } = useParams();
  const [isSelected, setIsSelected] = useState<string>("Overview");

  const headings = [
    "Overview",
    "Skills",
    "Responsibilities",
    "Related Careers",
  ];
  const {
    data: career,
    isLoading,
    isError,
    error,
    refetch,
  } = useCareer(slug as string);

  const isCareerNotFound =
    axios.isAxiosError(error) && error.response?.status === 404;

  const { data: relatedCareers } = useRelatedCareers(
    career?.relatedCareers ?? [],
  );
  console.log(relatedCareers);

  return (
    <>
      <Navbar />
      <main className="bg-background mx-auto min-h-screen max-w-5xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <Link
          to="/careers"

          className="text-text-secondary mb-5 flex items-center gap-1 text-[13px] font-semibold"
        >
          <ArrowLeft aria-hidden="true" className="text-[13px]" />
          Back to careers
        </Link>
        {isLoading ? (
          <CareerDetailSkeleton />
        ) : isCareerNotFound ? (
          <EmptyState
            icon={SearchX}
            title="Career not found"
            message="The career you're looking for doesn't exist."
          />
        ) : isError ? (
          <ErrorState
            title="Couldn't get the career"
            message="Something went wrong while loading the career details."
            onRetry={refetch}
          />
        ) : career && career.skills.length > 0 ? (
          <>
            <div className="bg-primary-soft mb-6 flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl">
              <img
                src={career.illustrationKey}
                alt={career.name}
                className="h-4/5 w-4/5 object-contain"
              />
            </div>

            <h1 className="mb-4.5 text-[25px] font-extrabold">{career.name}</h1>

            <div className="border-border mb-6 flex gap-1 overflow-x-auto border-b">
              {headings.map((heading) => (
                <a
                  key={heading}
                  href={`#${heading.toLowerCase().split(" ").join("-")}`}
                  className={`${heading === isSelected ? "text-primary border-primary border-b-2 font-bold" : "text-text-muted font-semibold"} px-3.5 py-2.5 text-[13px] whitespace-nowrap`}
                  onClick={() => setIsSelected(heading)}
                >
                  {heading}
                </a>
              ))}
            </div>

            <h3
              id="overview"
              className="mb-2.5 scroll-mt-24 text-[15px] font-bold"
            >
              Overview
            </h3>
            <p className="text-text-secondary mb-7 text-sm leading-7">
              {career.description}
            </p>

            <h3 id="skills" className="mb-3 scroll-mt-24 text-[15px] font-bold">
              Skills
            </h3>
            <div className="mb-7 flex flex-wrap gap-2">
              {career.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-surface border-border rounded-lg border px-3 py-1.5 text-xs font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>

            <h3
              id="responsibilities"
              className="mb-3 scroll-mt-24 text-[15px] font-bold"
            >
              Responsibilities
            </h3>
            <div className="mb-7 flex flex-col gap-2.5">
              {career.responsibilities.map((responsibility) => (
                <div key={responsibility} className="flex items-start gap-2.5">
                  <span className="bg-primary mt-1.75 size-1.5 shrink-0 rounded-full" />
                  <span className="text-text-secondary text-[13px] leading-6">
                    {responsibility}
                  </span>
                </div>
              ))}
            </div>

            <h3
              id="related-careers"
              className="border-border mb-3 scroll-mt-24 border-t pt-6 text-[15px] font-bold"
            >
              Related careers
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {relatedCareers?.map((relatedCareer) => (
                <Link
                  key={relatedCareer.slug}
                  to={`/careers/${relatedCareer.slug}`}
                  className="bg-surface border-border flex min-w-0 flex-col rounded-xl border p-3 transition-shadow hover:shadow-md"
                >
                  <div className="bg-primary-soft mb-3 flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-lg">
                    <img
                      src={relatedCareer.illustrationKey}
                      alt={relatedCareer.name}
                      className="h-4/5 w-4/5 object-contain"
                      loading="lazy"
                    />
                  </div>

                  <span className="text-center text-xs leading-5 font-bold">
                    {relatedCareer.name}
                  </span>
                </Link>
              ))}
            </div>
          </>
        ) : null}
      </main>
      <Footer />
    </>
  );
};
