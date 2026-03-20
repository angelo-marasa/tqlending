import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { HeroSection } from "@/components/sections/hero-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { LeadCaptureForm } from "@/components/sections/lead-capture-form";

export const metadata: Metadata = {
  title: "Refinance Savings Calculator | See How Much You Could Save",
  description:
    "Calculate your potential refinance savings, including monthly payment reduction, lifetime interest savings, and break-even timeline. Compare your current loan to new rates.",
};

const faqs = [
  {
    question: "When does it make sense to refinance?",
    answer:
      "Refinancing typically makes sense when you can lower your interest rate by at least 0.5% to 1%, when you plan to stay in the home long enough to recoup closing costs (the break-even point), or when you want to switch from an adjustable-rate to a fixed-rate mortgage. It can also be worthwhile if you want to shorten your loan term or access equity through a cash-out refinance.",
  },
  {
    question: "What is the break-even point?",
    answer:
      "The break-even point is how long it takes for your monthly savings to exceed the cost of refinancing. For example, if refinancing costs $4,000 and saves you $200 per month, your break-even point is 20 months. If you plan to stay in the home beyond that time, refinancing is likely a good financial move.",
  },
  {
    question: "What are typical closing costs for a refinance?",
    answer:
      "Refinance closing costs typically range from 2% to 5% of the new loan amount. On a $300,000 loan, that means $6,000 to $15,000. Costs may include an appraisal, title search, title insurance, origination fees, and recording fees. Some lenders offer no-closing-cost refinances, but these usually come with a slightly higher interest rate.",
  },
  {
    question: "Will refinancing extend my mortgage?",
    answer:
      "It depends on the new term you choose. If you refinance into a new 30-year mortgage, you are resetting the clock. However, you can refinance into a shorter term (like 15 or 20 years) to pay off your home sooner. You can also make extra payments on a 30-year loan to pay it off faster while keeping the lower required payment as a safety net.",
  },
  {
    question: "Can I refinance with less-than-perfect credit?",
    answer:
      "Yes. FHA Streamline refinances, for example, have simplified credit requirements for borrowers with existing FHA loans. Conventional refinances typically require a credit score of 620 or higher. Even with lower credit, you may qualify for certain programs, though your rate may be higher than what a borrower with excellent credit would receive.",
  },
];

const otherCalculators = [
  { label: "Mortgage Payment", href: "/calculators/mortgage-payment" },
  { label: "HELOC", href: "/calculators/heloc" },
  { label: "Home Affordability", href: "/calculators/affordability" },
];

export default function RefinanceCalculatorPage() {
  return (
    <>
      <HeroSection
        variant="product"
        headline="Refinance Savings Calculator"
        subheadline="Find Out If Refinancing Makes Financial Sense for You"
        description="Compare your current mortgage to a new rate and see your potential monthly savings, lifetime interest reduction, and break-even timeline."
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
                  [Refinance Savings Calculator Embed]
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
                        Enter Your Current Loan Details
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Input your current loan balance, interest rate, and
                        remaining term. You can find these on your most recent
                        mortgage statement or by contacting your current
                        servicer.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        Enter Your New Loan Terms
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Input the new interest rate you have been quoted (or
                        expect to receive) and select your desired loan term.
                        Try different scenarios to see how a 15-year term
                        compares to a 30-year term.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        Review Your Savings Breakdown
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        The calculator will show your monthly payment savings,
                        total interest saved over the life of the loan, and the
                        break-even point. Use this information to decide if
                        refinancing is the right move.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Break-Even Analysis */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  Understanding Break-Even Analysis
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  The break-even point is arguably the most important number in
                  any refinance decision. It tells you exactly when your savings
                  start outweighing the cost of refinancing.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Monthly Savings
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        The difference between your current payment and your new
                        payment. This is the amount you put back in your pocket
                        each month after refinancing. Even $100 per month adds
                        up to $1,200 per year.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Lifetime Interest Savings
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        The total amount of interest you avoid paying over the
                        remaining life of your loan. This number can be
                        substantial, often tens of thousands of dollars,
                        especially when switching to a shorter term.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Closing Costs
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        The upfront fees required to process and close your new
                        loan. These must be recouped through monthly savings
                        before refinancing becomes profitable. Always factor
                        these into your decision.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Break-Even Timeline
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Divide your closing costs by your monthly savings to get
                        the number of months until you break even. If you plan
                        to stay in the home past that point, refinancing is
                        likely worth it.
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
                      Refinancing Strategies to Consider
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <li>
                        Rate-and-term refinance: Lower your rate or shorten your
                        term without taking cash out.
                      </li>
                      <li>
                        Cash-out refinance: Access your home equity for
                        renovations, debt consolidation, or other expenses.
                      </li>
                      <li>
                        FHA Streamline: If you have an existing FHA loan, this
                        simplified process requires minimal documentation.
                      </li>
                      <li>
                        VA IRRRL: Veterans with an existing VA loan can use the
                        Interest Rate Reduction Refinance Loan for a streamlined
                        process.
                      </li>
                      <li>
                        Compare no-closing-cost options against traditional
                        refinances to see which saves more over your planned
                        timeline.
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
                  title="Get Your Refinance Rate"
                  description="See what rate you qualify for today. No obligation, no credit check."
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
