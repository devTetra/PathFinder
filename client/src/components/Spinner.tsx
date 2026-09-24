export const Spinner = ({ isLoading }: { isLoading: boolean }) => {
  if (isLoading) {
    return (
      <div
        role="status"
        aria-label="loading"
        className="bg-primary/10 fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm"
      >
        <div className="border-primary border-t-primary/20 size-20 animate-spin rounded-full border-7" />
      </div>
    );
  }
};
