"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PROFILE } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/**
 * Wordmark. `bar` controls the gold underline:
 * - "active": the shared sliding active-indicator (used in the header on Home).
 * - "static": a fixed decorative underline (used in the footer).
 * - "none":   no underline.
 */
export function Logo({
  className,
  tone = "ink",
  bar = "static",
}: {
  className?: string;
  tone?: "ink" | "bg";
  bar?: "active" | "static" | "none";
}) {
  return (
    <Link
      href="/"
      aria-label={`${PROFILE.name} — home`}
      className={cn(
        "group inline-flex items-baseline gap-2 font-semibold tracking-[-0.02em]",
        tone === "ink" ? "text-ink" : "text-bg",
        className
      )}
    >
      <span className="relative text-[1.0625rem] leading-none">
        {PROFILE.name}
        {bar === "active" && (
          <motion.span
            layoutId="nav-active-bar"
            aria-hidden
            className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-accent"
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
          />
        )}
        {bar === "static" && (
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-accent opacity-90"
          />
        )}
      </span>
    </Link>
  );
}
