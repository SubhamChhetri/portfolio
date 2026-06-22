import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/site/motion-provider";
import { SITE, PROFILE } from "@/data/portfolio";
import { JsonLd } from "@/components/site/json-ld";
import { personLd, websiteLd } from "@/lib/jsonld";
import { assetPath } from "@/lib/utils";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = `${PROFILE.name} · Software Engineer & Freelance Full-Stack Developer`;
const description = `${PROFILE.name} is a software engineer and freelance full-stack & mobile developer (React, Next.js, React Native, Node.js, FastAPI). Available for freelance and remote projects in web, mobile, AI, IoT, and blockchain. Based in Thimphu, Bhutan — working worldwide.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: title,
    template: `%s · ${PROFILE.name}`,
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    siteName: PROFILE.name,
    locale: "en_US",
    type: "profile",
    url: SITE.url,
    images: [
      {
        url: "/subham.jpg",
        width: 1200,
        height: 1500,
        alt: `Portrait of ${PROFILE.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/subham.jpg"],
  },
  keywords: [
    PROFILE.name,
    "freelance software engineer",
    "freelance full-stack developer",
    "hire React Native developer",
    "freelance Next.js developer",
    "freelance mobile app developer",
    "freelance AI developer",
    "freelance blockchain developer",
    "remote software engineer Bhutan",
    "software engineer Bhutan",
    "React developer for hire",
    "Node.js developer",
    "DHI InnoTech",
  ],
  authors: [{ name: PROFILE.name }],
  // Declared explicitly (not via file convention) so the hrefs carry the base
  // path — Next doesn't prefix metadata icon URLs in a static export. The files
  // come from app/icon.svg and public/apple-icon.png.
  icons: {
    icon: [{ url: assetPath("/icon.svg"), type: "image/svg+xml" }],
    apple: assetPath("/apple-icon.png"),
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export const viewport: Viewport = {
  themeColor: "#111b3c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-dvh flex flex-col bg-bg text-ink">
        <JsonLd data={[personLd(), websiteLd()]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[500] focus:px-3 focus:py-2 focus:bg-ink focus:text-bg focus:rounded-sm"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
