"use client";

import { MotionConfig } from "framer-motion";

/**
 * Wraps the app in a MotionConfig that honours the user's
 * prefers-reduced-motion setting. Framer Motion ignores the CSS-level
 * reduced-motion media query unless told via this provider.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
