import type { MetadataRoute } from "next";
import { SITE } from "@/data/portfolio";

export const dynamic = "force-static";

// AI search/answer crawlers are explicitly named "allow" so the site is
// discoverable and citable by generative engines. OAI-SearchBot powers
// ChatGPT Search discovery (separate from GPTBot, which governs training).
const AI_AGENTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "OAI-SearchBot/1.0",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Googlebot",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "CCBot",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
