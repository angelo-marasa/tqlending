import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { HeroSection } from "@/components/sections/hero-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { LeadCaptureForm } from "@/components/sections/lead-capture-form";

export const metadata: Metadata = {
  title: "Home Affordability Calculator | How Much House Can You Afford?",
  description:
    "Find out how much home you can afford based on your income, debts, and down payment. Get a realistic price range and plan your home purchase with confidence.",
};

const faqs = [
  {
    question: "How do lenders determine what I can afford?",
    answer:
      "Lenders look at your debt-to-income (DTI) ratio, which compares your total monthly debt payments to your gross monthly income. Most lenders prefer a front-end DTI (housing costs only) of no more than 28% and a back-end DTI (all debts including housing) of no more than 43%, though FHA loans may allow up to 50% in some cases.",
  },
  {
    question: "What is the 28/36 rule?",
    answer:
      "The 28/36 rule is a guideline that says you should spend no more than 28% of your gross monthly income on housing expenses and no more than 36% on total debt (housing plus car payments, student loans, credit cards, etc.). While not a hard rule, it is a useful starting point for budgeting.",
  },
  {
    question: "Does my down payment affect how much I can afford?",
    answer:
      "Yes, significantly. A larger down payment reduces the loan amount you need, which lowers your monthly payment and may eliminate the need for private mortgage insurance. It can also help you qualify for a lower interest rate, stretching your buying power further.",
  },
  {
    question: "Should I buy the most expensive home I qualify for?",
    answer:
      "Not necessarily. What you qualify for and what you are comfortable paying each month can be very different. Consider your lifestyle, savings goals, emergency fund, and future expenses (like children or career changes) when deciding on a price range. Leaving a cushion in your budget is always a smart move.",
  },
  {
    question: "What other costs should I budget for beyond the mortgage?",
    answer:
      "Homeownership comes with expenses beyond your loan payment. Budget for property taxes, homeowner's insurance, maintenance and repairs (typically 1-2% of the home's value per year), utilities, HOA fees (if applicable), and furnishing costs. These can add hundreds to your monthly budget.",
  },
];

const otherCalculators = [
  { label: "Mortgage Payment", href: "/calculators/mortgage-payment" },
  { label: "Closing Costs", href: "/calculators/closing-costs" },
  { label: "Rent vs. Buy", href: "/calculators/rent-vs-buy" },
];

export default function AffordabilityCalculatorPage() {
  return (
    <>
      <HeroSection
        variant="product"
        headline="Home Affordability Calculator"
        subheadline="Find Out How Much Home Fits Your Budget"
        description="Enter your income, debts, and down payment to get a realistic picture of what you can comfortably afford."
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
                  [Home Affordability Calculator Embed]
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
                        Enter Your Annual Income
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Include your gross (pre-tax) household income. If you
                        have a co-borrower, include their income as well. This
                        is the starting point for determining your buying power.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        Add Your Monthly Debts
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Include car payments, student loans, credit card
                        minimums, and any other recurring monthly obligations.
                        This helps calculate your debt-to-income ratio, which
                        lenders use to determine loan eligibility.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        Specify Your Down Payment
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Enter the amount you have saved for a down payment. A
                        larger down payment means a smaller loan, lower monthly
                        payments, and potentially better terms. FHA loans allow
                        as little as 3.5% down.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What Affects Affordability */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  What Affects Your Home Affordability
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Several factors work together to determine how much home you
                  can realistically purchase. Understanding each one helps you
                  make strategic decisions to maximize your buying power.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Income and Employment
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Lenders want to see stable, verifiable income. Salaried
                        employees typically need two years of W-2 history, while
                        self-employed borrowers need two years of tax returns.
                        Higher income directly increases the price range you
                        qualify for.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Existing Debt Load
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Every dollar you owe on car loans, student debt, or
                        credit cards reduces the mortgage payment a lender will
                        approve. Paying down debt before applying can
                        significantly boost your buying power.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Credit Score
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        A higher credit score qualifies you for lower interest
                        rates, which means lower monthly payments and a higher
                        purchase price within the same budget. Even a 20-point
                        improvement can make a meaningful difference.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Interest Rates
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Market interest rates have a major impact on
                        affordability. When rates drop by even half a percent,
                        buyers can afford tens of thousands more in home value
                        without increasing their monthly payment.
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
                      Tips to Increase Your Buying Power
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <li>
                        Pay off small debts like credit cards to improve your DTI
                        ratio quickly.
                      </li>
                      <li>
                        Boost your credit score by making on-time payments and
                        reducing credit utilization below 30%.
                      </li>
                      <li>
                        Save a larger down payment to reduce the loan amount and
                        eliminate PMI.
                      </li>
                      <li>
                        Consider FHA loans if your credit is below 700, as they
                        offer more flexible qualification guidelines.
                      </li>
                      <li>
                        Get pre-approved before house hunting so you know your
                        exact budget and can act quickly.
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
                  title="Get Pre-Approved Today"
                  description="Find out exactly what you qualify for. It only takes 2 minutes."
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
