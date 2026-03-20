import { HeroSection } from "@/components/sections/hero-section";
import { StatsCounter } from "@/components/sections/stats-counter";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ProductCards } from "@/components/sections/product-cards";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustBadges } from "@/components/sections/trust-badges";
import { BlogCards } from "@/components/sections/blog-cards";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { LeadCaptureForm } from "@/components/sections/lead-capture-form";
import { GuideDownload } from "@/components/sections/guide-download";
import { CodeEmbed } from "./code-embed";
import { RichTextBlock } from "./rich-text-block";
import { MarkdownBlock } from "./markdown-block";

type Block = {
  _type: string;
  _key: string;
  [key: string]: any;
};

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  if (!blocks) return null;

  return (
    <>
      {blocks.map((block) => {
        switch (block._type) {
          case "heroBlock":
            return (
              <HeroSection
                key={block._key}
                headline={block.headline}
                subheadline={block.subheadline}
                description={block.description}
                ctaText={block.ctaText}
                ctaHref={block.ctaHref}
                variant={block.variant}
                showForm={block.showForm}
                showStats={block.showStats}
              />
            );
          case "statsCounterBlock":
            return <StatsCounter key={block._key} stats={block.stats} />;
          case "processStepsBlock":
            return (
              <ProcessSteps
                key={block._key}
                steps={block.steps}
                title={block.title}
                subtitle={block.subtitle}
              />
            );
          case "productCardsBlock":
            return (
              <ProductCards
                key={block._key}
                products={block.products || []}
                title={block.title}
                subtitle={block.subtitle}
                showAll={block.showAll}
              />
            );
          case "testimonialsBlock":
            return (
              <Testimonials
                key={block._key}
                testimonials={block.testimonials}
                title={block.title}
                subtitle={block.subtitle}
              />
            );
          case "trustBadgesBlock":
            return <TrustBadges key={block._key} variant={block.variant} />;
          case "blogCardsBlock":
            return (
              <BlogCards
                key={block._key}
                posts={block.posts || []}
                limit={block.limit}
                title={block.title}
                subtitle={block.subtitle}
                showViewAll={block.showViewAll}
              />
            );
          case "faqBlock":
            return (
              <FAQSection
                key={block._key}
                faqs={block.faqs}
                title={block.title}
                subtitle={block.subtitle}
              />
            );
          case "ctaBlock":
            return (
              <CTASection
                key={block._key}
                title={block.title}
                description={block.description}
                primaryText={block.primaryText}
                primaryHref={block.primaryHref}
                showPhone={block.showPhone}
                variant={block.variant}
              />
            );
          case "leadCaptureFormBlock":
            return (
              <LeadCaptureForm
                key={block._key}
                variant={block.variant}
                title={block.title}
                description={block.description}
              />
            );
          case "guideDownloadBlock":
            return (
              <GuideDownload
                key={block._key}
                title={block.guide?.title}
                description={block.guide?.description}
                pages={block.guide?.pages}
                slug={block.guide?.slug}
              />
            );
          case "codeEmbedBlock":
            return <CodeEmbed key={block._key} code={block.code} />;
          case "richTextBlock":
            return <RichTextBlock key={block._key} content={block.content} />;
          case "markdownBlock":
            return <MarkdownBlock key={block._key} content={block.content} />;
          default:
            console.warn(`Unknown block type: ${block._type}`);
            return null;
        }
      })}
    </>
  );
}
