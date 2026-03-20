import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { HeroSection } from "@/components/sections/hero-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { LeadCaptureForm } from "@/components/sections/lead-capture-form";
import { type ProductPageData } from "@/lib/sanity/queries/product-page";

export function ProductPageTemplate({
  data,
  children,
}: {
  data: ProductPageData;
  children?: React.ReactNode;
}) {
  return (
    <>
      <HeroSection
        variant="product"
        headline={data.title}
        subheadline={data.subtitle}
        description={data.heroDescription}
      />
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              {/* What Is section */}
              {data.whatIs && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                    {data.whatIs.title}
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {data.whatIs.content}
                  </p>
                </div>
              )}

              {/* Benefits */}
              {data.benefits && data.benefits.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                    Key Benefits
                  </h2>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {data.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-sm text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {data.requirements && data.requirements.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                    Requirements
                  </h2>
                  <Card className="mt-6">
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {data.requirements.map((req) => (
                          <div key={req.label} className="flex items-center justify-between px-6 py-4">
                            <span className="text-sm font-medium text-foreground">{req.label}</span>
                            <span className="text-sm text-muted-foreground">{req.value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Process */}
              {data.process && data.process.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                    The Process
                  </h2>
                  <div className="mt-6 space-y-6">
                    {data.process.map((step, index) => (
                      <div key={step.title} className="flex gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-foreground">{step.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Per-page custom content */}
              {children}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <LeadCaptureForm variant="full" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {data.faqs && data.faqs.length > 0 && <FAQSection faqs={data.faqs} />}
      <CTASection />
    </>
  );
}
