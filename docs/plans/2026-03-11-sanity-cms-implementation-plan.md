# Sanity CMS Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Connect the mortgage boilerplate to Sanity CMS so all page content is editable from an embedded Studio, using a hybrid approach of block-based page builder + fixed schemas.

**Architecture:** Sanity Studio embedded at `/studio` in the Next.js app. Content fetched via GROQ queries in server components. Revalidation via webhook. All static data in `src/lib/data.ts` replaced by Sanity documents.

**Tech Stack:** Next.js 16, next-sanity, sanity, sanity-plugin-markdown, Tailwind CSS v4, shadcn/ui, TypeScript

**Design Document:** `docs/plans/2026-03-11-sanity-cms-integration-design.md`

---

## Phase 1: Foundation

### Task 1.1: Install Sanity Dependencies

**Files:**
- Modify: `package.json`
- Modify: `next.config.ts`

**Step 1: Install packages**

Run:
```bash
npm install next-sanity sanity @sanity/image-url @sanity/vision sanity-plugin-markdown
```

**Step 2: Update next.config.ts for Sanity image CDN**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
```

**Step 3: Create .env.local with placeholder values**

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-11
SANITY_API_TOKEN=your-api-token
SANITY_REVALIDATE_SECRET=your-revalidate-secret
```

**Step 4: Add .env.local to .gitignore if not already present**

Check `.gitignore` and ensure `.env.local` is listed.

**Step 5: Create .env.example for cloning reference**

```bash
# .env.example
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-11
SANITY_API_TOKEN=
SANITY_REVALIDATE_SECRET=
```

**Step 6: Commit**

```
feat: install Sanity dependencies and configure environment
```

---

### Task 1.2: Create Sanity Client Configuration

**Files:**
- Create: `src/lib/sanity/client.ts`
- Create: `src/lib/sanity/image.ts`
- Create: `src/lib/sanity/env.ts`

**Step 1: Create env helper**

```typescript
// src/lib/sanity/env.ts
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-11";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
```

**Step 2: Create Sanity client**

```typescript
// src/lib/sanity/client.ts
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// For draft/preview mode
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
```

**Step 3: Create image URL builder**

```typescript
// src/lib/sanity/image.ts
import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
```

**Step 4: Commit**

```
feat: add Sanity client configuration and image helper
```

---

### Task 1.3: Create Sanity Project Configuration

**Files:**
- Create: `sanity.config.ts` (project root)
- Create: `sanity.cli.ts` (project root)

**Step 1: Create sanity.config.ts**

```typescript
// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { markdownSchema } from "sanity-plugin-markdown";
import { apiVersion, dataset, projectId } from "./src/lib/sanity/env";
import { schema } from "./src/sanity/schemas";
import { deskStructure } from "./src/sanity/desk-structure";

export default defineConfig({
  name: "mortgage-boilerplate",
  title: "Mortgage Pipeline",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    markdownSchema(),
  ],
  schema,
});
```

**Step 2: Create sanity.cli.ts**

```typescript
// sanity.cli.ts
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});
```

**Step 3: Commit**

```
feat: add Sanity project configuration files
```

---

### Task 1.4: Create SEO Object Schema

**Files:**
- Create: `src/sanity/schemas/objects/seo.ts`

**Step 1: Create SEO schema**

This is reused on every document type.

```typescript
// src/sanity/schemas/objects/seo.ts
import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Override the page title for search engines (max 60 characters)",
      validation: (rule) => rule.max(60).warning("Meta titles over 60 characters may be truncated in search results"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Description shown in search results (max 160 characters)",
      validation: (rule) => rule.max(160).warning("Meta descriptions over 160 characters may be truncated"),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Image shown when shared on social media (1200x630 recommended)",
      options: { hotspot: true },
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "Override the canonical URL if this page has a preferred version elsewhere",
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      description: "Hide this page from search engines",
      initialValue: false,
    }),
  ],
});
```

**Step 2: Commit**

```
feat: add reusable SEO object schema
```

---

### Task 1.5: Create Site Settings Singleton Schema

**Files:**
- Create: `src/sanity/schemas/documents/settings.ts`

**Step 1: Create settings schema**

```typescript
// src/sanity/schemas/documents/settings.ts
import { defineField, defineType } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      description: "The brand name displayed in the header (e.g. 'FHA Cash Out')",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company Name",
      type: "string",
      description: "Full legal company name (e.g. 'Mortgage Pipeline')",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number (digits only)",
      type: "string",
      description: "Phone number without formatting (e.g. '866-866-0653')",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phoneFormatted",
      title: "Phone Number (display)",
      type: "string",
      description: "Formatted phone number for display (e.g. '(866) 866-0653')",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "nmls",
      title: "NMLS Number",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Office Address",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "applyUrl",
      title: "Apply/CTA URL",
      type: "string",
      description: "URL for the main call-to-action button (default: /apply)",
      initialValue: "/apply",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "logoInitials",
      title: "Logo Initials",
      type: "string",
      description: "Two-letter initials shown when no logo image is uploaded (e.g. 'MP')",
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "object",
      fields: [
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
        defineField({ name: "twitter", title: "Twitter / X", type: "url" }),
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
        defineField({ name: "youtube", title: "YouTube", type: "url" }),
      ],
    }),
    defineField({
      name: "footerText",
      title: "Footer Description",
      type: "text",
      rows: 3,
      description: "Short company description shown in the footer",
    }),
    defineField({
      name: "footerDisclaimer",
      title: "Footer Disclaimer",
      type: "text",
      rows: 3,
      description: "Legal disclaimer shown at the bottom of every page",
    }),
    defineField({
      name: "newsletterTitle",
      title: "Newsletter Section Title",
      type: "string",
      initialValue: "Stay Informed",
    }),
    defineField({
      name: "newsletterDescription",
      title: "Newsletter Description",
      type: "string",
      initialValue: "Get mortgage tips, rate updates, and homeownership guides delivered to your inbox.",
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seo",
      description: "Default SEO values used when pages do not specify their own",
    }),
  ],
  preview: {
    select: {
      title: "siteName",
      subtitle: "company",
    },
  },
});
```

**Step 2: Commit**

```
feat: add Site Settings singleton schema
```

---

### Task 1.6: Create Schema Index and Desk Structure

**Files:**
- Create: `src/sanity/schemas/index.ts`
- Create: `src/sanity/desk-structure.ts`

**Step 1: Create schema index**

This will grow as we add more schemas. Start with what we have.

```typescript
// src/sanity/schemas/index.ts
import type { SchemaTypeDefinition } from "sanity";
import { seo } from "./objects/seo";
import { settings } from "./documents/settings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects
    seo,
    // Documents
    settings,
  ],
};
```

**Step 2: Create desk structure**

```typescript
// src/sanity/desk-structure.ts
import type { StructureBuilder } from "sanity/structure";
import { CogIcon } from "@sanity/icons";

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Settings singleton
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("settings")
            .documentId("settings")
            .title("Site Settings")
        ),
      S.divider(),
      // Filter out singleton types from the default list
      ...S.documentTypeListItems().filter(
        (listItem) => !["settings"].includes(listItem.getId() || "")
      ),
    ]);
```

**Step 3: Commit**

```
feat: add schema index and custom desk structure
```

---

### Task 1.7: Embed Sanity Studio at /studio

**Files:**
- Create: `src/app/studio/[[...tool]]/page.tsx`
- Create: `src/app/studio/[[...tool]]/layout.tsx`

**Step 1: Create Studio layout**

The layout disables the site's own styling from interfering with the Studio.

```typescript
// src/app/studio/[[...tool]]/layout.tsx
export const metadata = {
  title: "Sanity Studio",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
```

**Step 2: Create Studio page**

```typescript
// src/app/studio/[[...tool]]/page.tsx
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

**Step 3: Verify the Studio loads**

Run: `npm run dev`
Navigate to: `http://localhost:3000/studio`
Expected: Sanity Studio loads with "Site Settings" in the sidebar.

**Step 4: Commit**

```
feat: embed Sanity Studio at /studio route
```

---

### Task 1.8: Create Settings GROQ Query and Wire to Header/Footer

**Files:**
- Create: `src/lib/sanity/queries/settings.ts`
- Modify: `src/app/(main)/layout.tsx`
- Modify: `src/components/layout/site-header.tsx`
- Modify: `src/components/layout/site-footer.tsx`

**Step 1: Create settings query**

```typescript
// src/lib/sanity/queries/settings.ts
import { client } from "../client";

export const settingsQuery = `*[_type == "settings"][0]{
  siteName,
  company,
  phone,
  phoneFormatted,
  email,
  nmls,
  address,
  applyUrl,
  "logoUrl": logo.asset->url,
  logoInitials,
  socialLinks,
  footerText,
  footerDisclaimer,
  newsletterTitle,
  newsletterDescription,
  defaultSeo
}`;

export type SiteSettings = {
  siteName: string;
  company: string;
  phone: string;
  phoneFormatted: string;
  email: string;
  nmls: string;
  address: string;
  applyUrl: string;
  logoUrl: string | null;
  logoInitials: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  footerText: string;
  footerDisclaimer: string;
  newsletterTitle: string;
  newsletterDescription: string;
  defaultSeo: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: any;
    canonicalUrl?: string;
    noIndex?: boolean;
  };
};

export async function getSettings(): Promise<SiteSettings> {
  return client.fetch(settingsQuery, {}, { next: { tags: ["settings"] } });
}
```

**Step 2: Modify the (main) layout to fetch settings and pass to header/footer**

The main layout becomes an async server component that fetches settings and passes them down.

```typescript
// src/app/(main)/layout.tsx
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackToTop } from "@/components/layout/back-to-top";
import { getSettings } from "@/lib/sanity/queries/settings";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <>
      <SiteHeader settings={settings} />
      <main>{children}</main>
      <SiteFooter settings={settings} />
      <BackToTop />
    </>
  );
}
```

**Step 3: Refactor SiteHeader to accept settings prop**

Change `SiteHeader` to accept a `settings` prop instead of importing from `data.ts`. Replace all `siteConfig.*` references with `settings.*`. The `navLinks` structure can remain hardcoded for now (navigation links are structural, not content) or be kept as a local constant. Key changes:

- Remove: `import { siteConfig, navLinks } from "@/lib/data";`
- Add: `import { type SiteSettings } from "@/lib/sanity/queries/settings";`
- Change function signature to: `export function SiteHeader({ settings }: { settings: SiteSettings })`
- Replace `siteConfig.phone` with `settings.phone`
- Replace `siteConfig.phoneFormatted` with `settings.phoneFormatted`
- Replace hardcoded "FHA Cash Out" with `settings.siteName`
- Replace hardcoded "by Mortgage Pipeline" with `by ${settings.company}`
- Replace `siteConfig.nmls` with `settings.nmls`
- Keep `navLinks` as a local constant (or import from a nav config file) since navigation structure is architectural

**Step 4: Refactor SiteFooter to accept settings prop**

Same approach as header. Change `SiteFooter` to accept `settings` prop. Replace all `siteConfig.*` and `newsletterCTA.*` references with `settings.*`.

- Remove: `import { siteConfig, navLinks, newsletterCTA } from "@/lib/data";`
- Add: `import { type SiteSettings } from "@/lib/sanity/queries/settings";`
- Change function signature to: `export function SiteFooter({ settings }: { settings: SiteSettings })`
- Replace all `siteConfig.*` with `settings.*`
- Replace `newsletterCTA.title` with `settings.newsletterTitle`
- Replace `newsletterCTA.description` with `settings.newsletterDescription`
- Keep `navLinks` as a local constant or shared nav config

**Step 5: Create a shared nav config**

Since navigation links are structural (tied to routes that exist in the codebase), extract them to their own file rather than putting them in Sanity:

```typescript
// src/lib/navigation.ts
export const navLinks = {
  purchase: {
    label: "Purchase",
    items: [
      { label: "Conventional", href: "/purchase/conventional", description: "Traditional financing with competitive rates" },
      { label: "FHA", href: "/purchase/fha", description: "Low down payment, flexible credit guidelines" },
      { label: "VA", href: "/purchase/va", description: "Zero down payment for eligible veterans" },
    ],
  },
  refinance: {
    label: "Refinance",
    items: [
      { label: "Cash-Out Refinance", href: "/refinance/cash-out", description: "Tap into your home equity" },
      { label: "Conventional", href: "/refinance/conventional", description: "Lower your rate or change your term" },
      { label: "FHA Streamline", href: "/refinance/fha-streamline", description: "Simplified refinancing for FHA loans" },
    ],
  },
  heloc: { label: "HELOC", href: "/heloc" },
  blog: { label: "Blog", href: "/blog" },
  contact: { label: "Contact", href: "/contact" },
};
```

**Step 6: Test that header/footer render with Sanity data**

1. Open Studio at `/studio`
2. Create Site Settings document with test data
3. Navigate to homepage, verify header shows Sanity data
4. If Settings document does not exist yet, the page should still render (handle null gracefully with fallbacks)

**Step 7: Commit**

```
feat: wire Site Settings to header and footer from Sanity
```

---

### Task 1.9: Update Root Layout Metadata from Sanity

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Make root layout metadata dynamic**

The root layout's metadata should pull from Site Settings for the default title template and description. Since `generateMetadata` in the root layout can be async:

```typescript
// In src/app/layout.tsx, add:
import { getSettings } from "@/lib/sanity/queries/settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: {
      default: `${settings?.siteName || "FHA Cash Out"} | ${settings?.company || "Mortgage Pipeline"}`,
      template: `%s | ${settings?.siteName || "FHA Cash Out"}`,
    },
    description: settings?.defaultSeo?.metaDescription ||
      "FHA Cash Out loans with rates as low as 3.5%. Down payments starting at 3.5%. Flexible credit guidelines and no income limits.",
  };
}
```

Remove the static `export const metadata` object and replace with the async function.

**Step 2: Commit**

```
feat: pull root layout metadata from Sanity Site Settings
```

---

## Phase 2: Product Pages

### Task 2.1: Create Product Page Schema

**Files:**
- Create: `src/sanity/schemas/documents/product-page.ts`
- Modify: `src/sanity/schemas/index.ts`
- Modify: `src/sanity/desk-structure.ts`

**Step 1: Create product page schema**

```typescript
// src/sanity/schemas/documents/product-page.ts
import { defineField, defineType } from "sanity";

export const productPage = defineType({
  name: "productPage",
  title: "Product Page",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL path key, e.g. 'purchase-conventional' or 'refinance-cash-out'",
      validation: (rule) => rule.required(),
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "whatIs",
      title: "What Is Section",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "content", title: "Content", type: "text", rows: 6 }),
      ],
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "requirements",
      title: "Requirements",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
    }),
    defineField({
      name: "process",
      title: "Process Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string" }),
            defineField({ name: "answer", title: "Answer", type: "text", rows: 4 }),
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
  },
});
```

**Step 2: Register in schema index**

Add `productPage` to `src/sanity/schemas/index.ts`.

**Step 3: Update desk structure**

Add a "Product Pages" section to the desk structure under a "Pages" group.

**Step 4: Commit**

```
feat: add Product Page document schema
```

---

### Task 2.2: Create Product Page GROQ Query

**Files:**
- Create: `src/lib/sanity/queries/product-page.ts`

**Step 1: Create the query and fetch function**

```typescript
// src/lib/sanity/queries/product-page.ts
import { client } from "../client";

export const productPageQuery = `*[_type == "productPage" && slug.current == $slug][0]{
  title,
  subtitle,
  heroDescription,
  whatIs,
  benefits,
  requirements,
  process,
  faqs,
  seo
}`;

export type ProductPageData = {
  title: string;
  subtitle: string;
  heroDescription: string;
  whatIs: { title: string; content: string };
  benefits: string[];
  requirements: { label: string; value: string }[];
  process: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: any;
    canonicalUrl?: string;
    noIndex?: boolean;
  };
};

export async function getProductPage(slug: string): Promise<ProductPageData | null> {
  return client.fetch(
    productPageQuery,
    { slug },
    { next: { tags: [`product-${slug}`] } }
  );
}

// For listing product pages (used by product cards block)
export const allProductPagesQuery = `*[_type == "productPage"]{
  title,
  "slug": slug.current,
  subtitle,
  heroDescription,
  benefits[0...3]
}`;

export async function getAllProductPages() {
  return client.fetch(allProductPagesQuery, {}, { next: { tags: ["products"] } });
}
```

**Step 2: Commit**

```
feat: add Product Page GROQ queries
```

---

### Task 2.3: Create Shared Product Page Template Component

**Files:**
- Create: `src/components/templates/product-page-template.tsx`

**Step 1: Create a reusable product page template**

Currently all 7 product pages duplicate the same layout structure. Extract a shared template. This template receives the product page data and renders the standard layout (hero, what-is, benefits, requirements, process, sidebar, FAQs, CTA).

Base it on the exact structure from `src/app/(main)/purchase/conventional/page.tsx` but make it data-driven. The component should accept `ProductPageData` and `settings` (for phone number in CTAs).

**NOTE TO IMPLEMENTER:** Read the existing `purchase/conventional/page.tsx` carefully. Some product pages include extra sections like "Who Is This For?", "Comparison", "What to Know Before Applying", and "Pro Tip" that are hardcoded per page. For Phase 2, keep these as-is in the individual page files. The template handles the shared sections (hero, what-is, benefits, requirements, process, sidebar, FAQs, CTA). Product-specific extra content can be added between the template sections later, or added as optional fields in the Sanity schema in a future phase.

**Step 2: Commit**

```
feat: add shared product page template component
```

---

### Task 2.4: Refactor All 7 Product Page Routes

**Files:**
- Modify: `src/app/(main)/purchase/conventional/page.tsx`
- Modify: `src/app/(main)/purchase/fha/page.tsx`
- Modify: `src/app/(main)/purchase/va/page.tsx`
- Modify: `src/app/(main)/refinance/cash-out/page.tsx`
- Modify: `src/app/(main)/refinance/conventional/page.tsx`
- Modify: `src/app/(main)/refinance/fha-streamline/page.tsx`
- Modify: `src/app/(main)/heloc/page.tsx`

**Step 1: Refactor each product page**

Each page becomes an async server component that:
1. Fetches its data from Sanity using the slug (e.g., `getProductPage("purchase-conventional")`)
2. Falls back to existing static data if Sanity returns null (graceful migration)
3. Uses the shared template component
4. Generates metadata from the Sanity SEO fields

Example for conventional purchase:
```typescript
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductPage } from "@/lib/sanity/queries/product-page";
import { ProductPageTemplate } from "@/components/templates/product-page-template";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getProductPage("purchase-conventional");
  if (!data) return { title: "Conventional Purchase Loan" };
  return {
    title: data.seo?.metaTitle || data.title,
    description: data.seo?.metaDescription || data.heroDescription,
  };
}

export default async function ConventionalPurchasePage() {
  const data = await getProductPage("purchase-conventional");
  if (!data) notFound();
  return <ProductPageTemplate data={data} />;
}
```

**Step 2: Repeat for all 7 pages**

Use these slug mappings:
- `/purchase/conventional` -> `"purchase-conventional"`
- `/purchase/fha` -> `"purchase-fha"`
- `/purchase/va` -> `"purchase-va"`
- `/refinance/cash-out` -> `"refinance-cash-out"`
- `/refinance/conventional` -> `"refinance-conventional"`
- `/refinance/fha-streamline` -> `"refinance-fha-streamline"`
- `/heloc` -> `"heloc"`

**Step 3: Seed Sanity with current productPageData**

Write a seed script or manually create the 7 product page documents in the Studio with the data from `productPageData` in `data.ts`.

**Step 4: Test each product page renders correctly from Sanity data**

**Step 5: Commit**

```
feat: refactor product pages to fetch from Sanity
```

---

## Phase 3: Page Builder

### Task 3.1: Create All Block Schemas

**Files:**
- Create: `src/sanity/schemas/blocks/hero.ts`
- Create: `src/sanity/schemas/blocks/stats-counter.ts`
- Create: `src/sanity/schemas/blocks/process-steps.ts`
- Create: `src/sanity/schemas/blocks/product-cards.ts`
- Create: `src/sanity/schemas/blocks/testimonials.ts`
- Create: `src/sanity/schemas/blocks/trust-badges.ts`
- Create: `src/sanity/schemas/blocks/blog-cards.ts`
- Create: `src/sanity/schemas/blocks/faq.ts`
- Create: `src/sanity/schemas/blocks/cta.ts`
- Create: `src/sanity/schemas/blocks/lead-capture-form.ts`
- Create: `src/sanity/schemas/blocks/guide-download.ts`
- Create: `src/sanity/schemas/blocks/code-embed.ts`
- Create: `src/sanity/schemas/blocks/rich-text.ts`
- Modify: `src/sanity/schemas/index.ts`

**Step 1: Create each block schema**

Each block schema maps to an existing React component's props. Key examples:

**Hero block:**
```typescript
defineType({
  name: "heroBlock",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "subheadline", title: "Subheadline", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "ctaText", title: "CTA Button Text", type: "string", initialValue: "Check Your Rates" }),
    defineField({ name: "ctaHref", title: "CTA Button Link", type: "string", initialValue: "/apply" }),
    defineField({ name: "variant", title: "Variant", type: "string", options: { list: ["home", "product", "page"] }, initialValue: "home" }),
    defineField({ name: "showForm", title: "Show ZIP Code Form", type: "boolean", initialValue: true }),
    defineField({ name: "showStats", title: "Show Inline Stats", type: "boolean", initialValue: true }),
    defineField({ name: "backgroundImage", title: "Background Image", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "headline" }, prepare: ({ title }) => ({ title: title || "Hero", subtitle: "Hero Section" }) },
})
```

**Stats counter block:**
```typescript
defineType({
  name: "statsCounterBlock",
  title: "Stats Counter",
  type: "object",
  fields: [
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "value", title: "Value (number)", type: "number" }),
          defineField({ name: "prefix", title: "Prefix", type: "string", initialValue: "" }),
          defineField({ name: "suffix", title: "Suffix", type: "string", initialValue: "" }),
          defineField({ name: "label", title: "Label", type: "string" }),
        ],
        preview: { select: { title: "label", subtitle: "value" } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: "Stats Counter" }) },
})
```

**Code embed block (for calculators):**
```typescript
defineType({
  name: "codeEmbedBlock",
  title: "Code Embed",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Label (internal)", type: "string" }),
    defineField({ name: "code", title: "Embed Code", type: "text", rows: 10, description: "Paste script tags or embed code here" }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: title || "Code Embed", subtitle: "Embedded Script" }) },
})
```

Follow this pattern for all 13 block types. Match the fields to each component's existing props interface.

**Step 2: Register all blocks in the schema index**

**Step 3: Commit**

```
feat: add all page builder block schemas
```

---

### Task 3.2: Build the BlockRenderer Component

**Files:**
- Create: `src/components/blocks/block-renderer.tsx`
- Create: `src/components/blocks/code-embed.tsx`
- Create: `src/components/blocks/rich-text-block.tsx`

**Step 1: Create BlockRenderer**

```typescript
// src/components/blocks/block-renderer.tsx
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
            return <HeroSection key={block._key} {...block} />;
          case "statsCounterBlock":
            return <StatsCounter key={block._key} stats={block.stats} />;
          case "processStepsBlock":
            return <ProcessSteps key={block._key} steps={block.steps} title={block.title} subtitle={block.subtitle} />;
          case "productCardsBlock":
            return <ProductCards key={block._key} products={block.products || []} title={block.title} subtitle={block.subtitle} showAll={block.showAll} />;
          case "testimonialsBlock":
            return <Testimonials key={block._key} testimonials={block.testimonials} title={block.title} subtitle={block.subtitle} />;
          case "trustBadgesBlock":
            return <TrustBadges key={block._key} variant={block.variant} />;
          case "blogCardsBlock":
            return <BlogCards key={block._key} posts={block.posts || []} limit={block.limit} title={block.title} subtitle={block.subtitle} />;
          case "faqBlock":
            return <FAQSection key={block._key} faqs={block.faqs} title={block.title} subtitle={block.subtitle} />;
          case "ctaBlock":
            return <CTASection key={block._key} title={block.title} description={block.description} primaryText={block.primaryText} primaryHref={block.primaryHref} showPhone={block.showPhone} variant={block.variant} />;
          case "leadCaptureFormBlock":
            return <LeadCaptureForm key={block._key} variant={block.variant} title={block.title} description={block.description} />;
          case "guideDownloadBlock":
            return <GuideDownload key={block._key} title={block.guide?.title} description={block.guide?.description} pages={block.guide?.pages} slug={block.guide?.slug} />;
          case "codeEmbedBlock":
            return <CodeEmbed key={block._key} code={block.code} />;
          case "richTextBlock":
            return <RichTextBlock key={block._key} content={block.content} />;
          default:
            console.warn(`Unknown block type: ${block._type}`);
            return null;
        }
      })}
    </>
  );
}
```

**Step 2: Create CodeEmbed component**

```typescript
// src/components/blocks/code-embed.tsx
"use client";

import { useEffect, useRef } from "react";

export function CodeEmbed({ code }: { code: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !code) return;
    containerRef.current.innerHTML = code;
    // Execute any script tags
    const scripts = containerRef.current.querySelectorAll("script");
    scripts.forEach((script) => {
      const newScript = document.createElement("script");
      Array.from(script.attributes).forEach((attr) =>
        newScript.setAttribute(attr.name, attr.value)
      );
      newScript.textContent = script.textContent;
      script.parentNode?.replaceChild(newScript, script);
    });
  }, [code]);

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={containerRef} />
      </div>
    </section>
  );
}
```

**Step 3: Create RichTextBlock component**

```typescript
// src/components/blocks/rich-text-block.tsx
import { PortableText, type PortableTextComponents } from "next-sanity";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="font-heading text-xl font-semibold text-foreground mt-6 mb-3">{children}</h3>,
    normal: ({ children }) => <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    link: ({ value, children }) => <a href={value?.href} className="text-primary hover:underline" target={value?.blank ? "_blank" : undefined} rel={value?.blank ? "noopener noreferrer" : undefined}>{children}</a>,
  },
};

export function RichTextBlock({ content }: { content: any[] }) {
  if (!content) return null;
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <PortableText value={content} components={components} />
      </div>
    </section>
  );
}
```

**Step 4: Commit**

```
feat: add BlockRenderer and new block components
```

---

### Task 3.3: Create Homepage Singleton Schema and Wire Up

**Files:**
- Create: `src/sanity/schemas/documents/homepage.ts`
- Create: `src/lib/sanity/queries/homepage.ts`
- Modify: `src/sanity/schemas/index.ts`
- Modify: `src/sanity/desk-structure.ts`
- Modify: `src/app/(main)/page.tsx`

**Step 1: Create homepage schema**

```typescript
// src/sanity/schemas/documents/homepage.ts
import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "blocks",
      title: "Page Blocks",
      type: "array",
      of: [
        { type: "heroBlock" },
        { type: "statsCounterBlock" },
        { type: "processStepsBlock" },
        { type: "productCardsBlock" },
        { type: "testimonialsBlock" },
        { type: "trustBadgesBlock" },
        { type: "blogCardsBlock" },
        { type: "faqBlock" },
        { type: "ctaBlock" },
        { type: "leadCaptureFormBlock" },
        { type: "guideDownloadBlock" },
        { type: "codeEmbedBlock" },
        { type: "richTextBlock" },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
```

**Step 2: Create homepage query**

The GROQ query needs to resolve any references inside blocks (blog posts for blogCardsBlock, guide references for guideDownloadBlock, product page references for productCardsBlock).

```typescript
// src/lib/sanity/queries/homepage.ts
import { client } from "../client";

export const homepageQuery = `*[_type == "homepage"][0]{
  blocks[]{
    _type,
    _key,
    ...,
    // Resolve guide references
    _type == "guideDownloadBlock" => {
      "guide": guide->{title, description, pages, "slug": slug.current}
    },
    // Resolve blog posts for blog cards
    _type == "blogCardsBlock" => {
      ...,
      "posts": *[_type == "blogPost"] | order(publishDate desc) [0...coalesce(^.limit, 3)] {
        title,
        "slug": slug.current,
        excerpt,
        category,
        "date": publishDate,
        readTime,
        "image": featuredImage.asset->url
      }
    },
    // Resolve product references for product cards
    _type == "productCardsBlock" => {
      ...,
      "products": *[_type == "productPage"] {
        title,
        "slug": slug.current,
        subtitle,
        heroDescription,
        benefits[0...3]
      }
    }
  },
  seo
}`;

export async function getHomepage() {
  return client.fetch(homepageQuery, {}, { next: { tags: ["homepage"] } });
}
```

**Step 3: Refactor homepage to use BlockRenderer**

```typescript
// src/app/(main)/page.tsx
import type { Metadata } from "next";
import { getHomepage } from "@/lib/sanity/queries/homepage";
import { BlockRenderer } from "@/components/blocks/block-renderer";

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepage();
  if (!homepage?.seo) return {};
  return {
    title: homepage.seo.metaTitle,
    description: homepage.seo.metaDescription,
  };
}

export default async function HomePage() {
  const homepage = await getHomepage();
  if (!homepage?.blocks) return null;
  return <BlockRenderer blocks={homepage.blocks} />;
}
```

**Step 4: Register homepage in schema index and desk structure as singleton**

**Step 5: Seed the homepage in Sanity with the current block arrangement**

The current homepage layout is: Hero -> Stats -> Process Steps -> Product Cards -> Testimonials -> Trust Badges -> Blog Cards -> FAQ -> CTA

**Step 6: Test homepage renders from Sanity**

**Step 7: Commit**

```
feat: add homepage page builder with Sanity blocks
```

---

## Phase 4: Blog & Content

### Task 4.1: Create Team Member Schema

**Files:**
- Create: `src/sanity/schemas/documents/team-member.ts`
- Modify: `src/sanity/schemas/index.ts`
- Modify: `src/sanity/desk-structure.ts`

**Step 1: Create schema matching current teamMembers data shape**

Fields: name, title, nmls, bio, photo (image), email, phone.

**Step 2: Register and add to desk structure under "Team" group**

**Step 3: Commit**

```
feat: add Team Member document schema
```

---

### Task 4.2: Create Blog Post Schema

**Files:**
- Create: `src/sanity/schemas/documents/blog-post.ts`
- Modify: `src/sanity/schemas/index.ts`
- Modify: `src/sanity/desk-structure.ts`

**Step 1: Create blog post schema**

Fields:
- title (string, required)
- slug (slug, auto from title, required)
- excerpt (text)
- category (string, options list: Refinancing, FHA Loans, VA Loans, Education, Tips, HELOC, Market Updates)
- featuredImage (image with alt text, hotspot)
- body (markdown, using sanity-plugin-markdown)
- author (reference to teamMember)
- publishDate (date, required)
- readTime (string)
- seo (seo object)

**Step 2: Register and add to desk structure under "Content" group, sorted by date**

**Step 3: Commit**

```
feat: add Blog Post document schema with markdown body
```

---

### Task 4.3: Create Guide/Whitepaper Schema

**Files:**
- Create: `src/sanity/schemas/documents/guide.ts`
- Modify: `src/sanity/schemas/index.ts`
- Modify: `src/sanity/desk-structure.ts`

**Step 1: Create guide schema**

Fields: title, slug, description, coverImage, pdfFile (file), pages (string), seo.

**Step 2: Register and add to desk structure under "Content" group**

**Step 3: Commit**

```
feat: add Guide/Whitepaper document schema
```

---

### Task 4.4: Create Blog Queries and Refactor Blog Pages

**Files:**
- Create: `src/lib/sanity/queries/blog.ts`
- Modify: `src/app/(main)/blog/page.tsx`
- Modify: `src/app/(main)/blog/[slug]/page.tsx`

**Step 1: Create blog queries**

```typescript
// Blog list query
export const blogListQuery = `*[_type == "blogPost"] | order(publishDate desc) {
  title,
  "slug": slug.current,
  excerpt,
  category,
  "date": publishDate,
  readTime,
  "image": featuredImage.asset->url,
  "author": author->{name, "image": photo.asset->url}
}`;

// Single blog post query
export const blogPostQuery = `*[_type == "blogPost" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  excerpt,
  category,
  "date": publishDate,
  readTime,
  "image": featuredImage.asset->url,
  body,
  "author": author->{name, title, nmls, "image": photo.asset->url},
  seo,
  "relatedPosts": *[_type == "blogPost" && slug.current != ^.slug.current] | order(publishDate desc) [0...3] {
    title,
    "slug": slug.current,
    excerpt,
    category,
    "image": featuredImage.asset->url
  }
}`;
```

**Step 2: Refactor blog archive page**

The blog archive page is currently a client component with client-side filtering/pagination. It imports `blogPosts` from `data.ts`. Change it to:
1. Fetch all blog posts from Sanity server-side
2. Pass them to the client component as props for filtering/pagination
3. Remove the `data.ts` import

**Step 3: Refactor blog detail page**

The blog detail page currently uses static data and renders hardcoded placeholder content for every post. Change it to:
1. Fetch the specific post from Sanity by slug
2. Render the markdown body using a markdown renderer (e.g., react-markdown)
3. Render the author info from the Team Member reference
4. Render related posts from the GROQ query
5. Keep the sidebar (LeadCaptureForm, GuideDownload) but fetch the guide from Sanity

**Step 4: Install react-markdown for rendering blog body**

```bash
npm install react-markdown
```

**Step 5: Seed blog posts in Sanity**

**Step 6: Test blog archive and detail pages**

**Step 7: Commit**

```
feat: refactor blog pages to fetch from Sanity with markdown rendering
```

---

### Task 4.5: Refactor About Page

**Files:**
- Create: `src/lib/sanity/queries/about.ts`
- Create: `src/sanity/schemas/documents/about.ts`
- Modify: `src/app/(main)/about/page.tsx`
- Modify: `src/sanity/schemas/index.ts`
- Modify: `src/sanity/desk-structure.ts`

**Step 1: Create About Page schema (singleton)**

Since the about page was agreed to be block-based with some fixed content (mission, team), create it as a singleton with:
- missionTitle, missionText (fixed fields for the mission section)
- blocks (array of page builder blocks)
- seo

**Step 2: Create about query that resolves team members**

```typescript
export const aboutQuery = `*[_type == "about"][0]{
  missionTitle,
  missionText,
  blocks[]{_type, _key, ...},
  seo,
  "teamMembers": *[_type == "teamMember"] | order(_createdAt asc) {
    name,
    title,
    nmls,
    bio,
    "image": photo.asset->url
  }
}`;
```

**Step 3: Refactor about page to fetch from Sanity**

**Step 4: Commit**

```
feat: refactor About page to fetch from Sanity
```

---

### Task 4.6: Refactor Guides Page

**Files:**
- Create: `src/lib/sanity/queries/guides.ts`
- Modify: `src/app/(main)/guides/page.tsx`

**Step 1: Create guides query**

```typescript
export const guidesQuery = `*[_type == "guide"] | order(_createdAt desc) {
  title,
  "slug": slug.current,
  description,
  pages,
  "pdfUrl": pdfFile.asset->url,
  "coverImage": coverImage.asset->url,
  seo
}`;
```

**Step 2: Refactor guides page to fetch from Sanity**

**Step 3: Commit**

```
feat: refactor Guides page to fetch from Sanity
```

---

## Phase 5: Landing Pages & Cleanup

### Task 5.1: Create Landing Page Schema

**Files:**
- Create: `src/sanity/schemas/documents/landing-page.ts`
- Modify: `src/sanity/schemas/index.ts`
- Modify: `src/sanity/desk-structure.ts`

**Step 1: Create landing page schema**

Same block array as homepage, plus title and slug. Uses PPC layout (no nav/footer).

**Step 2: Register and add to desk structure**

**Step 3: Commit**

```
feat: add Landing Page (PPC) document schema
```

---

### Task 5.2: Create Dynamic PPC Route

**Files:**
- Create: `src/app/(ppc)/[slug]/page.tsx`
- Create: `src/lib/sanity/queries/landing-page.ts`

**Step 1: Create landing page query**

Same pattern as homepage query but filtered by slug.

**Step 2: Create dynamic PPC page**

The existing `heloc-ppc` page is fully hardcoded. For the new system, PPC pages fetch blocks from Sanity. Keep the existing `heloc-ppc` page as-is for now (it can be migrated to a Sanity landing page document later).

The new `[slug]/page.tsx` handles any future PPC pages created in Sanity.

**Step 3: Commit**

```
feat: add dynamic PPC landing page route from Sanity
```

---

### Task 5.3: Set Up Revalidation Webhook

**Files:**
- Create: `src/app/api/revalidate/route.ts`

**Step 1: Create revalidation API route**

```typescript
// src/app/api/revalidate/route.ts
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: { current?: string };
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse("Bad request", { status: 400 });
    }

    // Revalidate based on document type
    switch (body._type) {
      case "settings":
        revalidateTag("settings");
        break;
      case "homepage":
        revalidateTag("homepage");
        break;
      case "productPage":
        revalidateTag("products");
        if (body.slug?.current) {
          revalidateTag(`product-${body.slug.current}`);
        }
        break;
      case "blogPost":
        revalidateTag("blog");
        if (body.slug?.current) {
          revalidateTag(`blog-${body.slug.current}`);
        }
        break;
      case "teamMember":
        revalidateTag("team");
        break;
      case "guide":
        revalidateTag("guides");
        break;
      case "landingPage":
        if (body.slug?.current) {
          revalidateTag(`landing-${body.slug.current}`);
        }
        break;
      case "about":
        revalidateTag("about");
        break;
      default:
        // Revalidate everything as fallback
        revalidateTag("settings");
        revalidateTag("homepage");
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error("Revalidation error:", err);
    return new NextResponse("Error revalidating", { status: 500 });
  }
}
```

**Step 2: Commit**

```
feat: add Sanity webhook revalidation endpoint
```

---

### Task 5.4: Set Up Preview/Draft Mode

**Files:**
- Create: `src/app/api/draft/route.ts`
- Create: `src/app/api/disable-draft/route.ts`

**Step 1: Create draft mode enable route**

```typescript
// src/app/api/draft/route.ts
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") || "/";

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  (await draftMode()).enable();
  redirect(slug);
}
```

**Step 2: Create draft mode disable route**

```typescript
// src/app/api/disable-draft/route.ts
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  (await draftMode()).disable();
  redirect("/");
}
```

**Step 3: Update Sanity queries to use preview client when draft mode is active**

This can be done by updating `getSettings`, `getHomepage`, etc. to accept a `preview` parameter that switches to `previewClient`.

**Step 4: Commit**

```
feat: add draft mode preview support
```

---

### Task 5.5: Clean Up data.ts

**Files:**
- Modify: `src/lib/data.ts`

**Step 1: Remove all exports from data.ts that are now in Sanity**

At this point, the following should be removed from data.ts:
- `siteConfig` (replaced by Site Settings)
- `stats`, `processSteps`, `testimonials`, `loanProducts`, `faqItems` (replaced by homepage blocks)
- `blogPosts` (replaced by Blog Post documents)
- `whitepapers` (replaced by Guide documents)
- `teamMembers` (replaced by Team Member documents)
- `productPageData` (replaced by Product Page documents)
- `newsletterCTA` (replaced by Site Settings fields)

**Step 2: Keep navLinks in the separate navigation.ts file created in Task 1.8**

**Step 3: Delete data.ts if completely empty**

**Step 4: Search codebase for any remaining imports from `@/lib/data`**

Run: `grep -r "from.*@/lib/data" src/` and fix any remaining references.

**Step 5: Verify the full site renders correctly with no imports from data.ts**

**Step 6: Commit**

```
feat: remove static data.ts, all content now from Sanity
```

---

### Task 5.6: End-to-End Testing

**No files to create.** Manual testing checklist:

1. Open Studio at `/studio`, verify all document types appear
2. Edit Site Settings, publish, verify header/footer update
3. Rearrange homepage blocks, publish, verify homepage updates
4. Edit a product page, publish, verify the page updates
5. Create a new blog post with markdown content, publish, verify it appears on blog archive and detail page
6. Create a guide, publish, verify it appears on guides page
7. Edit team member, publish, verify about page updates
8. Test mobile navigation still works
9. Test all calculator pages still render (they should be unchanged)
10. Test the PPC page still renders
11. Test the apply page still works
12. Verify no console errors on any page

---

## Phase 6: Documentation

### Task 6.1: Create New Client Setup Guide

**Files:**
- Create: `docs/NEW_CLIENT_SETUP.md`

**Step 1: Write the setup guide**

Document the full process for cloning and setting up a new client site:

1. Clone the repository
2. Create a new Sanity project at sanity.io/manage
3. Set environment variables
4. Run `npm install && npm run dev`
5. Navigate to `/studio` and configure Site Settings
6. Create product page documents for each loan type
7. Build the homepage with blocks
8. Add blog posts, team members, guides
9. Deploy to hosting provider
10. Configure Sanity webhook pointing to `/api/revalidate`

### Task 6.2: Update Project README

**Files:**
- Modify: `README.md`

Add sections for:
- Sanity Studio access
- Environment variables
- Content editing guide
- Deployment notes

### Task 6.3: Commit documentation

```
docs: add new client setup guide and update README
```

---

## Summary of Slug Mappings

| Route | Sanity Slug |
|-------|-------------|
| `/purchase/conventional` | `purchase-conventional` |
| `/purchase/fha` | `purchase-fha` |
| `/purchase/va` | `purchase-va` |
| `/refinance/cash-out` | `refinance-cash-out` |
| `/refinance/conventional` | `refinance-conventional` |
| `/refinance/fha-streamline` | `refinance-fha-streamline` |
| `/heloc` | `heloc` |

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `next-sanity` | Next.js + Sanity integration, Studio embedding, PortableText |
| `sanity` | Core Sanity framework |
| `@sanity/image-url` | Image URL builder for Sanity CDN |
| `@sanity/vision` | GROQ playground in Studio |
| `sanity-plugin-markdown` | Markdown input field for blog posts |
| `react-markdown` | Render markdown content on the frontend |

## Files to Delete After Migration

- `src/lib/data.ts` (all content moved to Sanity)

## Files to Keep Unchanged

- All calculator pages (`src/app/(main)/calculators/*`) - code only, no Sanity
- `src/app/(main)/apply/page.tsx` - form logic stays in code
- `src/app/(main)/contact/page.tsx` - form logic stays in code (reads settings for contact info)
- `src/app/(main)/privacy-policy/page.tsx` - legal content, can be migrated to Sanity later
- `src/app/(main)/terms/page.tsx` - same
- `src/app/(main)/disclosures/page.tsx` - same
- `src/app/(ppc)/heloc-ppc/page.tsx` - existing PPC page stays as-is
- All shadcn/ui components (`src/components/ui/*`)
- `src/lib/utils.ts`
- `src/lib/consent.ts`
