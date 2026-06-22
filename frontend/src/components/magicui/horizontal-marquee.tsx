"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HorizontalMarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  speed?: number;
  className?: string;
  fade?: boolean;
}

export function HorizontalMarquee({
  children,
  pauseOnHover = true,
  reverse = false,
  speed = 40,
  className,
  fade = true,
}: HorizontalMarqueeProps) {
  return (
    <div
      className={cn("group relative flex overflow-hidden", className)}
      style={
        {
          "--marquee-duration": `${speed}s`,
          maskImage: fade
            ? "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
            : undefined,
          WebkitMaskImage: fade
            ? "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
            : undefined,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex shrink-0 [animation:marquee-x_var(--marquee-duration)_linear_infinite]",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          "flex shrink-0 [animation:marquee-x_var(--marquee-duration)_linear_infinite]",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
    </div>
  );
}
