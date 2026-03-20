import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { GuideDownload } from "@/components/sections/guide-download";
import { getGuides } from "@/lib/sanity/queries/guides";

export const metadata: Metadata = {
  title: "Free Mortgage Guides",
  description:
    "Download free mortgage guides covering FHA loans, first-time homebuying, refinancing, and more. Expert advice to help you make informed decisions.",
};

export default async function GuidesPage() {
  const guides = await getGuides();

  return (
    <>
      <HeroSection
        variant="page"
        headline="Free Mortgage Guides"
        subheadline="Expert resources to help you navigate the mortgage process with confidence."
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Download Our Free Guides
            </h2>
            <p className="mt-3 text-muted-foreground">
              Each guide is packed with actionable advice, step-by-step
              instructions, and insider tips from our lending experts.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:max-w-4xl lg:mx-auto">
            {guides.map((guide) => (
              <GuideDownload
                key={guide.slug}
                title={guide.title}
                description={guide.description}
                pages={guide.pages}
                slug={guide.slug}
                variant="card"
              />
            ))}
          </div>

          {guides.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No guides available yet. Check back soon!
            </p>
          )}
        </div>
      </section>
    </>
  );
}
