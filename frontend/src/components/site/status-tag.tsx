import { cn } from "@/lib/utils";
import { STATUS_LABEL, type ProjectStatus } from "@/data/portfolio";

const STYLES: Record<ProjectStatus, string> = {
  live: "bg-ink text-accent",
  "in-development": "bg-brand text-bg",
  completed: "bg-accent-soft text-ink",
  research: "bg-border text-muted-strong",
};

export function StatusTag({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] px-2 py-[3px] rounded-sm",
        STYLES[status],
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" aria-hidden />
      {STATUS_LABEL[status]}
    </span>
  );
}
