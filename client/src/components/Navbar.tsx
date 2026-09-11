import { Link } from "react-router";
import logo from "../assets/logo.svg";
export const Navbar = () => {
  return (
    <nav className="bg-surface/50 sticky top-0 z-50 flex items-center justify-between px-4 py-3 shadow-xs backdrop-blur-xl md:px-8">
      <Link to="/" className="flex items-center gap-0.5 md:gap-2">
        <img src={logo} alt="PathFinder Logo" className="size-6 md:size-8" />
        <p className="font-extrabold md:text-xl lg:text-2xl">PathFinder</p>
      </Link>
      <div className="flex items-center gap-6 text-[13px] font-semibold">
        <Link
          to="/careers"
          className="text-text-secondary hover:text-text-primary cursor-pointer"
        >
          Careers
        </Link>
        <Link
          to="/assessment"
          className="bg-primary hover:bg-primary-hover cursor-pointer rounded-lg p-2 text-pretty text-white md:px-4 md:py-2.25"
        >
          Take the assessment
        </Link>
      </div>
    </nav>
  );
};
