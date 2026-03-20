import type { Metadata } from "next";
import { getSettings } from "@/lib/sanity/queries/settings";
import { HeroSection } from "@/components/sections/hero-section";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: "Disclosures",
    description: `Important lending disclosures and regulatory information for ${settings.company}.`,
  };
}

export default async function DisclosuresPage() {
  const settings = await getSettings();

  return (
    <>
      <HeroSection
        variant="page"
        headline="Disclosures"
        subheadline="Important Lending Information"
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Licensing Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {settings.company} is a licensed mortgage lender. NMLS #
              {settings.nmls}. For verification of our license, visit the
              Nationwide Multistate Licensing System at{" "}
              <a
                href="https://www.nmlsconsumeraccess.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline"
              >
                www.nmlsconsumeraccess.org
              </a>
              .
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              Equal Housing Lender
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {settings.company} is an Equal Housing Lender. We do not
              discriminate on the basis of race, color, religion, national
              origin, sex, handicap, or familial status (having children under
              the age of 18).
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              Loan Product Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This is not a commitment to lend. Not all borrowers will qualify.
              Programs, rates, terms, and conditions are subject to change
              without notice. All loans are subject to credit and property
              approval. Other restrictions and limitations may apply.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Interest rates and annual percentage rates (APRs) shown are for
              illustrative purposes only and may not reflect the actual rates
              available at the time of application. Your actual rate will depend
              on a variety of factors including credit score, loan amount, loan
              term, loan-to-value ratio, and property type.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              FHA Loan Disclosures
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              FHA loans require mortgage insurance premiums (MIP), which include
              an upfront MIP of 1.75% of the base loan amount and an annual MIP
              that varies based on the loan term, loan amount, and
              loan-to-value ratio. MIP is required for the life of most FHA
              loans.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              FHA cash-out refinance loans allow borrowers to refinance up to
              80% of the property's appraised value. The property must be the
              borrower's primary residence, and the borrower must have owned and
              occupied the property for at least 12 months prior to the
              application date.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              VA Loan Disclosures
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              VA loans are available to eligible veterans, active-duty service
              members, and surviving spouses. A Certificate of Eligibility (COE)
              is required. VA loans may require a funding fee, which can be
              financed into the loan amount. The funding fee is waived for
              veterans receiving VA disability compensation.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              HELOC Disclosures
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Home Equity Lines of Credit (HELOCs) are variable-rate products.
              The Annual Percentage Rate (APR) may increase after consummation.
              The maximum APR that can apply is 18%. Your home is used as
              collateral and may be subject to foreclosure if you fail to make
              payments. Consult your tax advisor regarding the deductibility of
              interest.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              Website Disclaimers
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The information provided on this website is for general
              informational and educational purposes only and should not be
              construed as financial or legal advice. We recommend consulting
              with a qualified professional for advice specific to your
              situation.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Calculators and tools on this website provide estimates based on
              the information you enter and do not guarantee actual loan terms,
              payments, or eligibility. Actual results may vary.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              Contact Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {settings.company}
              <br />
              NMLS #{settings.nmls}
              <br />
              {settings.address}
              <br />
              Phone:{" "}
              <a
                href={`tel:${settings.phone}`}
                className="text-primary hover:text-primary/80 underline"
              >
                {settings.phoneFormatted}
              </a>
              <br />
              Email:{" "}
              <a
                href={`mailto:${settings.email}`}
                className="text-primary hover:text-primary/80 underline"
              >
                {settings.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
