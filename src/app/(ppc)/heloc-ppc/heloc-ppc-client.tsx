"use client";

import { useState } from "react";
import {
  ArrowRight,
  Shield,
  Clock,
  Users,
  CreditCard,
  TrendingUp,
  Receipt,
  ChevronDown,
  Phone,
  Home,
  Wallet,
  Zap,
  DollarSign,
  GraduationCap,
  Hammer,
  BadgeCheck,
  Star,
  Minus,
  Equal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type SiteSettings } from "@/lib/sanity/queries/settings";

const benefits = [
  {
    icon: CreditCard,
    title: "Flexible Access",
    description:
      "Draw funds as needed from your credit line, whenever you need them. Pay interest only on what you use, giving you complete control over your borrowing and repayment.",
  },
  {
    icon: TrendingUp,
    title: "Competitive Rates",
    description:
      "Enjoy rates significantly lower than credit cards or personal loans. Because your HELOC is backed by the equity you have already built, lenders can offer more favorable terms.",
  },
  {
    icon: Receipt,
    title: "Tax Benefits",
    description:
      "Interest paid on a HELOC may be tax-deductible when used for home improvements. Consult your tax advisor to understand how this could reduce your overall cost of borrowing.",
  },
  {
    icon: DollarSign,
    title: "No Closing Costs",
    description:
      "On select programs, you can open a HELOC with zero closing costs. That means more of your equity goes directly into your pocket instead of toward fees and charges.",
  },
  {
    icon: Zap,
    title: "Fast Approval",
    description:
      "Our streamlined application process means you can go from application to approval in as little as two weeks. Get access to your funds when you need them, not months later.",
  },
  {
    icon: Wallet,
    title: "Interest-Only Payments",
    description:
      "During the draw period, you can make interest-only payments to keep your monthly costs low. This gives you the breathing room to manage your finances on your own terms.",
  },
];

const useCases = [
  {
    icon: Hammer,
    title: "Home Improvements",
    description:
      "Fund renovations that increase your property value. Kitchen and bathroom remodels consistently deliver strong returns.",
    stat: "Average ROI: 70-80%",
  },
  {
    icon: CreditCard,
    title: "Debt Consolidation",
    description:
      "Replace high-interest credit card balances with a lower-rate HELOC. Simplify your payments and save thousands in interest.",
    stat: "Save up to 15% in interest",
  },
  {
    icon: Shield,
    title: "Emergency Fund",
    description:
      "Keep a safety net available without paying interest until you actually need the funds. Peace of mind with zero upfront cost.",
    stat: "Pay $0 until you draw",
  },
  {
    icon: GraduationCap,
    title: "Education Expenses",
    description:
      "Finance tuition, certifications, or professional development at rates far below private student loans.",
    stat: "Rates from 6.5% APR",
  },
];

const trustItems = [
  {
    icon: BadgeCheck,
    title: "Licensed in All 50 States",
    description:
      "We are a nationally licensed mortgage lender, so no matter where your home is located, we can help you access your equity.",
  },
  {
    icon: Star,
    title: "A+ BBB Rating",
    description:
      "Our commitment to transparency and customer satisfaction has earned us the highest rating from the Better Business Bureau.",
  },
  {
    icon: Users,
    title: "Dedicated HELOC Specialists",
    description:
      "You will work with a specialist who focuses exclusively on home equity products, ensuring expert guidance at every step.",
  },
];

const faqs = [
  {
    question: "What is a HELOC and how does it work?",
    answer:
      "A HELOC (Home Equity Line of Credit) is a revolving line of credit secured by your home. You are approved for a maximum amount and can draw funds as needed during the draw period, typically 5 to 10 years. You only pay interest on the amount you borrow.",
  },
  {
    question: "How much can I borrow with a HELOC?",
    answer:
      "You can typically borrow up to 85% of your home's value minus your existing mortgage balance. For example, if your home is worth $400,000 and you owe $250,000, you may be able to access up to $90,000.",
  },
  {
    question: "Will applying affect my credit score?",
    answer:
      "Our initial assessment uses a soft credit check that does not affect your score. A hard credit inquiry is only performed once you decide to proceed with a formal application.",
  },
  {
    question: "How long does the approval process take?",
    answer:
      "Most HELOC applications are processed within 2 to 4 weeks. Our streamlined digital application and dedicated team work to get you approved as quickly as possible.",
  },
];

export default function HELOCPPCClient({ settings }: { settings: SiteSettings }) {
  const [formData, setFormData] = useState({
    zipCode: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    homeValue: "",
    mortgageBalance: "",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = `/apply?zip=${formData.zipCode}`;
  }

  function scrollToForm() {
    const formEl = document.getElementById("heloc-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-primary py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-0 gradient-hero opacity-100" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            {/* Left: Copy */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground font-heading font-bold text-lg">
                  {settings.logoInitials || "MP"}
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-lg font-bold leading-tight text-primary-foreground">
                    {settings.siteName || "FHA Cash Out"}
                  </span>
                  <span className="text-xs text-primary-foreground/60 leading-tight">
                    by {settings.company || "Mortgage Pipeline"}
                  </span>
                </div>
              </div>

              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl text-balance">
                Unlock Your Home Equity with a{" "}
                <span className="text-secondary">HELOC</span>
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/80 sm:text-xl max-w-lg mx-auto lg:mx-0 text-balance">
                Flexible access to your home's value. Apply in minutes.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6">
                <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                  <Shield className="h-4 w-4 text-secondary" aria-hidden="true" />
                  No credit check
                </div>
                <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                  <Clock className="h-4 w-4 text-secondary" aria-hidden="true" />
                  2-minute application
                </div>
                <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                  <Users className="h-4 w-4 text-secondary" aria-hidden="true" />
                  Expert guidance
                </div>
              </div>
            </div>

            {/* Right: Lead Capture Form */}
            <div id="heloc-form" className="mx-auto w-full max-w-md">
              <div className="rounded-2xl bg-card p-6 shadow-2xl sm:p-8">
                <h2 className="font-heading text-xl font-bold text-card-foreground sm:text-2xl">
                  Get Your Free HELOC Quote
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  See how much equity you can access. No obligation.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="ppc-zip">ZIP Code</Label>
                    <Input
                      id="ppc-zip"
                      name="zipCode"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]{5}"
                      maxLength={5}
                      placeholder="Enter your ZIP code"
                      value={formData.zipCode}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          zipCode: e.target.value.replace(/\D/g, ""),
                        }))
                      }
                      className="mt-1.5 h-11"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="ppc-first">First Name</Label>
                      <Input
                        id="ppc-first"
                        name="firstName"
                        type="text"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="mt-1.5 h-11"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="ppc-last">Last Name</Label>
                      <Input
                        id="ppc-last"
                        name="lastName"
                        type="text"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="mt-1.5 h-11"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="ppc-email">Email</Label>
                    <Input
                      id="ppc-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1.5 h-11"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="ppc-phone">Phone</Label>
                    <Input
                      id="ppc-phone"
                      name="phone"
                      type="tel"
                      placeholder="(555) 555-5555"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1.5 h-11"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="ppc-home-value">Est. Home Value</Label>
                      <Input
                        id="ppc-home-value"
                        name="homeValue"
                        type="text"
                        placeholder="$300,000"
                        value={formData.homeValue}
                        onChange={handleChange}
                        className="mt-1.5 h-11"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="ppc-balance">Mortgage Balance</Label>
                      <Input
                        id="ppc-balance"
                        name="mortgageBalance"
                        type="text"
                        placeholder="$200,000"
                        value={formData.mortgageBalance}
                        onChange={handleChange}
                        className="mt-1.5 h-11"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold h-12 text-base"
                  >
                    See My HELOC Options
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </form>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    No credit check required
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    Takes just 2 minutes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A. Social Proof Bar */}
      <section className="bg-card border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
            <div className="flex items-center justify-center gap-3 py-5 sm:py-6">
              <Users className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
              <div>
                <span className="font-heading text-lg font-bold text-foreground sm:text-xl">3,000+</span>
                <span className="ml-1.5 text-sm text-muted-foreground">Homeowners Served</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 py-5 sm:py-6">
              <DollarSign className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
              <div>
                <span className="font-heading text-lg font-bold text-foreground sm:text-xl">$750M+</span>
                <span className="ml-1.5 text-sm text-muted-foreground">in Loans Funded</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 py-5 sm:py-6">
              <Star className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
              <div>
                <span className="font-heading text-lg font-bold text-foreground sm:text-xl">4.9/5</span>
                <span className="ml-1.5 text-sm text-muted-foreground">Customer Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B. How Much Can You Access? */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              How Much Can You Access?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Your available equity is the difference between your home value and what you owe. Here is a quick example.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center text-center">
              {/* Home Value */}
              <div className="md:col-span-1">
                <div className="flex items-center justify-center mb-2">
                  <Home className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                  Home Value
                </p>
                <p className="font-heading text-3xl font-extrabold text-foreground sm:text-4xl">
                  $400<span className="text-2xl sm:text-3xl">,000</span>
                </p>
              </div>

              {/* Minus */}
              <div className="md:col-span-1 flex justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <Minus className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                </div>
              </div>

              {/* Mortgage Balance */}
              <div className="md:col-span-1">
                <div className="flex items-center justify-center mb-2">
                  <Receipt className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                  Mortgage Balance
                </p>
                <p className="font-heading text-3xl font-extrabold text-foreground sm:text-4xl">
                  $250<span className="text-2xl sm:text-3xl">,000</span>
                </p>
              </div>

              {/* Equals */}
              <div className="md:col-span-1 flex justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Equal className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
              </div>

              {/* Available Equity */}
              <div className="md:col-span-1">
                <div className="flex items-center justify-center mb-2">
                  <Wallet className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary mb-1">
                  Available Equity
                </p>
                <p className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
                  $150<span className="text-2xl sm:text-3xl">,000</span>
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Most homeowners can access up to{" "}
                <span className="font-semibold text-foreground">85% of their home equity</span>{" "}
                through a HELOC.
              </p>
              <Button
                onClick={scrollToForm}
                variant="outline"
                className="mt-4"
              >
                Calculate Your Equity
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* C. Enhanced Benefits (2x3 grid) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Why Choose a HELOC?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              A Home Equity Line of Credit gives you the flexibility to access
              your home equity on your terms, with benefits you will not find
              with other borrowing options.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl bg-card p-7 shadow-sm border border-border"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <benefit.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D. Common Uses for a HELOC */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Common Uses for a HELOC
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Your home equity is one of your most valuable financial tools.
              Here are some of the most popular ways homeowners put it to work.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <useCase.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                  {useCase.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
                <div className="mt-4 rounded-md bg-muted px-3 py-2">
                  <p className="text-xs font-semibold text-primary">
                    {useCase.stat}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E. Trust / Credibility */}
      <section className="py-16 sm:py-20 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Why Homeowners Choose Us
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              When it comes to your home equity, you deserve a lender you can trust.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {trustItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-7 w-7 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* F. Second Lead Capture CTA */}
      <section className="relative bg-primary py-16 sm:py-20">
        <div className="absolute inset-0 gradient-hero opacity-100" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-primary-foreground sm:text-3xl lg:text-4xl text-balance">
            Ready to Unlock Your Home Equity?
          </h2>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-xl mx-auto">
            It takes just 2 minutes to see how much you can access. No credit
            check, no obligation, and no surprises.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold h-14 px-10 text-lg"
            >
              Get My Free Quote
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Button>
            <span className="text-primary-foreground/60 text-sm">or</span>
            <a
              href={`tel:${settings.phone}`}
              className="inline-flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {settings.phoneFormatted}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="divide-y divide-border rounded-xl border border-border">
            {faqs.map((faq, index) => (
              <div key={index}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-heading font-semibold text-foreground text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phone CTA */}
      <section className="py-12 sm:py-16 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-primary-foreground sm:text-3xl">
            Prefer to Speak With Someone?
          </h2>
          <p className="mt-3 text-primary-foreground/70 max-w-lg mx-auto">
            Our HELOC specialists are available to answer your questions and
            guide you through the process.
          </p>
          <a
            href={`tel:${settings.phone}`}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-4 text-lg font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {settings.phoneFormatted}
          </a>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-heading font-bold text-sm">
                {settings.logoInitials || "MP"}
              </div>
              <span className="font-heading text-sm font-semibold text-foreground">
                {settings.company}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              NMLS #{settings.nmls} | {settings.address}
            </p>
            <p className="text-xs text-muted-foreground/70 max-w-xl">
              This is not a commitment to lend. Programs, rates, terms, and
              conditions are subject to change without notice. All loans subject
              to credit approval. Equal Housing Lender.
            </p>
            <p className="text-xs text-muted-foreground/50">
              &copy; {new Date().getFullYear()} {settings.company}. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
