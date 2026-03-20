# Mortgage Boilerplate

A production-ready mortgage website boilerplate built with Next.js 15, Sanity CMS, Tailwind CSS, and shadcn/ui. Clone it per client, connect a Sanity project, and customize through the Studio.

## Tech Stack

- **Framework:** Next.js 15 (App Router, React 19, TypeScript)
- **CMS:** Sanity v5 with embedded Studio at `/studio`
- **Styling:** Tailwind CSS v4, shadcn/ui (new-york style), Radix primitives
- **Content:** Hybrid approach (block-based page builder + fixed schemas)
- **Blog:** Markdown body via sanity-plugin-markdown, rendered with react-markdown

## Quick Start

```bash
npm install
cp .env.local.example .env.local  # Fill in your Sanity credentials
npm run dev
```

- Site: `http://localhost:3000`
- Studio: `http://localhost:3000/studio`

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name (default: `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API version date |
| `SANITY_API_TOKEN` | Read/write API token for preview |
| `SANITY_REVALIDATE_SECRET` | Secret for webhook revalidation |

## Sanity Studio

The Studio is embedded at `/studio` and provides:

- **Site Settings** (singleton): Company info, branding, social links, footer, SEO defaults
- **Homepage** (singleton): Block-based page builder with 13 block types
- **About Page** (singleton): Mission statement + page builder blocks
- **Product Pages:** Fixed schema for each loan type (benefits, requirements, process, FAQs)
- **Blog Posts:** Markdown body, categories, author references, SEO
- **Team Members:** Loan officer profiles
- **Guides:** Downloadable PDFs/whitepapers
- **Landing Pages:** PPC pages with block-based builder (no header/footer layout)

## Content Architecture

**Block-based pages** (Homepage, About, Landing Pages) use a page builder with these block types: Hero, Stats Counter, Process Steps, Product Cards, Testimonials, Trust Badges, Blog Cards, FAQ, CTA, Lead Capture Form, Guide Download, Code Embed, Rich Text.

**Fixed-schema pages** (Product Pages, Blog Posts) use structured fields that map to a shared template.

**Navigation** stays in code (`src/lib/navigation.ts`) since routes are tied to the file system.

## Revalidation

Content updates trigger on-demand revalidation via a Sanity webhook at `/api/revalidate`. Each document type maps to specific cache tags so only affected pages rebuild.

## Draft Preview

Enable draft mode to preview unpublished content:
- Enable: `/api/draft?secret=YOUR_SECRET&slug=/path`
- Disable: `/api/disable-draft`

## New Client Setup

See [docs/NEW_CLIENT_SETUP.md](docs/NEW_CLIENT_SETUP.md) for the complete guide to cloning and configuring for a new client.

## Deployment

Deploy to Vercel, add environment variables, then configure a Sanity webhook pointing to `https://your-domain.com/api/revalidate` with the revalidation secret.
