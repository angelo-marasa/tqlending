# New Client Setup Guide

This guide walks through cloning and configuring the mortgage boilerplate for a new client.

## 1. Clone the Repository

```bash
git clone <repo-url> client-name-site
cd client-name-site
npm install
```

## 2. Create a Sanity Project

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Click **Create new project**
3. Name it after the client (e.g., "Client Name Mortgage")
4. Choose the **production** dataset
5. Note the **Project ID** from the project dashboard

## 3. Generate a Sanity API Token

1. In the Sanity project dashboard, go to **API > Tokens**
2. Click **Add API token**
3. Name it "Next.js Read/Write"
4. Set permissions to **Editor**
5. Copy the token

## 4. Set Environment Variables

Copy `.env.local` and fill in real values:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-11
SANITY_API_TOKEN=<your-api-token>
SANITY_REVALIDATE_SECRET=<generate-a-random-string>
```

Generate a revalidation secret:

```bash
openssl rand -hex 32
```

## 5. Start the Development Server

```bash
npm run dev
```

The site runs at `http://localhost:3000` and Sanity Studio at `http://localhost:3000/studio`.

## 6. Configure Site Settings

1. Open `/studio` in your browser
2. Click **Site Settings** in the sidebar
3. Fill in all fields:
   - **Site Name** and **Company Name**
   - **Phone** (raw digits) and **Phone Formatted** (display format)
   - **Email**, **NMLS**, **Address**
   - **Apply URL** (the loan application link)
   - **Logo** (upload the client's logo) and **Logo Initials** (fallback)
   - **Social Links** (Facebook, Twitter, Instagram, LinkedIn, YouTube)
   - **Footer Text** and **Footer Disclaimer**
   - **Newsletter Title** and **Description**
   - **Default SEO** (site-wide meta title, description, OG image)
4. Click **Publish**

## 7. Create Product Pages

Create a Product Page document for each loan type the client offers. The slug must match exactly:

| Loan Type | Required Slug |
|-----------|--------------|
| Conventional Purchase | `purchase-conventional` |
| FHA Purchase | `purchase-fha` |
| VA Purchase | `purchase-va` |
| Cash-Out Refinance | `refinance-cash-out` |
| Conventional Refinance | `refinance-conventional` |
| FHA Streamline | `refinance-fha-streamline` |
| HELOC | `heloc` |

Each product page needs:
- **Title**, **Subtitle**, **Hero Description**
- **What Is** section (title + content)
- **Benefits** (array of strings)
- **Requirements** (label/value pairs)
- **Process** steps (title/description pairs)
- **FAQs** (question/answer pairs)
- **SEO** fields

## 8. Build the Homepage

1. Open the **Homepage** singleton in Studio
2. Add blocks in the desired order. Recommended layout:
   - Hero
   - Stats Counter
   - Process Steps
   - Product Cards
   - Testimonials
   - Trust Badges
   - Blog Cards
   - FAQ
   - CTA
3. Configure each block's fields
4. Add SEO metadata
5. Publish

## 9. Add Content

### Team Members
Create a Team Member document for each loan officer:
- Name, title, NMLS number, bio, photo, email, phone

### Blog Posts
Create blog posts with:
- Title, slug, excerpt, category, featured image
- Body content in Markdown
- Author (reference to a team member)
- Publish date, read time
- SEO fields

### Guides/Whitepapers
Create downloadable resources:
- Title, slug, description, cover image
- Upload the PDF file
- Page count (for display)

### About Page
Configure the About page singleton:
- Mission title and text
- Page builder blocks for additional sections
- Team members are automatically pulled in

## 10. Create Landing Pages (Optional)

For PPC campaigns, create Landing Page documents:
- Title, slug, page builder blocks, SEO
- These render at `/<slug>` using the PPC layout (no header/footer)

## 11. Deploy

### Vercel (Recommended)

1. Push the repository to GitHub
2. Import the project in Vercel
3. Add all environment variables from `.env.local`
4. Deploy

### Configure Sanity Webhook

After deployment, set up on-demand revalidation:

1. In the Sanity project dashboard, go to **API > Webhooks**
2. Click **Create webhook**
3. Configure:
   - **Name:** "Revalidate Next.js"
   - **URL:** `https://your-domain.com/api/revalidate`
   - **Trigger on:** Create, Update, Delete
   - **Filter:** Leave empty (all document types)
   - **Secret:** Use the same `SANITY_REVALIDATE_SECRET` value
   - **HTTP method:** POST
   - **API version:** v2021-03-25
4. Save

### Configure CORS Origins

In the Sanity project dashboard, go to **API > CORS Origins** and add:
- `http://localhost:3000` (for development)
- `https://your-domain.com` (for production)

Both need **Allow credentials** enabled for Studio to work.

## 12. Preview/Draft Mode (Optional)

To preview unpublished changes:

1. Visit: `https://your-domain.com/api/draft?secret=YOUR_REVALIDATE_SECRET&slug=/`
2. This enables draft mode, showing unpublished content
3. To disable: visit `https://your-domain.com/api/disable-draft`

## Project Structure

```
src/
  app/
    (main)/          # Main site pages (header + footer layout)
    (ppc)/           # PPC landing pages (no header/footer)
    studio/          # Embedded Sanity Studio at /studio
    api/
      revalidate/    # Sanity webhook endpoint
      draft/         # Enable draft mode
      disable-draft/ # Disable draft mode
  components/
    blocks/          # BlockRenderer + block-specific components
    sections/        # Reusable page sections
    templates/       # Page templates (product-page-template)
    layout/          # Header, footer, navigation
    ui/              # shadcn/ui components
  lib/
    sanity/
      client.ts      # Sanity client configuration
      env.ts         # Environment variable helpers
      image.ts       # Image URL builder
      queries/       # GROQ queries and fetch functions
    navigation.ts    # Navigation link structure
  sanity/
    schemas/
      objects/       # Reusable schema objects (seo)
      documents/     # Document type schemas
      blocks/        # Page builder block schemas
    desk-structure.ts # Custom Studio sidebar
```

## Available Block Types

| Block | Description |
|-------|-------------|
| Hero | Full-width hero section with title, description, CTA |
| Stats Counter | Animated number counters |
| Process Steps | Numbered step-by-step flow |
| Product Cards | Grid of loan product cards |
| Testimonials | Customer testimonial carousel/grid |
| Trust Badges | Certification and trust indicator badges |
| Blog Cards | Latest blog post cards |
| FAQ | Expandable FAQ accordion |
| CTA | Call-to-action banner |
| Lead Capture Form | Email/phone capture form |
| Guide Download | Downloadable guide/whitepaper card |
| Code Embed | Raw HTML/script embed (for calculators) |
| Rich Text | Portable Text content block |
