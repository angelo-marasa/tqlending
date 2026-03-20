import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { HeroSection } from "@/components/sections/hero-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { LeadCaptureForm } from "@/components/sections/lead-capture-form";

export const metadata: Metadata = {
  title: "HELOC Calculator | Estimate Your Available Home Equity",
  description:
    "Calculate how much home equity you can access with a HELOC. Explore draw period and repayment scenarios, interest-only payments, and total borrowing power.",
};

const faqs = [
  {
    question: "How much of my home equity can I access with a HELOC?",
    answer:
      "Most lenders allow you to borrow up to 80% to 85% of your home's appraised value, minus your existing mortgage balance. For example, if your home is worth $400,000 and you owe $250,000, you could potentially access up to $70,000 to $90,000 through a HELOC (80-85% of $400,000 = $320,000-$340,000, minus $250,000).",
  },
  {
    question: "What is the difference between a draw period and repayment period?",
    answer:
      "A HELOC has two phases. The draw period (typically 5 to 10 years) is when you can borrow from the line and usually make interest-only payments. The repayment period (typically 10 to 20 years) follows, during which you can no longer draw funds and must pay back both principal and interest. Payments typically increase significantly when the repayment period begins.",
  },
  {
    question: "Are HELOC interest rates fixed or variable?",
    answer:
      "Most HELOCs have variable interest rates tied to the prime rate. This means your rate and payment can change as market rates fluctuate. Some lenders offer a fixed-rate option that lets you lock a portion of your balance at a fixed rate, providing more payment predictability for larger purchases or projects.",
  },
  {
    question: "Is the interest on a HELOC tax-deductible?",
    answer:
      "Under current tax law, HELOC interest may be deductible if the funds are used to buy, build, or substantially improve the home that secures the loan. Interest on funds used for other purposes (like paying off credit cards or buying a car) is generally not deductible. Consult a tax professional for guidance specific to your situation.",
  },
  {
    question: "What are the risks of a HELOC?",
    answer:
      "The main risks include variable interest rates that can increase your payments, the potential for overspending since the credit line is revolving, and the fact that your home is collateral. If you cannot make payments, you risk foreclosure. Payment shock when transitioning from the draw period to the repayment period is another common concern.",
  },
];

const otherCalculators = [
  { label: "Mortgage Payment", href: "/calculators/mortgage-payment" },
  { label: "Refinance Savings", href: "/calculators/refinance" },
  { label: "Home Affordability", href: "/calculators/affordability" },
];

export default function HELOCCalculatorPage() {
  return (
    <>
      <HeroSection
        variant="product"
        headline="HELOC Calculator"
        subheadline="See How Much Equity You Can Access"
        description="Estimate your borrowing power and explore payment scenarios for a Home Equity Line of Credit."
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
                  [HELOC Calculator Embed]
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
                        Enter Your Home Value
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Input your home&apos;s current estimated market value.
                        You can use recent comparable sales in your area or an
                        online home value estimator as a starting point. The
                        lender will order a formal appraisal during the
                        application process.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        Enter Your Mortgage Balance
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Input the current outstanding balance on your primary
                        mortgage. This is subtracted from your available equity
                        to determine how much you can borrow. Check your latest
                        mortgage statement for this number.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        Explore Payment Scenarios
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        See estimated payments during both the draw period
                        (interest-only) and the repayment period (principal and
                        interest). Adjust the draw amount to plan for different
                        spending scenarios.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Understanding HELOC Phases */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  Understanding HELOC Payment Phases
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  A HELOC works differently from a traditional mortgage. It has
                  two distinct phases, each with its own payment structure.
                  Planning for both is critical to avoiding payment shock.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Draw Period (5-10 Years)
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        During this phase, you can borrow up to your credit
                        limit as needed, similar to a credit card. Most lenders
                        require interest-only minimum payments, keeping your
                        monthly obligation lower. You can repay and re-borrow as
                        needed.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Repayment Period (10-20 Years)
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Once the draw period ends, you can no longer borrow from
                        the line. Your payments shift to include both principal
                        and interest, which can increase your payment
                        significantly. Plan ahead so this transition does not
                        catch you off guard.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Common Uses */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  Common Uses for a HELOC
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Home renovations and improvements",
                    "Debt consolidation at a lower rate",
                    "Emergency fund or financial safety net",
                    "Education expenses",
                    "Major purchases or life events",
                    "Investment property down payment",
                  ].map((use) => (
                    <div key={use} className="flex items-start gap-3">
                      <ArrowRight className="h-4 w-4 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-sm text-foreground">{use}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="rounded-xl bg-muted/50 p-6 sm:p-8">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-6 w-6 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      HELOC Tips and Best Practices
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <li>
                        Only borrow what you need. Just because you have a
                        credit limit does not mean you should use it all.
                      </li>
                      <li>
                        Make principal payments during the draw period to reduce
                        your balance and avoid a large payment increase later.
                      </li>
                      <li>
                        Consider locking a portion at a fixed rate if you are
                        making a large, one-time draw.
                      </li>
                      <li>
                        Monitor interest rate trends since your payment is
                        variable and will fluctuate with the market.
                      </li>
                      <li>
                        Use HELOC funds for value-adding improvements that
                        increase your home&apos;s worth.
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
                  title="Explore Your HELOC Options"
                  description="Get personalized HELOC rates. Quick and easy, no obligation."
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
