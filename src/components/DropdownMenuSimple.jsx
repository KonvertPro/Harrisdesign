import React, { useEffect, useState } from "react";

export default function DropdownMenuSimple() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { label: "For Startups", href: "#services" },
    { label: "For Portfolios", href: "#work" },
    { label: "Case Studies", href: "#work" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#cta" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-white/85 supports-[backdrop-filter]:bg-white/70 backdrop-blur border-b border-neutral-200 shadow-sm"
          : "bg-white/60 supports-[backdrop-filter]:bg-white/40 backdrop-blur"
      }`}
    >
      <div className="px-6 py-4 max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <a href="#top" className="text-2xl font-bold tracking-tight select-none">
          <span className="text-neutral-900">Desing</span>
          <span className="text-neutral-600">Logo</span>
        </a>

        {/* Desktop links ≥1000px */}
        <div className="hidden min-[1000px]:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#cta"
            className="ml-2 inline-flex items-center justify-center px-4 py-2 bg-violet-600 hover:bg-neutral-700 text-white rounded-lg font-medium shadow-soft transition-all"
          >
            Get Started
          </a>
        </div>

        {/* Mobile actions <1000px */}
        <div className="flex items-center gap-3 min-[1000px]:hidden">
          <button
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMobileOpen((v) => !v)}
            className="p-2 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            {/* Burger / Close icon */}
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileOpen ? (
                <g>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </g>
              ) : (
                <g>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </g>
              )}
            </svg>
          </button>
          <a
            href="#cta"
            className="inline-flex items-center justify-center px-3 py-2 bg-violet-600 hover:bg-neutral-700 text-white rounded-lg font-medium shadow-soft transition-all"
          >
            Get Started
          </a>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        id="mobile-nav-panel"
        className={`min-[1000px]:hidden overflow-hidden transition-[max-height,opacity] duration-400 ease-in-out ${
          mobileOpen
            ? "max-h-96 opacity-100 border-t border-neutral-200 pt-4 px-6 bg-white/85 supports-[backdrop-filter]:bg-white/70 backdrop-blur shadow-sm"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid gap-2 pb-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

