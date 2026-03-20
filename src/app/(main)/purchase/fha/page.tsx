import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getProductPage } from "@/lib/sanity/queries/product-page";
import { ProductPageTemplate } from "@/components/templates/product-page-template";

const SLUG = "purchase-fha";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getProductPage(SLUG);
  if (!data) return { title: "FHA Purchase Loan" };
  return {
    title: data.seo?.metaTitle || data.title,
    description: data.seo?.metaDescription || data.heroDescription,
  };
}

export default async function FHAPurchasePage() {
  const data = await getProductPage(SLUG);
  if (!data) notFound();

  return (
    <ProductPageTemplate data={data}>
      {/* Who Is This For? */}
      <div className="rounded-xl bg-muted p-6">
        <h2 className="font-heading text-xl font-bold text-foreground">Who Is an FHA Loan For?</h2>
        <ul className="mt-4 space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">First-time homebuyers who may not have a large down payment saved up</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">Borrowers with credit scores between 580 and 680 who may not qualify for conventional rates</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">Buyers recovering from a past bankruptcy or foreclosure who need a more forgiving program</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">Homebuyers with higher debt-to-income ratios who still want to qualify for a mortgage</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">Anyone looking to purchase a primary residence with as little as 3.5% down</span>
          </li>
        </ul>
      </div>

      {/* Mid-content CTA */}
      <div className="rounded-xl bg-primary p-8 text-primary-foreground">
        <h2 className="font-heading text-2xl font-bold">Ready to See Your Rates?</h2>
        <p className="mt-2 text-primary-foreground/80">Find out if you qualify for an FHA loan in minutes. Low down payment, flexible credit requirements, zero obligation.</p>
        <a href="/apply" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors">
          Check Your Rates <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {/* Comparison */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          FHA vs. Conventional: How They Compare
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold text-foreground">FHA Loan</h3>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Minimum 580 credit score for 3.5% down
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Down payment as low as 3.5%
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Allows higher debt-to-income ratios (up to 57% in some cases)
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  More forgiving of past credit issues
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold text-foreground">Conventional Loan</h3>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  PMI can be removed at 20% equity
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  No upfront mortgage insurance premium required
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Better rates for borrowers with 740+ credit scores
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Available for second homes and investment properties
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Advice */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          What to Know Before Applying for an FHA Loan
        </h2>
        <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            FHA loans require two types of mortgage insurance: an upfront premium (UFMIP) of 1.75% of the loan amount, and an annual premium that is divided into monthly payments. The upfront premium can be rolled into your loan balance so you do not need to pay it out of pocket at closing. Understanding these costs upfront helps you accurately compare FHA to other loan options.
          </p>
          <p>
            The property you purchase with an FHA loan must meet minimum safety and livability standards set by HUD. An FHA appraiser will inspect the home for issues like peeling paint, exposed wiring, and structural concerns. If the property does not pass inspection, the seller may need to make repairs before the loan can close. This is designed to protect you from buying a home with serious problems, but it can sometimes slow down the process with certain properties.
          </p>
          <p>
            One strategy many FHA borrowers use is to refinance into a conventional loan once they have built enough equity and improved their credit. This lets you take advantage of the accessible FHA requirements now and move into a loan without permanent mortgage insurance later. Your lender can help you map out a timeline for when this transition might make financial sense.
          </p>
        </div>
      </div>

      {/* Pro Tip */}
      <div className="border-l-4 border-secondary bg-secondary/10 p-6 rounded-r-lg">
        <p className="font-heading font-semibold text-foreground">Pro Tip</p>
        <p className="mt-1 text-sm text-muted-foreground">Ask your lender about down payment assistance programs in your area. Many state and local programs can be combined with FHA loans, sometimes covering your entire 3.5% down payment through grants or forgivable loans. This can make homeownership possible even if your savings are limited.</p>
      </div>
    </ProductPageTemplate>
  );
}
