import { Link } from "react-router";
import logo from "../assets/logo.svg";
export const Navbar = () => {
  return (
    <nav className="bg-surface/50 sticky top-0 z-50 flex items-center justify-between px-4 py-3 shadow-xs backdrop-blur-xl md:px-8">
      <Link
        to="/"
        className="focus-visible:ring-primary flex items-center gap-0.5 outline-0 focus-visible:ring-1 focus-visible:ring-offset-2 md:gap-2"
      >
        <img src={logo} alt="PathFinder Logo" className="size-6 md:size-8" />
        <p className="font-extrabold md:text-xl lg:text-2xl">PathFinder</p>
      </Link>
      <div className="flex items-center gap-6 text-[13px] font-semibold">
        <Link
          to="careers"
          className="text-text-secondary focus-visible:ring-primary hover:text-text-primary outline-0 focus-visible:ring-2 focus-visible:ring-offset-1"
        >
          Careers
        </Link>
        <Link
          to="assessment"
          className="bg-primary focus-visible:ring-primary hover:bg-primary-hover text-surface rounded-lg p-2 text-pretty outline-0 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-1 md:px-4 md:py-2.25"
        >
          Take the assessment
        </Link>
      </div>
    </nav>
  );
};
