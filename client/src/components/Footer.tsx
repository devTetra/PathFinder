import logo from "../assets/logo.svg";

export const Footer = () => {
  const year = new Date(Date.now()).getFullYear();

  return (
    <footer className="bg-footer flex flex-col items-center justify-between gap-4 p-5 md:flex-row md:gap-0 md:px-8 md:py-4">
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-1">
          <img src={logo} alt="PathFinder Logo" className="size-6" />
          <p className="text-surface font-bold">PathFinder</p>
        </div>
        <div className="border-surface/60 h-4 border-[0.5px]" />
        <p className="text-surface/80 text-xs font-extralight md:text-[13px]">
          Find the career direction that fits you.
        </p>
      </div>

      <p className="text-surface/50 text-xs">
        © {year} PathFinder. All rights reserved
      </p>
    </footer>
  );
};
