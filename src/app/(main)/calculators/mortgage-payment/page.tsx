import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { HeroSection } from "@/components/sections/hero-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { LeadCaptureForm } from "@/components/sections/lead-capture-form";

export const metadata: Metadata = {
  title: "Mortgage Payment Calculator | Estimate Your Monthly Payment",
  description:
    "Calculate your monthly mortgage payment including principal, interest, taxes, and insurance. See how loan amount, term, and rate affect what you pay each month.",
};

const faqs = [
  {
    question: "What is included in a monthly mortgage payment?",
    answer:
      "A typical monthly mortgage payment includes four components, often called PITI: Principal (the amount that reduces your loan balance), Interest (the cost of borrowing), Taxes (property taxes collected by your local government), and Insurance (homeowner's insurance and, if applicable, private mortgage insurance or FHA mortgage insurance).",
  },
  {
    question: "How does my interest rate affect my payment?",
    answer:
      "Even a small difference in your interest rate can have a significant impact over the life of a loan. For example, on a $300,000 30-year mortgage, the difference between a 6% and 6.5% rate is roughly $100 per month, which adds up to over $36,000 in additional interest over the full term.",
  },
  {
    question: "Should I choose a 15-year or 30-year loan term?",
    answer:
      "A 15-year term means higher monthly payments but significantly less total interest paid. A 30-year term keeps payments more affordable but costs more over time. The right choice depends on your budget, financial goals, and how long you plan to stay in the home.",
  },
  {
    question: "What is PMI and when do I have to pay it?",
    answer:
      "Private Mortgage Insurance (PMI) is typically required when your down payment is less than 20% of the home's value on a conventional loan. FHA loans have their own mortgage insurance premiums (MIP). PMI protects the lender if you default and usually ranges from 0.5% to 1% of the loan amount annually.",
  },
  {
    question: "Can I lower my monthly payment after closing?",
    answer:
      "Yes. You can refinance to a lower interest rate, extend your loan term, or remove PMI once you reach 20% equity. You may also be able to appeal your property tax assessment if you believe your home is overvalued. Each of these strategies can reduce your monthly obligation.",
  },
];

const otherCalculators = [
  { label: "Home Affordability", href: "/calculators/affordability" },
  { label: "Refinance Savings", href: "/calculators/refinance" },
  { label: "Closing Costs", href: "/calculators/closing-costs" },
];

export default function MortgagePaymentCalculatorPage() {
  return (
    <>
      <HeroSection
        variant="product"
        headline="Mortgage Payment Calculator"
        subheadline="See Exactly What Your Monthly Payment Will Look Like"
        description="Enter your loan details to get an instant estimate of your principal, interest, taxes, and insurance costs."
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
                  [Mortgage Payment Calculator Embed]
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
                        Enter Your Loan Amount
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        This is the total amount you plan to borrow, which is
                        typically the purchase price minus your down payment. If
                        you are refinancing, enter your remaining loan balance.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        Set Your Interest Rate and Term
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Enter the interest rate you expect (or have been quoted)
                        and select your preferred loan term. Common terms are 15
                        and 30 years. Try different combinations to see how they
                        affect your payment.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        Add Taxes and Insurance
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Include your estimated annual property taxes and
                        homeowner&apos;s insurance to get a complete picture of
                        your total monthly obligation, not just the loan portion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Understanding Your Results */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  Understanding Your Results
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Your mortgage payment is made up of several components. Knowing
                  what each one represents helps you understand where your money
                  goes each month and where you might have room to negotiate or
                  save.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Principal
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        The portion of your payment that reduces your loan
                        balance. In the early years of a mortgage, most of your
                        payment goes toward interest, but over time more goes to
                        principal.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Interest
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        The cost of borrowing the money. This is determined by
                        your interest rate, loan balance, and remaining term.
                        Lowering your rate even slightly can save thousands over
                        the life of the loan.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Property Taxes
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Taxes assessed by your local government based on the
                        value of your property. These are typically collected
                        monthly by your lender and held in an escrow account
                        until due.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Insurance
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Homeowner&apos;s insurance protects your property, while
                        mortgage insurance (PMI or MIP) protects the lender.
                        Both may be included in your monthly escrow payment.
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
                      Tips to Lower Your Payment
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <li>
                        Increase your down payment to reduce the loan amount and
                        potentially eliminate PMI.
                      </li>
                      <li>
                        Improve your credit score before applying to qualify for
                        a lower interest rate.
                      </li>
                      <li>
                        Choose a longer loan term for lower monthly payments,
                        though you will pay more interest over time.
                      </li>
                      <li>
                        Shop around and compare rates from multiple lenders to
                        find the best deal.
                      </li>
                      <li>
                        Consider buying discount points to reduce your rate if
                        you plan to stay in the home long term.
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
                  title="Ready to Apply?"
                  description="Get real rates based on your scenario. No obligation, no credit check."
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
