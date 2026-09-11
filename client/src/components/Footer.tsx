import logo from "../assets/logo.svg";

export const Footer = () => {
  const year = new Date(Date.now()).getFullYear();

  return (
    <footer className="bg-footer flex flex-col items-center justify-between gap-4 p-5 md:flex-row md:gap-0 md:px-8 md:py-4">
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-1">
          <img src={logo} alt="PathFinder Logo" className="size-6" />
          <p className="font-bold text-white">PathFinder</p>
        </div>
        <div className="h-4 border-[0.5px] border-white/60" />
        <p className="text-xs font-extralight text-white/80 md:text-[13px]">
          Find the career direction that fits you.
        </p>
      </div>

      <p className="text-xs text-white/50">
        © {year} PathFinder. All rights reserved
      </p>
    </footer>
  );
};
