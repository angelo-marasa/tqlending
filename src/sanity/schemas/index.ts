import type { SchemaTypeDefinition } from "sanity";
import { seo } from "./objects/seo";
import { settings } from "./documents/settings";
import { productPage } from "./documents/product-page";
import { homepage } from "./documents/homepage";
import { teamMember } from "./documents/team-member";
import { blogPost } from "./documents/blog-post";
import { guide } from "./documents/guide";
import { about } from "./documents/about";
import { landingPage } from "./documents/landing-page";

// Blocks
import { heroBlock } from "./blocks/hero";
import { statsCounterBlock } from "./blocks/stats-counter";
import { processStepsBlock } from "./blocks/process-steps";
import { productCardsBlock } from "./blocks/product-cards";
import { testimonialsBlock } from "./blocks/testimonials";
import { trustBadgesBlock } from "./blocks/trust-badges";
import { blogCardsBlock } from "./blocks/blog-cards";
import { faqBlock } from "./blocks/faq";
import { ctaBlock } from "./blocks/cta";
import { leadCaptureFormBlock } from "./blocks/lead-capture-form";
import { guideDownloadBlock } from "./blocks/guide-download";
import { codeEmbedBlock } from "./blocks/code-embed";
import { richTextBlock } from "./blocks/rich-text";
import { markdownBlock } from "./blocks/markdown";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects
    seo,
    // Documents
    settings,
    productPage,
    homepage,
    teamMember,
    blogPost,
    guide,
    about,
    landingPage,
    // Blocks
    heroBlock,
    statsCounterBlock,
    processStepsBlock,
    productCardsBlock,
    testimonialsBlock,
    trustBadgesBlock,
    blogCardsBlock,
    faqBlock,
    ctaBlock,
    leadCaptureFormBlock,
    guideDownloadBlock,
    codeEmbedBlock,
    richTextBlock,
    markdownBlock,
  ],
};
