export const QuestionSkeleton = () => {
  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <div className="skeleton bg-border h-2 w-22.5 rounded opacity-[0.7]" />
        <div className="skeleton bg-border h-3 w-7 rounded opacity-[0.7]" />
      </div>
      <div className="skeleton bg-border mb-2 h-1.5 rounded opacity-[0.5]" />
      <div className="skeleton bg-border h-3.5 w-9/10 rounded opacity-[0.7] md:mb-2" />
      <div className="skeleton bg-border mb-6 h-3.5 w-3/5 rounded opacity-[0.7] md:hidden" />
      <div className="flex flex-col gap-2.5">
        {[1, 2, 3, 4, 5].map((option) => (
          <div
            key={option}
            className="bg-background border-border flex items-center gap-3 rounded-lg border-[1.5px] p-3.5"
          >
            <span className="skeleton bg-border size-4.5 shrink-0 rounded-full opacity-[0.6]" />
            <div className="skeleton bg-border h-3 w-9/10 rounded opacity-[0.5]" />
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="skeleton bg-border h-3.5 w-17.5 rounded opacity-[0.5]" />
        <div className="skeleton bg-border h-10 w-22.5 rounded-lg opacity-[0.6]" />
      </div>
    </>
  );
};
