import { ArrowRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import hero from "../assets/undraw_choose_5kz4.svg";
import { Link } from "react-router";
import { Footer } from "../components/Footer";

export const Landing = () => {
  return (
    <div>
      <Navbar />

      <main className="bg-background flex min-h-[calc(100vh-7rem)] justify-center p-6 not-md:items-center md:items-start md:p-12 md:pt-20">
        <section className="grid gap-y-20 lg:grid-cols-2">
          <div className="flex items-center justify-center px-3 lg:order-last">
            <img src={hero} alt="" className="w-3/4 max-w-lg" />
          </div>
          <div className="flex max-w-xl flex-col items-start gap-6">
            <p className="bg-accent-soft text-text-accent rounded-xl px-3 py-1 text-xs font-semibold">
              Free • No account needed
            </p>
            <h1 className="text-text-primary text-4xl/9 font-extrabold">
              Find the career direction that actually fits you
            </h1>
            <p className="text-text-secondary leading-7 text-pretty">
              Answer a short set of questions about your interests and how you
              work. Get personalized career matches and understand why each path
              may be a good fit.
            </p>
            <div className="flex flex-col items-center gap-3 self-center md:flex-row lg:self-auto">
              <Link
                to=""
                className="bg-primary hover:bg-primary-hover flex cursor-pointer items-center gap-1.5 rounded-lg px-5 py-3 text-[14px] font-bold text-white"
              >
                <p>Start the assessment</p>
                <ArrowRight aria-hidden="true" />
              </Link>
              <p className="text-text-muted text-xs md:text-sm">
                Takes about 8 minutes
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
