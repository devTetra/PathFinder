import { TriangleAlert } from "lucide-react";

export const ErrorState = ({
  title,
  message,
  onRetry,
}: {
  title: string;
  message: string;
  onRetry: () => void;
}) => {
  return (
    <div className="flex min-h-80 flex-1 flex-col items-center rounded-2xl p-7 text-center">
      <div className="bg-error-soft mb-3.5 flex size-12 items-center justify-center rounded-xl">
        <TriangleAlert className="text-error text-2xl" aria-hidden="true" />
      </div>
      <h1 className="text- mb-1 text-lg font-bold">{title}</h1>
      <p className="text-text-secondary mb-3.5 font-medium">{message}</p>
      <button
        className="border-border hover:border-primary hover:bg-primary-soft focus-visible:ring-primary bg-surface text-text-primary inline-flex cursor-pointer items-center justify-center rounded-lg border-[1.5px] px-4 py-2 text-sm font-semibold outline-0 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-1"
        type="button"
        onClick={onRetry}
      >
        Try again
      </button>
    </div>
  );
};
