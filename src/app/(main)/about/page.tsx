import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { TrustBadges } from "@/components/sections/trust-badges";
import { getAboutPage } from "@/lib/sanity/queries/about";
import { BlockRenderer } from "@/components/blocks/block-renderer";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutPage();
  return {
    title: data?.seo?.metaTitle || "About Us",
    description: data?.seo?.metaDescription || "Learn about our team and mission.",
  };
}

export default async function AboutPage() {
  const data = await getAboutPage();

  return (
    <>
      <HeroSection variant="page" headline="About Mortgage Pipeline" subheadline="Your Trusted Partner in Home Financing" />

      {/* Mission section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-secondary">Our Mission</p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {data?.missionTitle || "Making Homeownership Accessible"}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {data?.missionText || "At Mortgage Pipeline, we believe everyone deserves the opportunity to own a home."}
            </p>
          </div>
        </div>
      </section>

      {/* Page builder blocks (e.g., stats counter) */}
      {data?.blocks && <BlockRenderer blocks={data.blocks} />}

      {/* Team section */}
      {data?.teamMembers && data.teamMembers.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-24 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-secondary">Our Team</p>
              <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Meet Our Loan Officers
              </h2>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {data.teamMembers.map((member) => (
                <Card key={member.name} className="overflow-hidden">
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground font-heading text-3xl font-bold">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-heading text-lg font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-secondary font-medium">{member.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">NMLS #{member.nmls}</p>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <TrustBadges variant="dark" />
      <CTASection variant="centered" />
    </>
  );
}
