import type { Metadata } from "next";
import { getSettings } from "@/lib/sanity/queries/settings";
import { HeroSection } from "@/components/sections/hero-section";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: "Privacy Policy",
    description: `Privacy policy for ${settings.company}. Learn how we collect, use, and protect your personal information.`,
  };
}

export default async function PrivacyPolicyPage() {
  const settings = await getSettings();

  return (
    <>
      <HeroSection
        variant="page"
        headline="Privacy Policy"
        subheadline="How We Protect Your Information"
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground mb-10">
            Last updated: January 1, 2026
          </p>

          <div className="prose prose-lg max-w-none">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {settings.company} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
              &ldquo;us&rdquo;) is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your personal information when you visit our website,
              use our services, or interact with us.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              Information We Collect
            </h2>
            <h3 className="font-heading text-lg font-semibold text-foreground mt-6">
              Personal Information You Provide
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              When you apply for a loan, request a rate quote, or contact us, we
              may collect the following information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Full name, date of birth, and Social Security number</li>
              <li>Contact information (email, phone number, mailing address)</li>
              <li>Employment and income information</li>
              <li>Financial information (assets, liabilities, credit history)</li>
              <li>Property information (address, value, type)</li>
              <li>Government-issued identification</li>
            </ul>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6">
              Information Collected Automatically
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              When you visit our website, we may automatically collect certain
              information, including your IP address, browser type, operating
              system, referring URLs, pages viewed, and the dates and times of
              your visits.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              How We Use Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Process and evaluate your loan applications</li>
              <li>Provide you with personalized rate quotes</li>
              <li>Communicate with you about your loan or inquiry</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Prevent fraud and protect the security of our services</li>
              <li>Improve our website and services</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              Information Sharing
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell your personal information. We may share your
              information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                Service providers who assist us in loan processing, underwriting,
                and closing
              </li>
              <li>Credit reporting agencies to verify your credit history</li>
              <li>
                Government agencies and regulators as required by law
              </li>
              <li>
                Business partners involved in the loan origination process
              </li>
            </ul>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              Data Security
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures to protect your
              personal information, including encryption, secure data storage,
              access controls, and regular security assessments. However, no
              method of transmission over the Internet or electronic storage is
              100% secure.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              Your Rights
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Depending on your state of residence, you may have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
              <li>
                Opt out of the sale or sharing of your personal information
              </li>
            </ul>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              Cookies and Tracking
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website uses cookies and similar tracking technologies to
              enhance your browsing experience, analyze website traffic, and
              personalize content. You can control cookie preferences through
              your browser settings.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              Changes to This Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. The most
              current version will always be posted on our website with the
              effective date.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
              Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy or our privacy
              practices, please contact us:
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
