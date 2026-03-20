# Sanity CMS Integration Design

**Date:** 2026-03-11
**Project:** Mortgage Boilerplate
**Status:** Approved

---

## Overview

Add Sanity CMS to the mortgage boilerplate so all page content is editable from Sanity Studio. The boilerplate is cloned per client, so each clone gets its own Sanity project and dataset. The Studio is embedded in the Next.js app at `/studio`.

The content model uses a hybrid approach: block-based page builder for flexible pages (homepage, landing pages) and fixed schemas for structured pages (loan product pages). Blog posts use markdown for the body field. Every document type includes SEO fields.

---

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Sanity per client | One project per clone | Full isolation, simple cloning |
| Studio location | Embedded at `/studio` | One repo per client, single deploy |
| Page building | Hybrid (blocks + fixed) | Flexible where needed, structured where it matters |
| Blog content | Markdown | Simpler authoring, clean output |
| SEO fields | On every document type | Every page must be individually optimizable |
| Site config | Sanity singleton | Clients update branding without code changes |
| Calculators | Code only, embed via block | Third-party scripts, no Sanity fields needed |
| Guides/whitepapers | Managed in Sanity | Title, description, cover image, PDF upload |
| Team members | Standalone document type | Referenceable from blog posts and pages |

---

## Sanity Schema Architecture

### Singleton Documents

**Site Settings**
- Company name, phone, NMLS number, address
- Logo (image)
- Social links (Facebook, Twitter, Instagram, LinkedIn, YouTube)
- Footer text
- Default SEO fields
- Apply/CTA URL

**Homepage**
- Array of page builder blocks
- SEO object

**About Page**
- Intro content, mission statement
- Array of page builder blocks
- SEO object

### Collection Documents

**Product Page**
Fixed schema, one document per loan type.
- Title, subtitle, hero description
- "What is it" section (title + content)
- Benefits (array of strings)
- Requirements (array of label/value pairs)
- Process steps (array of title/description)
- FAQs (array of question/answer)
- SEO object

**Blog Post**
- Title, slug (auto-generated)
- Excerpt
- Category (string, e.g. "Refinancing", "FHA Loans", "VA Loans", "Education", "Tips", "HELOC", "Market Updates")
- Featured image with alt text
- Markdown body
- Author (reference to Team Member)
- Publish date
- Read time
- SEO object

**Guide / Whitepaper**
- Title, slug
- Description
- Cover image
- PDF file upload
- Page count
- SEO object

**Team Member**
- Name, title, NMLS number
- Bio (text)
- Photo with alt text
- Contact info (email, phone)

**Landing Page** (PPC)
- Title, slug
- Array of page builder blocks
- Uses PPC layout (no site nav/footer)
- SEO object

### Reusable Objects

**SEO Object** (shared across all document types)
- Meta title
- Meta description
- OG image
- Canonical URL
- No-index toggle

### Page Builder Blocks

| Block Type | Sanity Fields |
|-----------|---------------|
| **Hero** | Heading, subheading, CTA text, CTA link, background image |
| **Stats Counter** | Array of stats (value, prefix, suffix, label) |
| **Process Steps** | Array of steps (number, title, description) |
| **Product Cards** | References to Product Page documents, or manual entries |
| **Testimonials** | Array of testimonials (name, location, rating, text, date) |
| **Trust Badges** | Badge list (image + label), or use defaults |
| **Blog Cards** | Number to display, optional category filter |
| **FAQ** | Array of question/answer pairs |
| **CTA** | Heading, description, button text, button link, show phone toggle |
| **Lead Capture Form** | Heading, description, form fields configuration |
| **Guide Download** | Reference to a Guide/Whitepaper document |
| **Code Embed** | Raw code/script textarea (for calculators, third-party widgets) |
| **Rich Text** | Portable Text for freeform content sections |

---

## Data Flow & Frontend Architecture

### Sanity Client Setup

A shared Sanity client configured in `src/lib/sanity/client.ts` using `next-sanity`. Provides both a public client (for server component fetching) and a preview client (for draft mode).

### GROQ Queries

Each page type has a corresponding query file in `src/lib/sanity/queries/`. Queries resolve all references inline (team members on blog posts, product pages on product card blocks, guides on download blocks).

### Server Components

All page routes remain React Server Components. Content is fetched server-side from Sanity. No client-side data fetching for content.

### Revalidation

A Next.js API route at `/api/revalidate` receives Sanity webhooks on content publish. Uses a shared secret for authentication. Triggers on-demand ISR revalidation for the affected paths.

### Block Renderer

A `BlockRenderer` component maps each block `_type` to its corresponding React component. Pages with block arrays pass them through this renderer.

```
Page (Server Component)
  -> GROQ query fetches blocks[]
  -> BlockRenderer maps _type to component
  -> Each section component renders with Sanity data as props
```

### Preview Mode

Sanity Studio's live preview uses `next-sanity` draft mode integration. Editors see draft content in real time before publishing.

### File Structure

```
src/
  lib/
    sanity/
      client.ts              # Sanity client configuration
      image.ts               # Image URL builder helper
      queries/
        settings.ts          # Site settings query
        homepage.ts          # Homepage blocks query
        product-page.ts      # Product page query
        blog.ts              # Blog list + detail queries
        landing-page.ts      # PPC landing page query
        about.ts             # About page query
        guides.ts            # Guides/whitepapers query
      blocks.ts              # Block _type to component mapping
  app/
    studio/[[...index]]/
      page.tsx               # Embedded Sanity Studio
    api/
      revalidate/
        route.ts             # Webhook revalidation endpoint
  sanity/
    schemas/
      documents/
        settings.ts          # Site Settings singleton
        homepage.ts          # Homepage singleton
        about.ts             # About Page singleton
        product-page.ts      # Product Page
        blog-post.ts         # Blog Post
        guide.ts             # Guide/Whitepaper
        team-member.ts       # Team Member
        landing-page.ts      # Landing Page (PPC)
      objects/
        seo.ts               # Reusable SEO object
      blocks/
        hero.ts
        stats-counter.ts
        process-steps.ts
        product-cards.ts
        testimonials.ts
        trust-badges.ts
        blog-cards.ts
        faq.ts
        cta.ts
        lead-capture-form.ts
        guide-download.ts
        code-embed.ts
        rich-text.ts
      index.ts               # Schema export
    desk-structure.ts        # Custom Studio sidebar
    sanity.config.ts         # Studio configuration
```

---

## Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=     # From Sanity project
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-11
SANITY_API_TOKEN=                  # Server-side, for revalidation
SANITY_REVALIDATE_SECRET=          # Webhook secret
```

---

## Implementation Phases

### Phase 1: Foundation

- Install `next-sanity`, `sanity`, `sanity-plugin-markdown`
- Set up Sanity client, environment variables, project configuration
- Embed Sanity Studio at `/studio` route
- Create SEO object schema
- Create Site Settings singleton schema
- Configure custom desk structure
- Wire Site Settings to header and footer, replacing `siteConfig` imports

### Phase 2: Product Pages

- Create Product Page document schema (fixed structure)
- Write GROQ queries for product pages
- Refactor all 7 product page routes to fetch from Sanity
- Seed Sanity with current `productPageData` content

### Phase 3: Page Builder

- Create all block schemas (hero, stats, CTA, testimonials, etc.)
- Build the `BlockRenderer` component
- Create Homepage singleton schema with block array
- Refactor homepage to use block renderer
- Seed homepage with current block arrangement

### Phase 4: Blog & Content

- Create Blog Post schema with markdown field and SEO
- Create Team Member document schema
- Create Guide/Whitepaper document schema
- Refactor blog index, blog detail, about page, and guides page
- Seed all current placeholder content into Sanity

### Phase 5: Landing Pages & Cleanup

- Create Landing Page schema (block-based, PPC layout)
- Refactor PPC route group to fetch from Sanity
- Set up revalidation webhook API route
- Set up preview/draft mode
- Delete `src/lib/data.ts`
- End-to-end test: edit content in Studio, publish, verify on frontend

### Phase 6: Documentation

- Write "New Client Setup" guide: create Sanity project, configure env vars, seed content, deploy
- Document the block library for content editors (what each block does, required fields)
- Add setup instructions to the project README

---

## New Client Setup Flow (Post-Implementation)

1. Clone the boilerplate repo
2. Run `npx sanity init` or create a project in Sanity dashboard
3. Set environment variables (project ID, dataset, tokens)
4. Run the Studio at `/studio`, populate Site Settings
5. Seed or create content (product pages, homepage blocks, blog posts)
6. Deploy to Vercel (or host of choice)
7. Configure Sanity webhook pointing to `/api/revalidate`
