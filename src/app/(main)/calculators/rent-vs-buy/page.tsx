import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { HeroSection } from "@/components/sections/hero-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { LeadCaptureForm } from "@/components/sections/lead-capture-form";

export const metadata: Metadata = {
  title: "Rent vs. Buy Calculator | Should You Rent or Buy a Home?",
  description:
    "Compare the total cost of renting versus buying over time. Factor in appreciation, tax benefits, opportunity cost, and lifestyle considerations to make the right decision.",
};

const faqs = [
  {
    question: "Is it always better to buy than rent?",
    answer:
      "Not necessarily. Buying is generally better for long-term wealth building if you plan to stay in the home for at least 5 to 7 years and local market conditions support appreciation. However, renting can be the smarter financial move if you need flexibility, live in an extremely expensive market, or if your down payment savings would earn a higher return invested elsewhere.",
  },
  {
    question: "How long do I need to stay in a home for buying to make sense?",
    answer:
      "The typical breakeven point for buying versus renting is 3 to 7 years, depending on your market, purchase price, mortgage rate, and local rent trends. Closing costs, selling costs (typically 6-8% of sale price), and the time it takes to build meaningful equity all factor into this calculation.",
  },
  {
    question: "What tax benefits come with homeownership?",
    answer:
      "Homeowners may deduct mortgage interest (on up to $750,000 of loan debt) and property taxes (up to $10,000 combined with state and local taxes) if they itemize deductions. Additionally, when you sell your primary residence, you can exclude up to $250,000 in capital gains ($500,000 for married couples) from your taxable income.",
  },
  {
    question: "What hidden costs of homeownership should I factor in?",
    answer:
      "Beyond the mortgage, budget for property taxes, homeowner's insurance, maintenance and repairs (typically 1-2% of home value annually), HOA fees (if applicable), utilities, landscaping, and periodic major expenses like roof replacement or HVAC systems. These costs do not exist for renters.",
  },
  {
    question: "How does home appreciation affect the rent vs. buy decision?",
    answer:
      "Home appreciation is one of the biggest factors. Historically, U.S. home values have appreciated 3-4% annually on average, though this varies widely by market and time period. In high-appreciation markets, buying becomes more favorable faster. In flat or declining markets, renting can be the better financial choice.",
  },
];

const otherCalculators = [
  { label: "Home Affordability", href: "/calculators/affordability" },
  { label: "Mortgage Payment", href: "/calculators/mortgage-payment" },
  { label: "Closing Costs", href: "/calculators/closing-costs" },
];

export default function RentVsBuyCalculatorPage() {
  return (
    <>
      <HeroSection
        variant="product"
        headline="Rent vs. Buy Calculator"
        subheadline="Make the Right Housing Decision for Your Financial Future"
        description="Compare the long-term costs of renting and buying to see which option builds more wealth over your planned time horizon."
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
                  [Rent vs. Buy Calculator Embed]
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
                        Enter Your Rental Costs
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Input your current monthly rent and expected annual rent
                        increases (typically 3-5% per year in most markets).
                        Include renter&apos;s insurance if you carry a policy.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        Enter Purchase Details
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Input the home price you are considering, your down
                        payment, expected mortgage rate, property tax rate, and
                        estimated maintenance costs. The more accurate your
                        inputs, the more useful the comparison.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        Set Your Time Horizon
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        How long do you plan to stay? This is the most important
                        variable. The longer you stay, the more buying typically
                        favors you due to equity building, appreciation, and
                        fixed mortgage payments versus rising rents.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Factors */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  Key Factors in the Rent vs. Buy Decision
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  This is not just a financial calculation. Your housing decision
                  involves both numbers and lifestyle considerations. Here are
                  the factors that matter most.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Equity Building
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Every mortgage payment builds equity in your home. Over
                        time, you own a larger share of an appreciating asset.
                        Rent payments, by contrast, build equity for your
                        landlord. After 30 years, a homeowner has a paid-off
                        asset while a renter has nothing.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Opportunity Cost
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Your down payment could be invested in stocks, bonds, or
                        other assets. If those investments outperform real estate
                        in your area, renting and investing the difference could
                        be the better wealth-building strategy for your
                        situation.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Flexibility vs. Stability
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Renting offers flexibility to move for jobs, lifestyle
                        changes, or market shifts. Buying offers payment
                        stability (fixed-rate mortgages do not increase) and
                        freedom to customize your home. Consider which matters
                        more in your current life stage.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-heading font-semibold text-foreground">
                        Market Conditions
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Local housing market conditions play a major role. In
                        markets where the price-to-rent ratio is high (homes
                        cost much more than renting), renting may be more
                        economical. In markets with strong appreciation and
                        reasonable prices, buying sooner builds wealth faster.
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
                      Questions to Ask Yourself
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <li>
                        Will I stay in this area for at least 5 years? If not,
                        renting is likely the safer choice.
                      </li>
                      <li>
                        Do I have a stable emergency fund beyond my down payment?
                        Homeownership comes with unexpected expenses.
                      </li>
                      <li>
                        Am I financially ready for the full cost of
                        homeownership, including maintenance, taxes, and
                        insurance?
                      </li>
                      <li>
                        Is the local market favoring buyers or sellers? A
                        buyer&apos;s market may offer better value.
                      </li>
                      <li>
                        Would I rather invest my down payment in the stock market
                        or in real estate? Both carry risk and reward.
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
                  title="Ready to Buy?"
                  description="See what rates you qualify for and take the first step toward homeownership."
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
