"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { WordReveal } from "@/components/magicui/word-reveal";
import { PROFILE, SOCIALS } from "@/data/portfolio";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page pt-14 sm:pt-20 lg:pt-24 pb-16 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="flex items-center gap-2 mono-label text-muted-strong"
        >
          <span className="inline-block size-1.5 rounded-full bg-accent" aria-hidden />
          {PROFILE.role} · {PROFILE.location}
        </motion.div>

        <div className="mt-7 grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-10 lg:gap-16 items-center">
          <div>
            <h1 className="font-semibold tracking-[-0.035em] leading-[1.04] text-ink text-[clamp(2.4rem,5vw+0.5rem,4.25rem)]">
              <WordReveal text={`${PROFILE.taglineLead}`} className="block" />
              <span className="relative inline-block">
                <WordReveal
                  text={PROFILE.taglineItalic}
                  delay={0.5}
                  className="block italic font-normal"
                />
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 1.15, ease: easeOut }}
                  className="absolute -bottom-1 left-0 right-0 h-[6px] bg-accent origin-left opacity-90"
                  style={{ zIndex: -1 }}
                />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: easeOut }}
              className="mt-7 text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed text-muted-strong max-w-[52ch]"
            >
              {PROFILE.heroLede}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1, ease: easeOut }}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[14.5px]"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-1 text-ink under-link font-medium"
              >
                View projects
                <ArrowUpRight size={14} className="opacity-60" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-ink under-link font-medium"
              >
                Get in touch
                <ArrowUpRight size={14} className="opacity-60" />
              </Link>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-ink under-link font-medium"
                >
                  {s.label}
                  <ArrowUpRight size={14} className="opacity-60" />
                </a>
              ))}
            </motion.div>
          </div>

          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: easeOut }}
            className="relative mx-auto w-full max-w-[22rem] lg:max-w-none"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-2">
              <Image
                src="/subham.jpg"
                alt={`Portrait of ${PROFILE.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 28vw, 80vw"
                className="object-cover"
              />
            </div>
            <div
              aria-hidden
              className="absolute -bottom-2 -left-2 h-16 w-16 border-b-2 border-l-2 border-accent rounded-bl-lg"
            />
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
