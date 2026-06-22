"use client";

import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * SSR-safe word reveal. The HTML renders fully visible so search snippets,
 * non-JS clients, and slow-hydration paths still see the heading. On mount,
 * we re-hide the per-word spans for one frame and then animate them in.
 */
export function WordReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.span
      className={cn("inline-block", className)}
      aria-label={text}
      initial={false}
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.06, delayChildren: delay },
        },
      }}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span
            aria-hidden
            className="inline-block overflow-hidden pb-[0.12em] align-bottom"
          >
            <motion.span
              initial={
                mounted ? { y: "110%", opacity: 0 } : { y: "0%", opacity: 1 }
              }
              variants={{
                hidden: { y: "110%", opacity: 0 },
                visible: {
                  y: "0%",
                  opacity: 1,
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="inline-block will-change-transform"
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </motion.span>
  );
}
