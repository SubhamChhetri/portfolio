import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 *
 * `next build` writes a fully static site to `out/`. There is no Node server in
 * production, so image optimization is disabled and custom headers are dropped
 * (GitHub Pages can't set them anyway).
 *
 * basePath: for a GitHub *project* page (https://<user>.github.io/<repo>/) set
 *   NEXT_PUBLIC_BASE_PATH=/<repo>  before building.
 * For a custom domain or user site served at the root, leave it unset.
 */
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const basePath = rawBasePath ? `/${rawBasePath.replace(/^\/|\/$/g, "")}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
