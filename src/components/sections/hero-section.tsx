"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Shield, Clock, Award } from "lucide-react";
import { FadeIn, SlideIn, ScaleIn } from "@/components/ui/motion";

interface HeroSectionProps {
  headline?: string;
  subheadline?: string;
  description?: string;
  showForm?: boolean;
  showStats?: boolean;
  variant?: "home" | "product" | "page";
  ctaText?: string;
  ctaHref?: string;
}

export function HeroSection({
  headline = "Rates as Low as 3.5%",
  subheadline = "Putting Affordable Homeownership Within Reach",
  description,
  showForm = true,
  showStats = true,
  variant = "home",
  ctaText = "Check Your Rates",
  ctaHref = "/apply",
}: HeroSectionProps) {
  const [zipCode, setZipCode] = useState("");

  if (variant === "page") {
    return (
      <section className="relative bg-primary py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 gradient-hero opacity-100" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-heading text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl text-balance">
                {headline}
              </h1>
              {subheadline && (
                <p className="mt-4 text-lg text-primary-foreground/80 sm:text-xl text-balance">
                  {subheadline}
                </p>
              )}
            </div>
          </FadeIn>
        </div>
      </section>
    );
  }

  if (variant === "product") {
    return (
      <section className="relative bg-primary py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 gradient-hero opacity-100" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <SlideIn direction="left" delay={0.1}>
              <div>
                <h1 className="font-heading text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl text-balance">
                  {headline}
                </h1>
                <p className="mt-4 text-lg text-primary-foreground/80 sm:text-xl">
                  {subheadline}
                </p>
                {description && (
                  <p className="mt-4 text-primary-foreground/60">
                    {description}
                  </p>
                )}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold"
                  >
                    <Link href={ctaHref}>
                      {ctaText}
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="border border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 shadow-xs font-semibold"
                  >
                    <a href="tel:866-866-0653">Call (866) 866-0653</a>
                  </Button>
                </div>
              </div>
            </SlideIn>
            <SlideIn direction="right" delay={0.3}>
            <div className="hidden lg:flex justify-end">
              <div className="grid grid-cols-1 gap-4 max-w-sm">
                <div className="flex items-start gap-3 rounded-xl bg-primary-foreground/10 p-4 backdrop-blur-sm">
                  <Shield className="h-6 w-6 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-primary-foreground text-sm">Government-Backed</p>
                    <p className="text-xs text-primary-foreground/60 mt-0.5">FHA-insured for your protection</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-primary-foreground/10 p-4 backdrop-blur-sm">
                  <Clock className="h-6 w-6 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-primary-foreground text-sm">Fast Processing</p>
                    <p className="text-xs text-primary-foreground/60 mt-0.5">Close in as few as 30 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-primary-foreground/10 p-4 backdrop-blur-sm">
                  <Award className="h-6 w-6 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-primary-foreground text-sm">Expert Guidance</p>
                    <p className="text-xs text-primary-foreground/60 mt-0.5">Dedicated loan officer support</p>
                  </div>
                </div>
              </div>
            </div>
            </SlideIn>
          </div>
        </div>
      </section>
    );
  }

  // Home variant
  return (
    <section className="relative overflow-hidden bg-primary py-20 sm:py-24 lg:py-32">
      <div className="absolute inset-0 gradient-hero opacity-100" />
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text content */}
          <div>
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-1.5 text-sm text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                Rates Updated Daily
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
                <span className="text-secondary">{headline}</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="mt-4 font-heading text-xl font-medium text-primary-foreground sm:text-2xl lg:text-3xl text-balance">
                {subheadline}
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="mt-6 text-lg text-primary-foreground/70 max-w-lg">
                FHA Cash Out loans with competitive interest rates, down payments as
                low as 3.5%, and flexible credit guidelines. No income limits.
              </p>
            </FadeIn>

            {showStats && (
              <FadeIn delay={0.5}>
                <div className="mt-8 grid grid-cols-3 gap-6">
                  <div>
                    <p className="font-heading text-2xl font-bold text-secondary sm:text-3xl">$750M+</p>
                    <p className="text-sm text-primary-foreground/60">Loans Funded</p>
                  </div>
                  <div>
                    <p className="font-heading text-2xl font-bold text-secondary sm:text-3xl">3,000+</p>
                    <p className="text-sm text-primary-foreground/60">Loans Closed</p>
                  </div>
                  <div>
                    <p className="font-heading text-2xl font-bold text-secondary sm:text-3xl">50+</p>
                    <p className="text-sm text-primary-foreground/60">Years Experience</p>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>

          {/* Form card */}
          {showForm && (
            <SlideIn direction="right" delay={0.3}>
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl sm:p-8">
                <h2 className="font-heading text-xl font-bold text-card-foreground sm:text-2xl">
                  Your New Loan Awaits
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Get a more accurate rate by entering the ZIP code of the home
                  you are looking to purchase or refinance.
                </p>
                <form
                  className="mt-6 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (zipCode) window.location.href = `/apply?zip=${zipCode}`;
                  }}
                >
                  <div>
                    <label htmlFor="hero-zip" className="sr-only">
                      ZIP Code
                    </label>
                    <Input
                      id="hero-zip"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]{5}"
                      maxLength={5}
                      placeholder="Enter your ZIP code"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
                      className="h-12 text-base"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold h-12 text-base"
                  >
                    See My Rates
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </form>
                <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    No credit check
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    Takes 2 minutes
                  </div>
                </div>
              </div>
            </div>
            </SlideIn>
          )}
        </div>
      </div>
    </section>
  );
}
