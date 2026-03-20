import type { Metadata } from "next";
import { getSettings } from "@/lib/sanity/queries/settings";
import { HeroSection } from "@/components/sections/hero-section";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: "Terms of Use",
    description: `Terms and conditions for using the ${settings.company} website and services.`,
  };
}

export default async function TermsPage() {
  const settings = await getSettings();

  return (
    <>
      <HeroSection
        variant="page"
        headline="Terms of Use"
        subheadline="Website Terms & Conditions"
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground mb-10">
            Last updated: January 1, 2026
          </p>

          <div className="prose prose-lg max-w-none">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Acceptance of Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using this website, you accept and agree to be
              bound by the terms and conditions described herein. If you do not
              agree with these terms, please do not use this website.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              Use of Website
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The content on this website is provided for general informational
              purposes only. {settings.company} makes no representations or
              warranties regarding the accuracy, completeness, or suitability of
              the information provided.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You agree to use this website only for lawful purposes and in a
              manner that does not infringe upon the rights of, or restrict the
              use and enjoyment of this website by, any third party.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              Not a Commitment to Lend
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Nothing on this website constitutes a commitment or offer to lend.
              All loan applications are subject to credit approval, underwriting
              guidelines, and verification of information. Interest rates,
              programs, and terms are subject to change without notice.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              Calculator and Tool Disclaimers
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Any calculators, tools, or estimates provided on this website are
              for illustrative purposes only. Results are based on the
              information you provide and should not be relied upon as a
              guarantee of actual loan terms, payments, or eligibility. Your
              actual results may differ based on your specific financial
              situation.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              Intellectual Property
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on this website, including text, graphics, logos,
              images, and software, is the property of {settings.company} or
              its content suppliers and is protected by copyright, trademark,
              and other intellectual property laws. You may not reproduce,
              distribute, modify, or create derivative works from any content
              without our express written permission.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              Third-Party Links
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This website may contain links to third-party websites.{" "}
              {settings.company} does not control or endorse these websites
              and is not responsible for their content, privacy practices, or
              availability. Your use of third-party websites is at your own
              risk.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              Limitation of Liability
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by law, {settings.company}{" "}
              shall not be liable for any direct, indirect, incidental, special,
              consequential, or punitive damages arising from your use of, or
              inability to use, this website or its content.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              Indemnification
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to indemnify and hold harmless {settings.company},
              its officers, directors, employees, and agents from any claims,
              damages, losses, or expenses arising from your use of this website
              or violation of these terms.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              Governing Law
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms shall be governed by and construed in accordance with
              the laws of the State of Michigan, without regard to its conflict
              of laws provisions. Any disputes arising under these terms shall be
              resolved in the courts of Oakland County, Michigan.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              Changes to Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {settings.company} reserves the right to modify these terms at
              any time. Changes will be effective immediately upon posting to
              this website. Your continued use of the website after any changes
              constitutes acceptance of the revised terms.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              Contact Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms of Use, please contact us:
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {settings.company}
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
