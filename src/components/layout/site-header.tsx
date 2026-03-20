"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Phone, Menu, ChevronDown } from "lucide-react";
import { navLinks } from "@/lib/navigation";
import { type SiteSettings } from "@/lib/sanity/queries/settings";

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [refinanceOpen, setRefinanceOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = useCallback((menu: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(menu);
  }, []);

  const closeMenu = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const navLinkClass =
    "inline-flex h-9 items-center px-4 py-2 text-sm font-medium text-foreground/70 transition-all decoration-2 underline-offset-[6px] hover:text-foreground hover:underline hover:decoration-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-sm sm:px-6 lg:px-8">
          <p className="hidden sm:block">
            NMLS #{settings.nmls} | Equal Housing Lender
          </p>
          <a
            href={`tel:${settings.phone}`}
            className="flex items-center gap-1.5 font-medium transition-colors hover:text-secondary"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            Call {settings.phoneFormatted}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-heading font-bold text-lg">
            {settings.logoInitials || "MP"}
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold leading-tight text-foreground">
              {settings.siteName || "FHA Cash Out"}
            </span>
            <span className="text-xs text-muted-foreground leading-tight">
              by {settings.company || "Mortgage Pipeline"}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {/* Purchase dropdown */}
          <div
            className="relative"
            onMouseEnter={() => openMenu("purchase")}
            onMouseLeave={closeMenu}
          >
            <button
              className={`${navLinkClass} gap-1 ${openDropdown === "purchase" ? "text-foreground underline decoration-secondary" : ""}`}
              aria-expanded={openDropdown === "purchase"}
              aria-haspopup="true"
            >
              Purchase
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${openDropdown === "purchase" ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {openDropdown === "purchase" && (
              <div className="absolute top-full left-0 z-50 mt-1 w-52 rounded-lg border bg-popover p-1.5 shadow-md">
                {navLinks.purchase.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Refinance dropdown */}
          <div
            className="relative"
            onMouseEnter={() => openMenu("refinance")}
            onMouseLeave={closeMenu}
          >
            <button
              className={`${navLinkClass} gap-1 ${openDropdown === "refinance" ? "text-foreground underline decoration-secondary" : ""}`}
              aria-expanded={openDropdown === "refinance"}
              aria-haspopup="true"
            >
              Refinance
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${openDropdown === "refinance" ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {openDropdown === "refinance" && (
              <div className="absolute top-full left-0 z-50 mt-1 w-52 rounded-lg border bg-popover p-1.5 shadow-md">
                {navLinks.refinance.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Standalone links */}
          <Link href="/heloc" className={navLinkClass}>HELOC</Link>
          <Link href="/calculators" className={navLinkClass}>Calculators</Link>
          <Link href="/blog" className={navLinkClass}>Blog</Link>
          <Link href="/contact" className={navLinkClass}>Contact</Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="default" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
            <Link href="/apply">Check Your Rates</Link>
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-heading font-bold text-lg">Menu</span>
              </div>
              <nav className="flex-1 overflow-y-auto p-4" aria-label="Mobile navigation">
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/"
                      className="block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                      onClick={() => setMobileOpen(false)}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <button
                      className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                      onClick={() => setPurchaseOpen(!purchaseOpen)}
                      aria-expanded={purchaseOpen}
                    >
                      Purchase
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${purchaseOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                    {purchaseOpen && (
                      <ul className="ml-4 mt-1 space-y-1 border-l-2 border-border pl-3">
                        {navLinks.purchase.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                              onClick={() => setMobileOpen(false)}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                  <li>
                    <button
                      className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                      onClick={() => setRefinanceOpen(!refinanceOpen)}
                      aria-expanded={refinanceOpen}
                    >
                      Refinance
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${refinanceOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                    {refinanceOpen && (
                      <ul className="ml-4 mt-1 space-y-1 border-l-2 border-border pl-3">
                        {navLinks.refinance.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                              onClick={() => setMobileOpen(false)}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                  <li>
                    <Link
                      href="/heloc"
                      className="block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                      onClick={() => setMobileOpen(false)}
                    >
                      HELOC
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/calculators"
                      className="block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                      onClick={() => setMobileOpen(false)}
                    >
                      Calculators
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                      onClick={() => setMobileOpen(false)}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                      onClick={() => setMobileOpen(false)}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="border-t p-4 space-y-3">
                <Button asChild className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Link href="/apply" onClick={() => setMobileOpen(false)}>
                    Check Your Rates
                  </Link>
                </Button>
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center justify-center gap-2 text-sm font-medium text-primary"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {settings.phoneFormatted}
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
