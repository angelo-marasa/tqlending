import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getProductPage } from "@/lib/sanity/queries/product-page";
import { ProductPageTemplate } from "@/components/templates/product-page-template";

const SLUG = "heloc";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getProductPage(SLUG);
  if (!data) return { title: "HELOC" };
  return {
    title: data.seo?.metaTitle || data.title,
    description: data.seo?.metaDescription || data.heroDescription,
  };
}

export default async function HELOCPage() {
  const data = await getProductPage(SLUG);
  if (!data) notFound();

  return (
    <ProductPageTemplate data={data}>
      {/* Who Is This For? */}
      <div className="rounded-xl bg-muted p-6">
        <h2 className="font-heading text-xl font-bold text-foreground">Who Is a HELOC For?</h2>
        <ul className="mt-4 space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">Homeowners who want flexible access to their equity without refinancing their first mortgage</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">Those planning home renovations or improvements in stages over time</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">Borrowers who want a revolving credit line for emergencies, education, or major purchases</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">Homeowners with a low rate on their first mortgage who do not want to disturb it</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">Those who prefer to only pay interest on what they actually borrow, not a full lump sum</span>
          </li>
        </ul>
      </div>

      {/* Mid-content CTA */}
      <div className="rounded-xl bg-primary p-8 text-primary-foreground">
        <h2 className="font-heading text-2xl font-bold">Ready to See Your Rates?</h2>
        <p className="mt-2 text-primary-foreground/80">Unlock the equity in your home with a flexible HELOC. Find out how much you can access with no obligation.</p>
        <a href="/apply" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors">
          Check Your Rates <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {/* Comparison */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          HELOC vs. Home Equity Loan: How They Compare
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold text-foreground">HELOC</h3>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Revolving credit line with a draw period (typically 10 years)
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Only pay interest on the amount you draw
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Variable interest rate that adjusts with the market
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Ideal for ongoing or phased expenses
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold text-foreground">Home Equity Loan</h3>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  One-time lump sum disbursement at closing
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Fixed interest rate and consistent monthly payments
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Repayment starts immediately on the full amount
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Best for a single large expense with a known cost
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Advice */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          What to Know Before Opening a HELOC
        </h2>
        <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            A HELOC operates in two phases: the draw period and the repayment period. During the draw period (usually 10 years), you can borrow up to your credit limit and typically only need to make interest payments on what you have drawn. Once the repayment period begins (usually 10-20 years), you can no longer draw funds and must pay back both principal and interest. Understand how your payments will change when the draw period ends so there are no surprises.
          </p>
          <p>
            Because most HELOCs carry variable interest rates, your monthly payments can fluctuate as market rates change. Some lenders offer a fixed-rate conversion option that lets you lock a portion of your balance at a fixed rate while keeping the rest variable. This can give you the flexibility of a HELOC with the payment stability of a traditional loan on the amount you have already borrowed.
          </p>
          <p>
            Your combined loan-to-value ratio (CLTV) is one of the most important factors in determining how large your HELOC can be. Most lenders allow a CLTV of up to 85%, meaning your first mortgage balance plus your HELOC limit cannot exceed 85% of your home value. If your home has appreciated significantly since you purchased it, you may have more borrowing power than you expect. A recent appraisal or automated valuation can help you estimate your available equity.
          </p>
        </div>
      </div>

      {/* Pro Tip */}
      <div className="border-l-4 border-secondary bg-secondary/10 p-6 rounded-r-lg">
        <p className="font-heading font-semibold text-foreground">Pro Tip</p>
        <p className="mt-1 text-sm text-muted-foreground">Even if you do not need the funds right away, opening a HELOC when rates are favorable gives you a safety net of available credit. There is no cost to having an open line you are not using, and having it in place means you can act quickly if an opportunity or emergency arises without needing to go through a new application process.</p>
      </div>
    </ProductPageTemplate>
  );
}
