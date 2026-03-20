import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { HeroSection } from "@/components/sections/hero-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { LeadCaptureForm } from "@/components/sections/lead-capture-form";

export const metadata: Metadata = {
  title: "Closing Costs Calculator | Know What to Expect at Settlement",
  description:
    "Estimate your closing costs for a home purchase or refinance. Understand lender fees, title charges, prepaid items, and what you can negotiate.",
};

const faqs = [
  {
    question: "How much are closing costs typically?",
    answer:
      "Closing costs typically range from 2% to 5% of the loan amount. On a $300,000 loan, you can expect to pay between $6,000 and $15,000. The exact amount depends on your location, lender, loan type, and negotiated terms. Your Loan Estimate, provided within three business days of application, will itemize expected costs.",
  },
  {
    question: "What is the difference between closing costs and prepaids?",
    answer:
      "Closing costs are fees for services required to process and close your loan (appraisal, title search, origination fees). Prepaids are expenses you pay in advance, such as homeowner's insurance premiums, property taxes, and per-diem interest from closing day to the end of the month. Both are due at closing but serve different purposes.",
  },
  {
    question: "Can I negotiate closing costs?",
    answer:
      "Yes, many closing costs are negotiable. You can shop around for title insurance and settlement services, ask the lender to reduce origination fees, negotiate seller concessions (where the seller covers some of your costs), or choose a lender that offers closing cost credits. Getting quotes from multiple lenders gives you leverage to negotiate.",
  },
  {
    question: "Can I roll closing costs into my loan?",
    answer:
      "In some cases, yes. For refinances, you can often add closing costs to your loan balance. For purchases, you may be able to negotiate seller concessions or choose a lender credit option that covers some costs in exchange for a slightly higher rate. FHA and VA loans also have specific rules about financeable costs.",
  },
  {
    question: "Do closing costs vary by state?",
    answer:
      "Yes, significantly. States with higher transfer taxes, title insurance requirements, and attorney-closing mandates tend to have higher closing costs. For example, New York, Connecticut, and New Jersey typically have higher costs than states in the Midwest. Property tax prorations also vary by state.",
  },
];

const otherCalculators = [
  { label: "Mortgage Payment", href: "/calculators/mortgage-payment" },
  { label: "Home Affordability", href: "/calculators/affordability" },
  { label: "Rent vs. Buy", href: "/calculators/rent-vs-buy" },
];

export default function ClosingCostsCalculatorPage() {
  return (
    <>
      <HeroSection
        variant="product"
        headline="Closing Costs Calculator"
        subheadline="Know Exactly What to Budget for Settlement Day"
        description="Get an itemized estimate of the fees and expenses you can expect when closing on a home purchase or refinance."
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              {/* Calculator Placeholder */}
              <div className="rounded-xl border-2 border-dashed border-border bg-muted/30 p-12 flex flex-col items-center justify-center min-h-[400px]">
                <div className="rounded-lg bg-primary/10 p-4 mb-4">
                  <Calculator className="h-10 w-10 text-primary" aria-hidden="true" />
                </div>
                <p className="font-heading text-lg font-semibold text-foreground">
                  MortgageMate Calculator
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  [Closing Costs Calculator Embed]
                </p>
              </div>

              {/* How to Use */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  How to Use This Calculator
                </h2>
                <div className="mt-6 space-y-4">
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        Enter the Purchase Price or Loan Amount
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        For a purchase, enter the home&apos;s sale price. For a
                        refinance, enter your new loan amount. Closing costs are
                        typically calculated as a percentage of this figure.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        Select Your State and Loan Type
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Closing costs vary significantly by location due to
                        differences in transfer taxes, title insurance rates,
                        and recording fees. Your loan type (conventional, FHA,
                        VA) also affects which fees apply.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        Review the Itemized Breakdown
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        The calculator provides a line-by-line estimate of each
                        fee category. Use this to identify which costs are fixed,
                        which are negotiable, and where you might be able to
                        shop for a better price.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common Closing Costs */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  Common Closing Cost Categories
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Closing costs fall into several categories. Understanding what
                  each fee covers helps you identify areas where you can save or
                  negotiate.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Lender Fees
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Origination fees, application fees, underwriting fees,
                        and discount points. The origination fee is typically
                        0.5% to 1% of the loan amount. Some lenders bundle
                        these into a single charge.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Third-Party Fees
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Appraisal ($300-$600), credit report ($25-$50), home
                        inspection ($300-$500), and survey ($200-$800). These
                        are paid to independent service providers, not the
                        lender.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Title and Settlement
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Title search, title insurance (both lender&apos;s and
                        owner&apos;s policies), settlement agent fees, and
                        recording fees. Title insurance is a one-time cost that
                        protects against ownership disputes.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Prepaid Items
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        First year&apos;s homeowner&apos;s insurance premium,
                        initial escrow deposits for taxes and insurance, and
                        per-diem interest from closing to month end. These
                        ensure your escrow account starts with adequate funds.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Tips */}
              <div className="rounded-xl bg-muted/50 p-6 sm:p-8">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-6 w-6 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      Ways to Reduce Your Closing Costs
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <li>
                        Get Loan Estimates from multiple lenders and compare fees
                        line by line.
                      </li>
                      <li>
                        Shop for title insurance and settlement services
                        independently, as prices can vary significantly.
                      </li>
                      <li>
                        Negotiate seller concessions as part of your purchase
                        offer, especially in a buyer&apos;s market.
                      </li>
                      <li>
                        Ask your lender about closing cost credits in exchange
                        for a slightly higher interest rate.
                      </li>
                      <li>
                        Close at the end of the month to minimize per-diem
                        interest charges.
                      </li>
                      <li>
                        Check for first-time buyer programs in your area that
                        offer closing cost assistance.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                <LeadCaptureForm
                  variant="full"
                  title="Get a Detailed Estimate"
                  description="Speak with a loan officer for an accurate breakdown of your costs."
                />
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-heading font-semibold text-foreground">
                      Other Calculators
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {otherCalculators.map((calc) => (
                        <li key={calc.href}>
                          <Link
                            href={calc.href}
                            className="flex items-center text-sm text-primary hover:underline"
                          >
                            <ArrowRight className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                            {calc.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} />
      <CTASection />
    </>
  );
}
