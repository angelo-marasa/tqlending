import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getProductPage } from "@/lib/sanity/queries/product-page";
import { ProductPageTemplate } from "@/components/templates/product-page-template";

const SLUG = "purchase-va";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getProductPage(SLUG);
  if (!data) return { title: "VA Purchase Loan" };
  return {
    title: data.seo?.metaTitle || data.title,
    description: data.seo?.metaDescription || data.heroDescription,
  };
}

export default async function VAPurchasePage() {
  const data = await getProductPage(SLUG);
  if (!data) notFound();

  return (
    <ProductPageTemplate data={data}>
      {/* Who Is This For? */}
      <div className="rounded-xl bg-muted p-6">
        <h2 className="font-heading text-xl font-bold text-foreground">Who Is a VA Loan For?</h2>
        <ul className="mt-4 space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">Active-duty service members looking to buy their first or next home</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">Veterans who have served the required minimum active duty period</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">National Guard and Reserve members with qualifying service</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">Surviving spouses of veterans who died in service or from a service-connected disability</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">Eligible service members who want to buy with zero down payment and no PMI</span>
          </li>
        </ul>
      </div>

      {/* Mid-content CTA */}
      <div className="rounded-xl bg-primary p-8 text-primary-foreground">
        <h2 className="font-heading text-2xl font-bold">Ready to See Your Rates?</h2>
        <p className="mt-2 text-primary-foreground/80">Thank you for your service. Let us help you take advantage of VA loan benefits you have earned. Get your personalized rate in minutes.</p>
        <a href="/apply" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors">
          Check Your Rates <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {/* Comparison */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          VA vs. Conventional: How They Compare
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold text-foreground">VA Loan</h3>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Zero down payment required
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  No private mortgage insurance (PMI)
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Typically lower interest rates than conventional loans
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  No prepayment penalties
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
                  No service requirement needed
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  Available for investment properties and second homes
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  No VA funding fee
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  PMI drops off at 20% equity
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Advice */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          What to Know Before Applying for a VA Loan
        </h2>
        <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            The VA funding fee is a one-time payment that helps offset the cost of the VA loan program to taxpayers. For first-time VA loan users with zero down, the fee is typically 2.15% of the loan amount. However, veterans with a service-connected disability are exempt from the funding fee entirely. The fee can also be reduced by making a down payment, and it can be financed into the loan so it does not have to come out of pocket at closing.
          </p>
          <p>
            VA loans do not have a set minimum credit score from the VA itself, but most lenders require at least a 620 score. Some lenders specialize in working with lower credit scores for VA borrowers, so shopping around can make a real difference. Your Certificate of Eligibility (COE) is the first document you will need, and your lender can often pull it electronically within minutes.
          </p>
          <p>
            One of the most valuable aspects of the VA loan benefit is that it can be used more than once. If you sell your current home and pay off the VA loan, your full entitlement is restored. You can even have two VA loans at the same time in certain situations, such as receiving PCS orders. Understanding your remaining entitlement can open doors you may not have considered.
          </p>
        </div>
      </div>

      {/* Pro Tip */}
      <div className="border-l-4 border-secondary bg-secondary/10 p-6 rounded-r-lg">
        <p className="font-heading font-semibold text-foreground">Pro Tip</p>
        <p className="mt-1 text-sm text-muted-foreground">If you have a service-connected disability rating of 10% or more, you are exempt from the VA funding fee, which can save you thousands of dollars. Make sure your lender has your disability rating documentation before closing so the exemption is applied correctly.</p>
      </div>
    </ProductPageTemplate>
  );
}
