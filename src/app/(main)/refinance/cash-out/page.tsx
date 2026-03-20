import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getProductPage } from "@/lib/sanity/queries/product-page";
import { ProductPageTemplate } from "@/components/templates/product-page-template";

const SLUG = "refinance-cash-out";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getProductPage(SLUG);
  if (!data) return { title: "Cash-Out Refinance" };
  return {
    title: data.seo?.metaTitle || data.title,
    description: data.seo?.metaDescription || data.heroDescription,
  };
}

export default async function CashOutRefinancePage() {
  const data = await getProductPage(SLUG);
  if (!data) notFound();

  return (
    <ProductPageTemplate data={data}>
      {/* Who Is This For? */}
      <div className="rounded-xl bg-muted p-6">
        <h2 className="font-heading text-xl font-bold text-foreground">Who Is a Cash-Out Refinance For?</h2>
        <ul className="mt-4 space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">Homeowners with significant equity who need funds for home improvements or renovations</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">Borrowers looking to consolidate high-interest credit card or personal loan debt</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">Parents who want to access equity to fund college tuition or education expenses</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">Investors who want to pull equity from one property to purchase another</span>
          </li>
        </ul>
      </div>

      {/* Mid-content CTA */}
      <div className="rounded-xl bg-primary p-8 text-primary-foreground">
        <h2 className="font-heading text-2xl font-bold">Ready to See Your Rates?</h2>
        <p className="mt-2 text-primary-foreground/80">Find out how much equity you can access. Get a personalized cash-out refinance quote with no obligation.</p>
        <a href="/apply" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors">
          Check Your Rates <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {/* Comparison */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Cash-Out Refinance vs. HELOC: How They Compare
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold text-foreground">Cash-Out Refinance</h3>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Fixed interest rate and predictable monthly payments
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Replaces your existing mortgage with a single new loan
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Lump sum payout at closing
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  May allow you to lock in a lower rate than your current mortgage
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold text-foreground">HELOC</h3>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Revolving credit line you draw from as needed
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Only pay interest on what you borrow
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Keeps your existing mortgage in place
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Variable rate, typically lower closing costs
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Advice */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Smart Ways to Use Your Cash-Out Funds
        </h2>
        <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            The most financially productive use of cash-out funds is typically home improvements that increase your property value. Kitchen and bathroom remodels, adding a bedroom, or finishing a basement can return 60-80% or more of the investment in added home value. This means you are essentially reinvesting the equity back into the asset, and in many cases the interest on funds used for home improvements may be tax-deductible.
          </p>
          <p>
            Debt consolidation is another popular use, but it requires discipline. Rolling $30,000 in credit card debt at 22% interest into a mortgage at 6-7% can save significant money on interest. However, if you run up new balances on those credit cards afterward, you will be worse off than before. Consider closing or freezing the accounts after paying them off with the refinance proceeds.
          </p>
          <p>
            Keep in mind that most lenders require you to retain at least 20% equity after the cash-out. For example, if your home is worth $400,000, you can typically borrow up to 80% of its value ($320,000) minus your existing mortgage balance. Your lender will order a new appraisal to determine your current home value, so any recent improvements you have made could work in your favor.
          </p>
        </div>
      </div>

      {/* Pro Tip */}
      <div className="border-l-4 border-secondary bg-secondary/10 p-6 rounded-r-lg">
        <p className="font-heading font-semibold text-foreground">Pro Tip</p>
        <p className="mt-1 text-sm text-muted-foreground">Before choosing a cash-out refinance, compare the total interest cost over the life of the new loan against your current mortgage. If your existing rate is significantly lower than today&apos;s rates, a HELOC might be a better option since it does not disturb your primary mortgage. Run the numbers both ways with your loan officer.</p>
      </div>
    </ProductPageTemplate>
  );
}
