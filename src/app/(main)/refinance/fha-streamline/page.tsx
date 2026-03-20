import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getProductPage } from "@/lib/sanity/queries/product-page";
import { ProductPageTemplate } from "@/components/templates/product-page-template";

const SLUG = "refinance-fha-streamline";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getProductPage(SLUG);
  if (!data) return { title: "FHA Streamline Refinance" };
  return {
    title: data.seo?.metaTitle || data.title,
    description: data.seo?.metaDescription || data.heroDescription,
  };
}

export default async function FHAStreamlineRefinancePage() {
  const data = await getProductPage(SLUG);
  if (!data) notFound();

  return (
    <ProductPageTemplate data={data}>
      {/* Who Is This For? */}
      <div className="rounded-xl bg-muted p-6">
        <h2 className="font-heading text-xl font-bold text-foreground">Who Is an FHA Streamline Refinance For?</h2>
        <ul className="mt-4 space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">Current FHA borrowers who want to lower their interest rate with minimal paperwork</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">Homeowners who want to refinance without a new appraisal or extensive income verification</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">FHA borrowers with on-time mortgage payments for at least the last six months</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">Those who want to switch from an adjustable-rate FHA loan to a fixed-rate FHA loan</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">Borrowers who need a fast closing timeline with reduced documentation requirements</span>
          </li>
        </ul>
      </div>

      {/* Mid-content CTA */}
      <div className="rounded-xl bg-primary p-8 text-primary-foreground">
        <h2 className="font-heading text-2xl font-bold">Ready to See Your Rates?</h2>
        <p className="mt-2 text-primary-foreground/80">Already have an FHA loan? See how much you could save with a streamline refinance. Quick process, minimal documentation required.</p>
        <a href="/apply" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors">
          Check Your Rates <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {/* Comparison */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          FHA Streamline vs. Full FHA Refinance
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold text-foreground">FHA Streamline</h3>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  No appraisal required in most cases
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Reduced documentation and faster closing
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Lower upfront MIP if original loan was endorsed before June 2009
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Must demonstrate a &quot;net tangible benefit&quot; to the borrower
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold text-foreground">Full FHA Refinance</h3>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Allows cash-out from your home equity
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Full appraisal and income verification required
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Can be used even if your home value has declined
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Available for borrowers with any type of existing mortgage
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Advice */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Key Considerations for FHA Streamline Refinancing
        </h2>
        <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            The FHA streamline refinance requires what HUD calls a &quot;net tangible benefit.&quot; This means the refinance must result in a lower combined rate (interest rate plus MIP), a shorter loan term, or a switch from an adjustable rate to a fixed rate. Your lender cannot process the refinance unless at least one of these conditions is met. This rule exists to protect borrowers from refinancing into a worse deal.
          </p>
          <p>
            There are two versions of the FHA streamline: credit-qualifying and non-credit-qualifying. The non-credit-qualifying version is the faster option. It does not require income documentation, employment verification, or a credit score check. However, your lender may still pull your credit to confirm you have been making on-time payments. You must have made at least six monthly payments on your current FHA loan, and at least 210 days must have passed since your first payment.
          </p>
          <p>
            If your original FHA loan was endorsed before June 1, 2009, you may qualify for significantly reduced MIP rates on the streamline. This discount can save you hundreds of dollars per year. Even if your loan was originated after that date, the streamline can still save you money if rates have dropped since you closed your original mortgage. Ask your lender to run a side-by-side comparison of your current and proposed payments.
          </p>
        </div>
      </div>

      {/* Pro Tip */}
      <div className="border-l-4 border-secondary bg-secondary/10 p-6 rounded-r-lg">
        <p className="font-heading font-semibold text-foreground">Pro Tip</p>
        <p className="mt-1 text-sm text-muted-foreground">With an FHA streamline, you can roll closing costs into the new loan balance rather than paying them out of pocket. While this slightly increases your loan amount, it means you can reduce your rate and monthly payment without bringing any cash to closing. Just make sure the savings still exceed the added cost over time.</p>
      </div>
    </ProductPageTemplate>
  );
}
