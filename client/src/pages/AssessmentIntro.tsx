import { ChartNetwork, Goal, ListChecks } from "lucide-react";
import { Link } from "react-router";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import logo from "../assets/logo.svg";

export const AssessmentIntro = () => {
  useDocumentTitle("Find Your Fit");
  return (
    <main className="from-primary-soft via-background flex min-h-screen items-center justify-center bg-linear-135 to-[#FDF6E3] px-4 py-8">
      <section className="bg-surface border-border shadow-text-primary/10 w-[calc(100%-2rem)] max-w-md rounded-2xl border p-6 shadow-[0px_16px_48px] sm:p-8">
        <div className="mb-6 flex items-center justify-center gap-2">
          {/* <div className="bg-primary flex size-8 items-center justify-center rounded-lg"> */}
          {/* logo/icon */}

          {/* </div> */}
          <img src={logo} alt="PathFinder Logo" className="size-8" />

          <span className="text-lg font-bold">PathFinder</span>
        </div>
        <h1 className="mb-2 text-center text-[20px] font-extrabold">
          Let's find your fit
        </h1>
        <p className="text-text-secondary mb-5 text-center text-[13px] leading-6">
          Answer honestly — there are no right or wrong answers, just what feels
          true to you.
        </p>
        <ul className="mb-6 flex flex-col gap-2.5">
          <li className="flex items-center gap-2.5">
            <ListChecks
              className="text-primary mt-0.5 text-base"
              aria-hidden="true"
            />

            <p className="text-[13px] font-medium">20 short questions</p>
          </li>
          <li className="flex items-center gap-2.5">
            <ChartNetwork
              className="text-primary mt-0.5 text-base"
              aria-hidden="true"
            />
            <p className="text-[13px] font-medium">
              A personalized career profile
            </p>
          </li>
          <li className="flex items-center gap-2.5">
            <Goal
              className="text-primary mt-0.5 text-base"
              aria-hidden="true"
            />

            <p className="text-[13px] font-medium">
              Career matches, with reasons why
            </p>
          </li>
        </ul>
        <Link
          to="/assessment"
          className="bg-primary hover:bg-primary-hover focus-visible:ring-primary block w-full rounded-lg p-3 text-center text-sm font-bold text-white outline-0 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-1"
        >
          Start
        </Link>
      </section>
    </main>
  );
};
