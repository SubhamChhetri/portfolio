import { cn } from "@/lib/utils";

/**
 * Hero block at the top of an inner page. Matches the homepage tone:
 * mono eyebrow, large balanced headline with optional italic accent,
 * generous lede, and an optional meta row.
 */
export function PageHeader({
  eyebrow,
  title,
  italic,
  lede,
  meta,
  className,
}: {
  eyebrow?: string;
  title: string;
  italic?: string;
  lede?: string;
  meta?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("container-page pt-14 sm:pt-20 lg:pt-24 pb-12 sm:pb-14", className)}>
      {eyebrow && (
        <div className="flex items-center gap-2 mono-label text-muted-strong">
          <span className="inline-block size-1.5 rounded-full bg-accent" aria-hidden />
          {eyebrow}
        </div>
      )}
      <h1
        className={cn(
          "font-semibold tracking-[-0.035em] leading-none text-ink text-[clamp(2.25rem,4.4vw+0.5rem,3.75rem)] max-w-[22ch]",
          eyebrow ? "mt-6" : "mt-0"
        )}
      >
        {title}
        {italic && (
          <>
            {" "}
            <span className="text-muted-strong font-normal italic">{italic}</span>
          </>
        )}
      </h1>
      {lede && (
        <p className="mt-6 text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed text-muted-strong max-w-[58ch]">
          {lede}
        </p>
      )}
      {meta && <div className="mt-8">{meta}</div>}
    </header>
  );
}
