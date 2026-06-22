import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Prefix a public-asset path with the configured base path. Needed because
 * next/image does not add basePath to unoptimized images in a static export,
 * so on a GitHub project page (/portfolio) the raw "/subham.jpg" would 404.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH
  ? `/${process.env.NEXT_PUBLIC_BASE_PATH.replace(/^\/+|\/+$/g, "")}`
  : "";

export function assetPath(p: string): string {
  return `${BASE_PATH}${p.startsWith("/") ? p : `/${p}`}`;
}
