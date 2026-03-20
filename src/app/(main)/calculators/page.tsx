import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, DollarSign, Home, RefreshCw, Landmark, FileText, Scale } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Mortgage Calculators | Free Tools for Informed Decisions",
  description:
    "Use our free mortgage calculators to estimate monthly payments, determine affordability, compare refinance savings, calculate closing costs, and more.",
};

const calculators = [
  {
    title: "Mortgage Payment Calculator",
    description:
      "Estimate your monthly mortgage payment including principal, interest, taxes, and insurance. See how different loan amounts and terms affect your budget.",
    href: "/calculators/mortgage-payment",
    icon: Calculator,
  },
  {
    title: "Home Affordability Calculator",
    description:
      "Find out how much home you can afford based on your income, debts, and down payment. Get a realistic price range before you start shopping.",
    href: "/calculators/affordability",
    icon: Home,
  },
  {
    title: "Refinance Savings Calculator",
    description:
      "See how much you could save by refinancing your current mortgage. Compare your existing loan to a new rate and find your break-even point.",
    href: "/calculators/refinance",
    icon: RefreshCw,
  },
  {
    title: "HELOC Calculator",
    description:
      "Estimate your available home equity and explore payment scenarios for a Home Equity Line of Credit. Understand draw periods and repayment terms.",
    href: "/calculators/heloc",
    icon: Landmark,
  },
  {
    title: "Closing Costs Calculator",
    description:
      "Get an estimate of the fees and expenses you can expect at closing. Know what to budget for so there are no surprises on settlement day.",
    href: "/calculators/closing-costs",
    icon: FileText,
  },
  {
    title: "Rent vs. Buy Calculator",
    description:
      "Compare the long-term costs of renting versus buying a home. Factor in appreciation, tax benefits, and opportunity cost to make the right call.",
    href: "/calculators/rent-vs-buy",
    icon: Scale,
  },
];

export default function CalculatorsPage() {
  return (
    <>
      <HeroSection
        variant="page"
        headline="Mortgage Calculators"
        subheadline="Free Tools to Help You Make Informed Decisions"
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you are buying your first home, refinancing an existing
              mortgage, or tapping into your equity, our calculators give you the
              numbers you need to move forward with confidence. Each tool is
              designed to provide clear, actionable estimates so you can plan
              your finances effectively.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calc) => (
              <Link key={calc.href} href={calc.href} className="group">
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <calc.icon
                        className="h-6 w-6 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <h2 className="mt-4 font-heading text-lg font-bold text-foreground">
                      {calc.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {calc.description}
                    </p>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary group-hover:underline">
                      Use Calculator
                      <ArrowRight
                        className="ml-1.5 h-4 w-4"
                        aria-hidden="true"
                      />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
