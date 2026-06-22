"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { NAV, NAV_CTA } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [headerH, setHeaderH] = useState(64);
  const headerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () => setHeaderH(el.getBoundingClientRect().height);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close the mobile sheet on navigation.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-[100] bg-bg/85 backdrop-blur-md transition-[box-shadow,border-color] duration-200",
        scrolled ? "border-b border-border" : "border-b border-transparent"
      )}
    >
      <div className="container-page flex items-center justify-between h-16">
        <Logo bar={pathname === "/" ? "active" : "none"} />

        <nav aria-label="Primary" className="hidden md:flex items-center">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex items-center px-4 h-16 text-[14px] font-medium transition-colors",
                  active ? "text-brand" : "text-ink hover:text-brand"
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active-bar"
                    className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center">
          <Link
            href={NAV_CTA.href}
            aria-current={isActive(NAV_CTA.href) ? "page" : undefined}
            className={cn(
              "inline-flex items-center justify-center h-9 px-4 rounded-sm text-[14px] font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
              isActive(NAV_CTA.href)
                ? "bg-brand hover:bg-brand-hover"
                : "bg-ink hover:bg-brand"
            )}
          >
            {NAV_CTA.label}
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 text-ink"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>

      {mobileOpen && (
        <div
          id="mobile-nav"
          style={{ top: headerH, height: `calc(100dvh - ${headerH}px)` }}
          className="md:hidden border-t border-border bg-bg fixed inset-x-0 z-[90] overflow-y-auto overscroll-contain"
        >
          <div className="container-page py-8 flex flex-col gap-1">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 py-3 text-[20px] font-medium border-b border-border transition-colors",
                    active ? "text-brand" : "text-ink"
                  )}
                >
                  <span
                    className={cn(
                      "h-5 w-[3px] rounded-full transition-colors",
                      active ? "bg-accent" : "bg-transparent"
                    )}
                    aria-hidden
                  />
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={NAV_CTA.href}
              className="mt-6 inline-flex items-center justify-center text-[15px] font-semibold text-white bg-ink px-4 py-3 rounded-sm hover:bg-brand transition-colors"
            >
              {NAV_CTA.label}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
