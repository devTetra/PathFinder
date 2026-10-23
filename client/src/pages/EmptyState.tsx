import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  message: string;
}

export const EmptyState = ({ icon: Icon, title, message }: EmptyStateProps) => {
  return (
    <div className="border-border bg-surface flex flex-col items-center rounded-2xl border px-7 py-8 text-center">
      <div className="bg-primary-soft mb-3.5 flex h-12 w-12 items-center justify-center rounded-xl">
        <Icon className="text-text-muted h-6 w-6" aria-hidden="true" />
      </div>

      <h3 className="text-primary-text mb-1 text-sm font-bold">{title}</h3>

      <p className="text-text-secondary text-xs leading-5">{message}</p>
    </div>
  );
};
