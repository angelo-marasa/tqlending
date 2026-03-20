import puppeteer from "puppeteer";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

const outputPath = path.join(os.homedir(), "Desktop", "Mortgage-Boilerplate-CMS-Guide.pdf");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mortgage Boilerplate CMS Guide</title>
<style>
  :root {
    --cover-bg: #1a1f36;
    --cover-bg-light: #242a45;
    --cover-accent: #7c83ff;
    --cover-text: #ffffff;
    --cover-subtitle: #a0a5c0;
    --cover-meta: #6b7280;
    --cover-meta-badge: #2d3352;
    --accent-blue: #4a6cf7;
    --accent-amber: #f59e0b;
    --accent-green: #10b981;
    --accent-red: #ef4444;
    --text-heading: #1a1a2e;
    --text-body: #4a5568;
    --text-muted: #6b7280;
    --border-light: #e5e7eb;
    --bg-code: #f3f4f6;
    --bg-callout: #f8fafc;
  }

  @page { size: letter; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
    font-size: 11pt;
    line-height: 1.6;
    color: var(--text-body);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* COVER PAGE */
  .cover-page {
    width: 100%; height: 100vh;
    background-color: var(--cover-bg);
    position: relative; overflow: hidden;
    break-after: page;
    display: flex; flex-direction: column; justify-content: center;
    padding: 60px 64px;
  }
  .cover-page::after {
    content: ''; position: absolute; top: 0; right: 0; width: 50%; height: 100%;
    background-image: linear-gradient(var(--cover-bg-light) 1px, transparent 1px), linear-gradient(90deg, var(--cover-bg-light) 1px, transparent 1px);
    background-size: 40px 40px; opacity: 0.4; pointer-events: none;
  }
  .cover-content { position: relative; z-index: 1; max-width: 65%; }
  .cover-category {
    display: inline-block; font-size: 10pt; font-weight: 600;
    letter-spacing: 3px; text-transform: uppercase; color: var(--cover-accent);
    border: 1.5px solid var(--cover-accent); border-radius: 4px;
    padding: 6px 14px; margin-bottom: 28px;
  }
  .cover-title { font-size: 36pt; font-weight: 800; color: var(--cover-text); line-height: 1.15; margin-bottom: 20px; }
  .cover-subtitle { font-size: 13pt; color: var(--cover-subtitle); line-height: 1.6; max-width: 500px; }
  .cover-meta {
    position: absolute; bottom: 40px; left: 64px; right: 64px;
    display: flex; justify-content: space-between; align-items: center; z-index: 1;
  }
  .cover-meta-item { font-size: 9pt; color: var(--cover-meta); }
  .cover-meta-item strong { font-weight: 700; color: var(--cover-meta); margin-right: 8px; }
  .cover-meta-badge { display: inline-block; background: var(--cover-meta-badge); color: var(--cover-subtitle); font-family: 'SF Mono', 'Consolas', monospace; font-size: 9pt; padding: 3px 10px; border-radius: 4px; margin-left: 6px; }

  /* CONTENT PAGES */
  .content-page { width: 100%; padding: 24px 64px 16px; background: #ffffff; position: relative; }
  tr { break-inside: avoid; }
  .callout { break-inside: avoid; }
  .step { break-inside: avoid; }
  .block-card { break-inside: avoid; }
  .page-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; border-bottom: 1.5px solid var(--border-light); margin-bottom: 36px; }
  .page-header-title { font-size: 8pt; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: var(--text-muted); }
  .page-header-section { font-size: 9pt; font-weight: 600; color: var(--text-muted); }

  h1 { font-size: 26pt; font-weight: 800; color: var(--text-heading); margin-bottom: 12px; line-height: 1.2; }
  h2 { font-size: 18pt; font-weight: 700; color: var(--text-heading); margin-top: 32px; margin-bottom: 10px; line-height: 1.3; }
  h3 { font-size: 13pt; font-weight: 700; color: var(--text-heading); margin-top: 20px; margin-bottom: 6px; }
  .lead { font-size: 12pt; color: var(--text-body); line-height: 1.7; margin-bottom: 28px; max-width: 580px; }
  p { margin-bottom: 10px; }

  /* STEPS */
  .step { display: flex; gap: 16px; margin-bottom: 22px; align-items: flex-start; }
  .step-number { flex-shrink: 0; width: 32px; height: 32px; background: var(--accent-blue); color: #fff; font-size: 12pt; font-weight: 700; display: flex; align-items: center; justify-content: center; border-radius: 6px; margin-top: 2px; }
  .step-content { flex: 1; }
  .step-content h3 { margin-top: 0; margin-bottom: 4px; }
  .step-content p { font-size: 10.5pt; color: var(--text-body); margin-bottom: 4px; }

  /* TABLES */
  table { width: 100%; border-collapse: collapse; margin: 14px 0 20px; font-size: 10pt; }
  thead th { text-align: left; font-size: 8pt; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-muted); padding: 8px 14px; border-bottom: 2px solid var(--border-light); }
  tbody td { padding: 10px 14px; border-bottom: 1px solid var(--border-light); vertical-align: top; }
  tbody td:first-child { font-weight: 600; color: var(--text-heading); }

  /* CALLOUTS */
  .callout { border-left: 4px solid var(--accent-blue); background: var(--bg-callout); padding: 14px 18px; margin: 16px 0; border-radius: 0 6px 6px 0; }
  .callout-label { font-size: 8pt; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
  .callout-body { font-size: 10pt; line-height: 1.6; color: var(--text-body); }
  .callout.note .callout-label { color: var(--accent-blue); }
  .callout.important { border-left-color: var(--accent-amber); }
  .callout.important .callout-label { color: var(--accent-amber); }
  .callout.success { border-left-color: var(--accent-green); background: #f0fdf8; }
  .callout.success .callout-label { color: var(--accent-green); }
  .callout.warning { border-left-color: var(--accent-red); }
  .callout.warning .callout-label { color: var(--accent-red); }

  code { font-family: 'SF Mono', 'Consolas', monospace; font-size: 9pt; background: var(--bg-code); padding: 2px 6px; border-radius: 3px; color: var(--text-heading); }

  .checklist { list-style: none; padding: 0; margin: 16px 0; }
  .checklist li { display: flex; align-items: flex-start; gap: 10px; padding: 6px 0; font-size: 10.5pt; color: var(--text-body); }
  .checklist li::before { content: ''; flex-shrink: 0; width: 16px; height: 16px; border: 2px solid var(--border-light); border-radius: 3px; margin-top: 2px; }

  .page-footer { display: flex; justify-content: space-between; font-size: 8pt; color: var(--text-muted); margin-top: 32px; padding-top: 12px; border-top: 1px solid var(--border-light); }

  .contact-box { background: var(--bg-callout); border: 1px solid var(--border-light); border-radius: 10px; padding: 24px 28px; margin-top: 28px; }
  .contact-box h3 { margin-top: 0; }

  /* Block card grid */
  .block-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 16px 0; }
  .block-card { background: var(--bg-callout); border: 1px solid var(--border-light); border-radius: 8px; padding: 14px 16px; }
  .block-card h4 { font-size: 11pt; font-weight: 700; color: var(--text-heading); margin-bottom: 4px; }
  .block-card p { font-size: 9.5pt; color: var(--text-body); margin-bottom: 0; line-height: 1.5; }

  .bold { font-weight: 700; color: var(--text-heading); }
  .small { font-size: 9pt; }
  .mt-0 { margin-top: 0; }
</style>
</head>
<body>

<!-- ===================== COVER ===================== -->
<div class="cover-page">
  <div class="cover-content">
    <div class="cover-category">CMS Operations Guide</div>
    <h1 class="cover-title">Mortgage Boilerplate<br>Content Management</h1>
    <p class="cover-subtitle">
      Everything you need to know about managing content in Sanity Studio:
      pages, blocks, blog posts, product pages, and more. Built for account managers.
    </p>
  </div>
  <div class="cover-meta">
    <span class="cover-meta-item"><strong>Prepared for</strong> Account Managers</span>
    <span class="cover-meta-item"><strong>Platform</strong> <span class="cover-meta-badge">Sanity CMS</span></span>
    <span class="cover-meta-item"><strong>Date</strong> March 2026</span>
  </div>
</div>

<!-- ===================== PAGE 2: TABLE OF CONTENTS ===================== -->
<div class="content-page">
  <div class="page-header">
    <span class="page-header-title">Mortgage Boilerplate CMS Guide</span>
    <span class="page-header-section">TOC</span>
  </div>

  <h1>Table of Contents</h1>
  <p class="lead">This guide covers everything you need to build and manage mortgage client websites through Sanity Studio.</p>

  <table>
    <thead><tr><th>Section</th><th>Page</th><th>What You Will Learn</th></tr></thead>
    <tbody>
      <tr><td>1. Platform Overview</td><td>3</td><td>How the system works, what Sanity is, key concepts</td></tr>
      <tr><td>2. Getting Into the Studio</td><td>4</td><td>How to access the editing interface</td></tr>
      <tr><td>3. Site Settings</td><td>4</td><td>Company info, branding, contact details, SEO defaults</td></tr>
      <tr><td>4. The Page Builder</td><td>5</td><td>How blocks work, adding/removing/reordering blocks</td></tr>
      <tr><td>5. Available Blocks</td><td>6-7</td><td>Every block type explained with its fields</td></tr>
      <tr><td>6. Product Pages</td><td>8</td><td>Loan type pages (FHA, VA, Conventional, HELOC, etc.)</td></tr>
      <tr><td>7. Blog Posts</td><td>9</td><td>Creating and managing blog content</td></tr>
      <tr><td>8. Team, Guides & About</td><td>10</td><td>Team members, downloadable guides, about page</td></tr>
      <tr><td>9. Landing Pages (PPC)</td><td>11</td><td>Building standalone PPC landing pages</td></tr>
      <tr><td>10. Publishing & SEO</td><td>12</td><td>How to publish, SEO fields, why they matter</td></tr>
      <tr><td>11. Built-in SEO Infrastructure</td><td>13</td><td>Sitemap, robots.txt, llms.txt, JSON-LD, Open Graph</td></tr>
      <tr><td>12. ADA & Accessibility</td><td>14</td><td>WCAG 2.1 AA compliance, screen readers, keyboard nav</td></tr>
      <tr><td>13. Performance & Security</td><td>15</td><td>Page speed, CDN, Core Web Vitals, HTTPS, DDoS</td></tr>
    </tbody>
  </table>

  <div class="callout note">
    <div class="callout-label">Before You Start</div>
    <div class="callout-body">
      You do not need any coding knowledge to use this system. All content editing happens through a visual interface called Sanity Studio. If something looks broken on the website after you publish, it is likely a content issue (missing field, typo in a slug, etc.), not a code issue. This guide will help you avoid those pitfalls.
    </div>
  </div>

  <div class="page-footer">
    <span>Kaleidico &middot; Mortgage Boilerplate CMS Guide</span>
    <span>Page 2</span>
  </div>
</div>

<!-- ===================== PAGE 3: PLATFORM OVERVIEW ===================== -->
<div class="content-page">
  <div class="page-header">
    <span class="page-header-title">Mortgage Boilerplate CMS Guide</span>
    <span class="page-header-section">01</span>
  </div>

  <h1>Platform Overview</h1>
  <p class="lead">The mortgage boilerplate is a website template that we clone and customize for each new mortgage client. Content is managed through Sanity, a headless CMS.</p>

  <h2 class="mt-0">How It Works</h2>
  <p>The website is split into two parts:</p>

  <table>
    <thead><tr><th>Part</th><th>What It Does</th><th>Who Manages It</th></tr></thead>
    <tbody>
      <tr><td>The Website</td><td>What visitors see: pages, blog posts, forms, calculators</td><td>Runs automatically</td></tr>
      <tr><td>Sanity Studio</td><td>Where you edit content: text, images, page layouts, SEO</td><td>Account managers (you)</td></tr>
    </tbody>
  </table>

  <p>When you make a change in Sanity Studio and click <strong>Publish</strong>, the website updates automatically within a few seconds. No deploys, no code changes needed.</p>

  <h2>Key Concepts</h2>

  <h3>Documents</h3>
  <p>Everything in Sanity is a "document." A blog post is a document. A product page is a document. Site Settings is a document. You create, edit, and publish documents.</p>

  <h3>Singletons</h3>
  <p>Some documents exist only once, like Site Settings, Homepage, and the About Page. These are called singletons. You cannot create a second Homepage; you just edit the one that exists.</p>

  <h3>Blocks</h3>
  <p>The Homepage, About Page, and Landing Pages use a <strong>page builder</strong>. Instead of a fixed layout, you build pages by stacking "blocks" in any order you want. A block might be a Hero section, a FAQ accordion, a testimonials grid, or a call-to-action banner. You can reorder, add, or remove blocks at any time.</p>

  <h3>Slugs</h3>
  <p>A slug is the URL-friendly version of a title. For example, the blog post "VA Loan Benefits" has the slug <code>va-loan-benefits-veterans-guide</code>. Product pages have specific slugs that must match exactly (more on this later).</p>

  <div class="callout important">
    <div class="callout-label">Important</div>
    <div class="callout-body">
      Never change a product page's slug after the site is live. It will break the URL. Blog post and guide slugs are safe to set at creation time, but avoid changing them after publishing.
    </div>
  </div>

  <div class="page-footer">
    <span>Kaleidico &middot; Mortgage Boilerplate CMS Guide</span>
    <span>Page 3</span>
  </div>
</div>

<!-- ===================== PAGE 4: STUDIO & SETTINGS ===================== -->
<div class="content-page">
  <div class="page-header">
    <span class="page-header-title">Mortgage Boilerplate CMS Guide</span>
    <span class="page-header-section">02</span>
  </div>

  <h1>Getting Into the Studio</h1>
  <p class="lead">Sanity Studio is a web-based editing interface. You access it through your browser.</p>

  <div class="step">
    <div class="step-number">1</div>
    <div class="step-content">
      <h3>Go to the Studio URL</h3>
      <p>Each client site has its own Studio. The URL is typically <code>clientname.sanity.studio</code> or <code>clientsite.com/studio</code>. Your project manager will provide the correct URL.</p>
    </div>
  </div>

  <div class="step">
    <div class="step-number">2</div>
    <div class="step-content">
      <h3>Log In</h3>
      <p>Sign in with your Sanity account (Google or email). If you do not have access, ask your project manager to invite you to the Sanity project.</p>
    </div>
  </div>

  <div class="step">
    <div class="step-number">3</div>
    <div class="step-content">
      <h3>Navigate the Sidebar</h3>
      <p>The left sidebar shows all content types. <strong>Singletons</strong> (Settings, Homepage, About) appear at the top. Below that, you will see collection types like Product Pages, Blog Posts, Team Members, Guides, and Landing Pages.</p>
    </div>
  </div>

  <h1 style="margin-top: 36px;">Site Settings</h1>
  <p class="lead">The Settings document controls site-wide information that appears in the header, footer, and default SEO.</p>

  <table>
    <thead><tr><th>Field</th><th>What It Controls</th><th>Example</th></tr></thead>
    <tbody>
      <tr><td>Site Name</td><td>Brand name in the header</td><td>FHA Cash Out</td></tr>
      <tr><td>Company Name</td><td>Legal name in the footer</td><td>Mortgage Pipeline</td></tr>
      <tr><td>Phone / Phone Formatted</td><td>Click-to-call and display</td><td>866-866-0653 / (866) 866-0653</td></tr>
      <tr><td>Email</td><td>Contact email everywhere</td><td>info@mortgagepipeline.com</td></tr>
      <tr><td>NMLS</td><td>Displayed in the footer</td><td>2773</td></tr>
      <tr><td>Address</td><td>Office address in footer</td><td>27777 Franklin Rd, Suite 200...</td></tr>
      <tr><td>Apply URL</td><td>Where CTA buttons link</td><td>/apply</td></tr>
      <tr><td>Logo</td><td>Header logo image</td><td>Upload client's logo</td></tr>
      <tr><td>Logo Initials</td><td>Fallback when no logo</td><td>MP</td></tr>
      <tr><td>Social Links</td><td>Footer social media icons</td><td>Facebook, Twitter, etc.</td></tr>
      <tr><td>Footer Text</td><td>Company description in footer</td><td>Short company tagline</td></tr>
      <tr><td>Footer Disclaimer</td><td>Legal disclaimer at bottom</td><td>Equal Housing Lender text</td></tr>
      <tr><td>Newsletter Title/Desc</td><td>Email signup section</td><td>"Stay Informed"</td></tr>
      <tr><td>Default SEO</td><td>Fallback meta tags</td><td>Meta title, description, OG image</td></tr>
    </tbody>
  </table>

  <div class="callout success">
    <div class="callout-label">First Thing to Do</div>
    <div class="callout-body">
      When setting up a new client, Site Settings should be the very first thing you configure. Everything else on the site depends on it.
    </div>
  </div>

  <div class="page-footer">
    <span>Kaleidico &middot; Mortgage Boilerplate CMS Guide</span>
    <span>Page 4</span>
  </div>
</div>

<!-- ===================== PAGE 5: PAGE BUILDER ===================== -->
<div class="content-page">
  <div class="page-header">
    <span class="page-header-title">Mortgage Boilerplate CMS Guide</span>
    <span class="page-header-section">03</span>
  </div>

  <h1>The Page Builder</h1>
  <p class="lead">The Homepage, About Page, and Landing Pages all use a block-based page builder. This gives you full control over the layout without touching code.</p>

  <h2 class="mt-0">How to Use the Page Builder</h2>

  <div class="step">
    <div class="step-number">1</div>
    <div class="step-content">
      <h3>Open the Document</h3>
      <p>Click <strong>Homepage</strong> (or About, or a Landing Page) in the sidebar. You will see a field called <strong>Page Blocks</strong> with a list of blocks.</p>
    </div>
  </div>

  <div class="step">
    <div class="step-number">2</div>
    <div class="step-content">
      <h3>Add a Block</h3>
      <p>Click the <strong>+</strong> button below the blocks list. A dropdown shows all available block types. Select one to add it to the bottom of the page.</p>
    </div>
  </div>

  <div class="step">
    <div class="step-number">3</div>
    <div class="step-content">
      <h3>Configure the Block</h3>
      <p>Click on the block you just added. A panel opens with the block's fields. Fill in the content (titles, descriptions, items, etc.).</p>
    </div>
  </div>

  <div class="step">
    <div class="step-number">4</div>
    <div class="step-content">
      <h3>Reorder Blocks</h3>
      <p>Drag and drop blocks using the handle on the left side of each block. The order in the editor matches the order on the live page.</p>
    </div>
  </div>

  <div class="step">
    <div class="step-number">5</div>
    <div class="step-content">
      <h3>Remove a Block</h3>
      <p>Click the <strong>...</strong> menu on any block and select <strong>Remove</strong>. The block and its content will be deleted from the page.</p>
    </div>
  </div>

  <div class="step">
    <div class="step-number">6</div>
    <div class="step-content">
      <h3>Publish</h3>
      <p>When you are satisfied with the layout, click the <strong>Publish</strong> button in the bottom-right corner. The live site updates within seconds.</p>
    </div>
  </div>

  <div class="callout note">
    <div class="callout-label">Tip</div>
    <div class="callout-body">
      You can preview your changes before publishing. The Studio shows a live preview of the document as you edit. Use this to check your work before going live.
    </div>
  </div>

  <div class="callout important">
    <div class="callout-label">Important</div>
    <div class="callout-body">
      Every page that uses the page builder <strong>must have at least one block</strong>. If you remove all blocks, the page will appear blank to visitors.
    </div>
  </div>

  <div class="page-footer">
    <span>Kaleidico &middot; Mortgage Boilerplate CMS Guide</span>
    <span>Page 5</span>
  </div>
</div>

<!-- ===================== PAGE 6: BLOCKS (PART 1) ===================== -->
<div class="content-page">
  <div class="page-header">
    <span class="page-header-title">Mortgage Boilerplate CMS Guide</span>
    <span class="page-header-section">04</span>
  </div>

  <h1>Available Blocks</h1>
  <p class="lead">There are 14 block types you can use to build pages. Here is what each one does and what fields you need to fill in.</p>

  <div class="block-grid">
    <div class="block-card">
      <h4>Hero</h4>
      <p>The large banner at the top of a page. Fields: <strong>Headline</strong>, <strong>Subheadline</strong>, <strong>Description</strong>, <strong>CTA Button Text</strong>, <strong>CTA Button Link</strong>, <strong>Variant</strong> (home/product/page), <strong>Show ZIP Form</strong>, <strong>Show Stats</strong>, optional <strong>Background Image</strong>.</p>
    </div>
    <div class="block-card">
      <h4>Stats Counter</h4>
      <p>Animated number counters (e.g., "$750M+ Loans Funded"). Fields: An array of <strong>Stats</strong>, each with <strong>Value</strong> (number), <strong>Prefix</strong> (e.g., $), <strong>Suffix</strong> (e.g., M+), and <strong>Label</strong>.</p>
    </div>
    <div class="block-card">
      <h4>Process Steps</h4>
      <p>Numbered steps showing a process (e.g., "How It Works"). Fields: <strong>Section Title</strong>, <strong>Subtitle</strong>, and an array of <strong>Steps</strong> with <strong>Step Number</strong>, <strong>Title</strong>, and <strong>Description</strong>.</p>
    </div>
    <div class="block-card">
      <h4>Product Cards</h4>
      <p>Grid of loan product cards pulled automatically from Product Page documents. Fields: <strong>Section Title</strong>, <strong>Subtitle</strong>, <strong>Show All Products</strong> toggle. Products are pulled from the CMS automatically.</p>
    </div>
    <div class="block-card">
      <h4>Testimonials</h4>
      <p>Customer reviews displayed in a grid. Fields: <strong>Section Title</strong>, <strong>Subtitle</strong>, and an array of <strong>Testimonials</strong> each with <strong>Name</strong>, <strong>Location</strong>, <strong>Rating</strong> (1-5), <strong>Text</strong>, and <strong>Date</strong>.</p>
    </div>
    <div class="block-card">
      <h4>Trust Badges</h4>
      <p>Certification and trust indicator logos. Fields: <strong>Variant</strong> (light or dark background). The badge images are built into the template.</p>
    </div>
    <div class="block-card">
      <h4>Blog Cards</h4>
      <p>Latest blog posts in a card grid, pulled automatically. Fields: <strong>Section Title</strong>, <strong>Subtitle</strong>, <strong>Number to Display</strong> (default 3), optional <strong>Category Filter</strong>, <strong>Show View All Link</strong>.</p>
    </div>
    <div class="block-card">
      <h4>FAQ</h4>
      <p>Expandable accordion of frequently asked questions. Fields: <strong>Section Title</strong>, <strong>Subtitle</strong>, and an array of <strong>FAQ Items</strong> each with <strong>Question</strong> and <strong>Answer</strong>.</p>
    </div>
  </div>

  <div class="page-footer">
    <span>Kaleidico &middot; Mortgage Boilerplate CMS Guide</span>
    <span>Page 6</span>
  </div>
</div>

<!-- ===================== PAGE 7: BLOCKS (PART 2) ===================== -->
<div class="content-page">
  <div class="page-header">
    <span class="page-header-title">Mortgage Boilerplate CMS Guide</span>
    <span class="page-header-section">04</span>
  </div>

  <h2 class="mt-0">More Block Types</h2>

  <div class="block-grid">
    <div class="block-card">
      <h4>Call to Action (CTA)</h4>
      <p>A prominent banner encouraging visitors to take action. Fields: <strong>Heading</strong>, <strong>Description</strong>, <strong>Button Text</strong>, <strong>Button Link</strong>, <strong>Show Phone Number</strong>, <strong>Variant</strong> (default or centered).</p>
    </div>
    <div class="block-card">
      <h4>Lead Capture Form</h4>
      <p>An email/phone capture form for lead generation. Fields: <strong>Variant</strong>, <strong>Title</strong>, <strong>Description</strong>. The form submission logic is built into the template.</p>
    </div>
    <div class="block-card">
      <h4>Guide Download</h4>
      <p>A card promoting a downloadable guide/whitepaper. Fields: A <strong>reference to a Guide document</strong>. The title, description, and page count are pulled from the Guide automatically.</p>
    </div>
    <div class="block-card">
      <h4>Code Embed</h4>
      <p>For embedding third-party tools like mortgage calculators. Fields: <strong>Label</strong> (internal name) and <strong>Embed Code</strong> (paste the script/HTML). Used for calculator widgets and similar tools.</p>
    </div>
    <div class="block-card">
      <h4>Rich Text</h4>
      <p>A flexible rich text content block for paragraphs, headings, bold text, and links. Fields: A <strong>Content</strong> field with a rich text editor. Use this for custom content sections that do not fit other block types.</p>
    </div>
    <div class="block-card">
      <h4>Markdown</h4>
      <p>A full Markdown editor for longer-form content with headings, lists, bold, links, and more. Fields: A <strong>Content</strong> field with a Markdown editor. Ideal for detailed content sections, disclaimers, or legal text.</p>
    </div>
  </div>

  <h2>Recommended Homepage Layout</h2>
  <p>For a standard mortgage client homepage, use this block order:</p>

  <table>
    <thead><tr><th>Order</th><th>Block</th><th>Purpose</th></tr></thead>
    <tbody>
      <tr><td>1</td><td>Hero</td><td>First impression, headline, ZIP code form</td></tr>
      <tr><td>2</td><td>Stats Counter</td><td>Build credibility with numbers</td></tr>
      <tr><td>3</td><td>Process Steps</td><td>Show how simple the process is</td></tr>
      <tr><td>4</td><td>Product Cards</td><td>Display available loan products</td></tr>
      <tr><td>5</td><td>Testimonials</td><td>Social proof from real clients</td></tr>
      <tr><td>6</td><td>Trust Badges</td><td>Certifications and credentials</td></tr>
      <tr><td>7</td><td>Blog Cards</td><td>Show expertise with recent content</td></tr>
      <tr><td>8</td><td>FAQ</td><td>Answer common questions</td></tr>
      <tr><td>9</td><td>CTA</td><td>Final push to apply</td></tr>
    </tbody>
  </table>

  <div class="callout note">
    <div class="callout-label">Tip</div>
    <div class="callout-body">
      You do not have to use all block types. Some clients may not need testimonials yet, or may not have blog content. Start with what you have and add blocks as content becomes available.
    </div>
  </div>

  <div class="page-footer">
    <span>Kaleidico &middot; Mortgage Boilerplate CMS Guide</span>
    <span>Page 7</span>
  </div>
</div>

<!-- ===================== PAGE 8: PRODUCT PAGES ===================== -->
<div class="content-page">
  <div class="page-header">
    <span class="page-header-title">Mortgage Boilerplate CMS Guide</span>
    <span class="page-header-section">05</span>
  </div>

  <h1>Product Pages</h1>
  <p class="lead">Product Pages are fixed-structure documents for each loan type. Unlike the page builder, these have specific fields that map to a consistent layout.</p>

  <h2 class="mt-0">Required Slugs</h2>
  <p>Each product page must have an exact slug that matches the website's URL structure. These cannot be changed.</p>

  <table>
    <thead><tr><th>Loan Type</th><th>Slug (Do Not Change)</th><th>URL on Site</th></tr></thead>
    <tbody>
      <tr><td>Conventional Purchase</td><td><code>purchase-conventional</code></td><td>/purchase/conventional</td></tr>
      <tr><td>FHA Purchase</td><td><code>purchase-fha</code></td><td>/purchase/fha</td></tr>
      <tr><td>VA Purchase</td><td><code>purchase-va</code></td><td>/purchase/va</td></tr>
      <tr><td>Cash-Out Refinance</td><td><code>refinance-cash-out</code></td><td>/refinance/cash-out</td></tr>
      <tr><td>Conventional Refinance</td><td><code>refinance-conventional</code></td><td>/refinance/conventional</td></tr>
      <tr><td>FHA Streamline</td><td><code>refinance-fha-streamline</code></td><td>/refinance/fha-streamline</td></tr>
      <tr><td>HELOC</td><td><code>heloc</code></td><td>/heloc</td></tr>
    </tbody>
  </table>

  <h2>Product Page Fields</h2>

  <table>
    <thead><tr><th>Field</th><th>What It Does</th></tr></thead>
    <tbody>
      <tr><td>Title</td><td>The main heading (e.g., "FHA Purchase Loan")</td></tr>
      <tr><td>Subtitle</td><td>Appears below the title in the hero</td></tr>
      <tr><td>Hero Description</td><td>A 1-2 sentence overview in the hero section</td></tr>
      <tr><td>What Is Section</td><td>Title and content explaining the loan type</td></tr>
      <tr><td>Benefits</td><td>List of bullet points (e.g., "3.5% down payment")</td></tr>
      <tr><td>Requirements</td><td>Label/value pairs (e.g., "Min Credit Score" / "620")</td></tr>
      <tr><td>Process Steps</td><td>Numbered steps from application to closing</td></tr>
      <tr><td>FAQs</td><td>Question and answer pairs specific to this loan type</td></tr>
      <tr><td>SEO</td><td>Meta title, description, OG image for this page</td></tr>
    </tbody>
  </table>

  <div class="callout warning">
    <div class="callout-label">Warning</div>
    <div class="callout-body">
      If a client does not offer a particular loan type, <strong>do not create a product page for it</strong>. The navigation links in the website header are managed by the development team. Ask them to remove the nav link for any loan types the client does not offer.
    </div>
  </div>

  <div class="callout note">
    <div class="callout-label">Note</div>
    <div class="callout-body">
      Product pages also have custom content sections (comparison tables, pro tips, etc.) that are coded into each page template. These cannot be edited through Sanity. If a client needs changes to those sections, submit a development request.
    </div>
  </div>

  <div class="page-footer">
    <span>Kaleidico &middot; Mortgage Boilerplate CMS Guide</span>
    <span>Page 8</span>
  </div>
</div>

<!-- ===================== PAGE 9: BLOG POSTS ===================== -->
<div class="content-page">
  <div class="page-header">
    <span class="page-header-title">Mortgage Boilerplate CMS Guide</span>
    <span class="page-header-section">06</span>
  </div>

  <h1>Blog Posts</h1>
  <p class="lead">Blog posts are written in Markdown and support categories, author attribution, and featured images. They appear on the blog archive page and can be featured on the homepage via the Blog Cards block.</p>

  <h2 class="mt-0">Creating a Blog Post</h2>

  <div class="step">
    <div class="step-number">1</div>
    <div class="step-content">
      <h3>Click "Blog Post" in the sidebar, then the + icon</h3>
      <p>This creates a new, empty blog post document.</p>
    </div>
  </div>

  <div class="step">
    <div class="step-number">2</div>
    <div class="step-content">
      <h3>Fill in the fields</h3>
      <p>See the field reference table below. Title, Slug, and Publish Date are required.</p>
    </div>
  </div>

  <div class="step">
    <div class="step-number">3</div>
    <div class="step-content">
      <h3>Write the body in Markdown</h3>
      <p>The Body field uses a Markdown editor. Use <code># Heading</code> for headings, <code>**bold**</code> for bold, <code>[link text](url)</code> for links, and blank lines between paragraphs.</p>
    </div>
  </div>

  <div class="step">
    <div class="step-number">4</div>
    <div class="step-content">
      <h3>Assign an author</h3>
      <p>Select a Team Member as the author. Their name and photo will appear on the blog post page.</p>
    </div>
  </div>

  <h2>Blog Post Fields</h2>

  <table>
    <thead><tr><th>Field</th><th>Required</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td>Title</td><td>Yes</td><td>The blog post headline</td></tr>
      <tr><td>Slug</td><td>Yes</td><td>Auto-generated from title. Review before publishing.</td></tr>
      <tr><td>Excerpt</td><td>No</td><td>Short summary shown on blog cards (1-2 sentences)</td></tr>
      <tr><td>Category</td><td>No</td><td>Options: Refinancing, FHA Loans, VA Loans, Education, Tips, HELOC, Market Updates</td></tr>
      <tr><td>Featured Image</td><td>No</td><td>Shown on blog cards and at top of post. Include alt text.</td></tr>
      <tr><td>Body</td><td>No</td><td>Full post content in Markdown format</td></tr>
      <tr><td>Author</td><td>No</td><td>Reference to a Team Member document</td></tr>
      <tr><td>Publish Date</td><td>Yes</td><td>Controls the sort order on the blog archive</td></tr>
      <tr><td>Read Time</td><td>No</td><td>e.g., "5 min read"</td></tr>
      <tr><td>SEO</td><td>No</td><td>Custom meta title and description for this post</td></tr>
    </tbody>
  </table>

  <div class="callout important">
    <div class="callout-label">Important</div>
    <div class="callout-body">
      Always set a <strong>Publish Date</strong>. Posts without a date will still appear but will sort unpredictably. Also, always write a short <strong>Excerpt</strong> because it appears on blog cards and in search results.
    </div>
  </div>

  <div class="page-footer">
    <span>Kaleidico &middot; Mortgage Boilerplate CMS Guide</span>
    <span>Page 9</span>
  </div>
</div>

<!-- ===================== PAGE 10: TEAM, GUIDES, ABOUT ===================== -->
<div class="content-page">
  <div class="page-header">
    <span class="page-header-title">Mortgage Boilerplate CMS Guide</span>
    <span class="page-header-section">07</span>
  </div>

  <h1>Team, Guides & About</h1>

  <h2 class="mt-0">Team Members</h2>
  <p>Team Member documents represent loan officers. They appear on the About page and as blog post authors.</p>

  <table>
    <thead><tr><th>Field</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td>Name</td><td>Full name (required)</td></tr>
      <tr><td>Job Title</td><td>e.g., "Senior Loan Officer"</td></tr>
      <tr><td>NMLS Number</td><td>Displayed alongside the name</td></tr>
      <tr><td>Bio</td><td>2-3 sentence professional bio</td></tr>
      <tr><td>Photo</td><td>Professional headshot. Include alt text.</td></tr>
      <tr><td>Email / Phone</td><td>Contact info (optional)</td></tr>
    </tbody>
  </table>

  <h2>Guides / Whitepapers</h2>
  <p>Guides are downloadable PDF resources that appear on the Guides page and can be featured anywhere via the Guide Download block.</p>

  <table>
    <thead><tr><th>Field</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td>Title</td><td>Guide name (required)</td></tr>
      <tr><td>Slug</td><td>URL-friendly identifier (required)</td></tr>
      <tr><td>Description</td><td>1-2 sentence summary</td></tr>
      <tr><td>Cover Image</td><td>Thumbnail shown on the guide card</td></tr>
      <tr><td>PDF File</td><td>Upload the actual PDF document</td></tr>
      <tr><td>Page Count</td><td>Displayed on the card (e.g., "24")</td></tr>
    </tbody>
  </table>

  <h2>About Page</h2>
  <p>The About page is a singleton with two parts:</p>

  <table>
    <thead><tr><th>Part</th><th>How It Works</th></tr></thead>
    <tbody>
      <tr><td>Mission Section</td><td>Fixed fields: <strong>Mission Title</strong> and <strong>Mission Text</strong>. These always appear at the top.</td></tr>
      <tr><td>Page Blocks</td><td>Same page builder as the Homepage. Add any blocks below the mission section.</td></tr>
      <tr><td>Team Section</td><td>Automatically pulls all Team Member documents. No configuration needed.</td></tr>
    </tbody>
  </table>

  <div class="callout success">
    <div class="callout-label">Pro Tip</div>
    <div class="callout-body">
      Create Team Members before building the About page. The About page automatically displays all team members, so once they exist, they just show up.
    </div>
  </div>

  <div class="page-footer">
    <span>Kaleidico &middot; Mortgage Boilerplate CMS Guide</span>
    <span>Page 10</span>
  </div>
</div>

<!-- ===================== PAGE 11: LANDING PAGES ===================== -->
<div class="content-page">
  <div class="page-header">
    <span class="page-header-title">Mortgage Boilerplate CMS Guide</span>
    <span class="page-header-section">08</span>
  </div>

  <h1>Landing Pages (PPC)</h1>
  <p class="lead">Landing Pages are standalone pages designed for paid advertising campaigns. They use the same page builder as the Homepage but render without the site header and footer, keeping visitors focused on conversion.</p>

  <h2 class="mt-0">Creating a Landing Page</h2>

  <div class="step">
    <div class="step-number">1</div>
    <div class="step-content">
      <h3>Create a new Landing Page document</h3>
      <p>Click "Landing Page" in the sidebar, then the <strong>+</strong> icon.</p>
    </div>
  </div>

  <div class="step">
    <div class="step-number">2</div>
    <div class="step-content">
      <h3>Set the Title and Slug</h3>
      <p>The slug becomes the URL. For example, a slug of <code>heloc-spring-promo</code> creates the page at <code>clientsite.com/heloc-spring-promo</code>.</p>
    </div>
  </div>

  <div class="step">
    <div class="step-number">3</div>
    <div class="step-content">
      <h3>Build with Blocks</h3>
      <p>Add blocks just like the Homepage. A typical PPC landing page uses: <strong>Hero</strong> (with a strong headline and CTA), <strong>Trust Badges</strong>, <strong>Process Steps</strong>, <strong>Testimonials</strong>, <strong>FAQ</strong>, and a <strong>Lead Capture Form</strong>.</p>
    </div>
  </div>

  <div class="step">
    <div class="step-number">4</div>
    <div class="step-content">
      <h3>Set SEO fields</h3>
      <p>Add a meta title and description. This is especially important for PPC quality scores.</p>
    </div>
  </div>

  <div class="callout important">
    <div class="callout-label">Important</div>
    <div class="callout-body">
      Landing page slugs must not conflict with existing site pages. Avoid slugs like <code>blog</code>, <code>about</code>, <code>contact</code>, <code>apply</code>, <code>heloc</code>, or any product page slug. If in doubt, prefix with the campaign name (e.g., <code>spring-2026-fha</code>).
    </div>
  </div>

  <h2>Landing Page vs. Regular Page</h2>

  <table>
    <thead><tr><th>Feature</th><th>Regular Page</th><th>Landing Page</th></tr></thead>
    <tbody>
      <tr><td>Header / Navigation</td><td>Yes</td><td>No</td></tr>
      <tr><td>Footer</td><td>Yes</td><td>No</td></tr>
      <tr><td>Page Builder</td><td>Yes (Homepage, About)</td><td>Yes</td></tr>
      <tr><td>URL Pattern</td><td>/purchase/fha, /blog, etc.</td><td>/your-slug</td></tr>
      <tr><td>Use Case</td><td>Organic traffic, site visitors</td><td>Paid ads, campaigns</td></tr>
    </tbody>
  </table>

  <div class="page-footer">
    <span>Kaleidico &middot; Mortgage Boilerplate CMS Guide</span>
    <span>Page 11</span>
  </div>
</div>

<!-- ===================== PAGE 12: PUBLISHING & SEO ===================== -->
<div class="content-page">
  <div class="page-header">
    <span class="page-header-title">Mortgage Boilerplate CMS Guide</span>
    <span class="page-header-section">09</span>
  </div>

  <h1>Publishing & SEO</h1>
  <p class="lead">Every document must be published to appear on the live site. Draft changes are only visible inside the Studio.</p>

  <h2 class="mt-0">How Publishing Works</h2>
  <div class="step">
    <div class="step-number">1</div>
    <div class="step-content"><h3>Edit your content</h3><p>Changes are saved as drafts automatically. The live site does not change yet.</p></div>
  </div>
  <div class="step">
    <div class="step-number">2</div>
    <div class="step-content"><h3>Click Publish</h3><p>The green <strong>Publish</strong> button in the bottom-right corner pushes your changes live. Updates appear within seconds.</p></div>
  </div>
  <div class="step">
    <div class="step-number">3</div>
    <div class="step-content"><h3>Verify on the live site</h3><p>Always check the actual page after publishing to confirm everything looks correct.</p></div>
  </div>

  <h2>SEO Fields</h2>
  <p>Every document type has an SEO section at the bottom. These control how the page appears in Google and social media.</p>
  <table>
    <thead><tr><th>Field</th><th>What It Controls</th><th>Best Practice</th></tr></thead>
    <tbody>
      <tr><td><strong>Meta Title</strong></td><td>Browser tab + Google title</td><td>50-60 chars. Primary keyword first. End with brand name: <code>FHA Loans | Brand</code></td></tr>
      <tr><td><strong>Meta Description</strong></td><td>Google snippet below title</td><td>150-160 chars. Benefit-focused. Use action words: "Learn," "Apply," "Compare"</td></tr>
      <tr><td><strong>OG Image</strong></td><td>Social media share image</td><td>1200x630px branded image. Without one, social platforms guess poorly.</td></tr>
      <tr><td>Canonical URL</td><td>Preferred URL for dupes</td><td>Leave blank (auto-generated).</td></tr>
      <tr><td>No Index</td><td>Hides from search engines</td><td>Only for PPC landing pages you want hidden from organic search.</td></tr>
    </tbody>
  </table>

  <div class="callout warning">
    <div class="callout-label">Do Not Skip SEO Fields</div>
    <div class="callout-body">
      <strong>SEO fields are not optional.</strong> Every page published without a Meta Title and Meta Description is a missed opportunity. Google uses these to decide what to show in results. Without them, Google guesses, and it usually guesses poorly. Pages with no meta description get significantly fewer clicks. Fill these in for <strong>every single page</strong> before hitting Publish.
    </div>
  </div>

  <h2>New Client Setup Checklist</h2>
  <ul class="checklist">
    <li>Configure Site Settings (company info, phone, email, NMLS, logo, social, footer)</li>
    <li>Create Product Pages for each loan type + fill in SEO fields on each</li>
    <li>Build Homepage with blocks + set Homepage SEO (most important page)</li>
    <li>Add Team Members (at least one loan officer)</li>
    <li>Configure About Page (mission statement + SEO fields)</li>
    <li>Create at least 3 blog posts with SEO fields for content credibility</li>
    <li>Upload any downloadable guides/whitepapers</li>
    <li>Publish everything and verify on the live site</li>
  </ul>

  <div class="contact-box">
    <h3>Need Help?</h3>
    <p>If you encounter issues with the Studio, content not appearing, or anything that seems like a bug, reach out to the development team on Slack. Include the client name, the page you were editing, and a screenshot.</p>
  </div>

  <div class="page-footer">
    <span>Kaleidico &middot; Mortgage Boilerplate CMS Guide</span>
    <span>Page 12</span>
  </div>
</div>

<!-- ===================== PAGE 13: BUILT-IN SEO ===================== -->
<div class="content-page">
  <div class="page-header">
    <span class="page-header-title">Mortgage Boilerplate CMS Guide</span>
    <span class="page-header-section">10</span>
  </div>

  <h1>Built-in SEO Infrastructure</h1>
  <p class="lead">Beyond the SEO fields you fill in manually, the platform includes a full suite of technical SEO features that run automatically. These give every client site a strong search foundation from day one.</p>

  <h2 class="mt-0">Automatic SEO Features</h2>
  <table>
    <thead><tr><th>Feature</th><th>Details</th></tr></thead>
    <tbody>
      <tr><td><strong>XML Sitemap</strong></td><td>Auto-generated at <code>/sitemap.xml</code>. Updates every time you publish. Includes all pages, products, blog posts, and guides. Search engines use this to discover content.</td></tr>
      <tr><td><strong>robots.txt</strong></td><td>At <code>/robots.txt</code>. Tells crawlers which pages to index and links to the sitemap. Preconfigured to allow public pages and block /studio and /api routes.</td></tr>
      <tr><td><strong>llms.txt</strong></td><td>At <code>/llms.txt</code>. Provides structured context for AI systems (ChatGPT, Perplexity, Google AI Overviews). Keeps the client visible in AI-powered search results.</td></tr>
      <tr><td><strong>JSON-LD Structured Data</strong></td><td>Schema.org data on every page: <strong>Organization</strong> (name, logo, contact), <strong>LocalBusiness</strong> (address, phone), <strong>FAQPage</strong> (rich FAQ results in Google), <strong>BreadcrumbList</strong> (nav breadcrumbs in SERPs).</td></tr>
      <tr><td><strong>Canonical Tags</strong></td><td>Auto-generated <code>&lt;link rel="canonical"&gt;</code> on every page. Prevents duplicate content issues.</td></tr>
      <tr><td><strong>Meta Fallbacks</strong></td><td>If SEO fields are blank, the system uses Default SEO from Site Settings. No page ever has missing meta tags.</td></tr>
      <tr><td><strong>Open Graph + Twitter Cards</strong></td><td>Full OG and Twitter Card meta on every page. Shared links on Facebook, LinkedIn, Twitter, and Slack display with correct title, image, and description.</td></tr>
    </tbody>
  </table>

  <h2>Technical SEO Architecture</h2>
  <table>
    <thead><tr><th>Feature</th><th>Details</th></tr></thead>
    <tbody>
      <tr><td><strong>Server-Side Rendering</strong></td><td>Every page is pre-rendered as static HTML. Crawlers see full content immediately (no JS rendering delays).</td></tr>
      <tr><td><strong>Semantic HTML</strong></td><td>Proper H1/H2/H3 hierarchy, landmark regions (<code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code>), and semantic elements.</td></tr>
      <tr><td><strong>Clean URLs</strong></td><td>Keyword-rich hierarchy: <code>/purchase/fha</code>, <code>/refinance/cash-out</code>, <code>/blog/post-title</code>. No query params or IDs.</td></tr>
      <tr><td><strong>Image CDN</strong></td><td>Images auto-served in WebP/AVIF at exact display size via Sanity CDN. Faster loads = better rankings.</td></tr>
    </tbody>
  </table>

  <div class="page-footer">
    <span>Kaleidico &middot; Mortgage Boilerplate CMS Guide</span>
    <span>Page 13</span>
  </div>
</div>

<!-- ===================== PAGE 14: ADA COMPLIANCE ===================== -->
<div class="content-page">
  <div class="page-header">
    <span class="page-header-title">Mortgage Boilerplate CMS Guide</span>
    <span class="page-header-section">11</span>
  </div>

  <h1>ADA & Accessibility Compliance</h1>
  <p class="lead">The platform is built to meet WCAG 2.1 AA standards, the accepted benchmark for web accessibility. This protects clients against ADA compliance lawsuits, which are a growing concern in financial services. Over 4,000 ADA web accessibility lawsuits were filed in 2023 alone.</p>

  <h2 class="mt-0">What WCAG 2.1 AA Means</h2>
  <p>WCAG (Web Content Accessibility Guidelines) is the international standard for making web content accessible to people with disabilities. Level AA is the standard that courts, regulators, and the DOJ reference in enforcement actions. Every component in this platform is built to meet or exceed AA requirements.</p>

  <h2>Accessibility Features</h2>
  <table>
    <thead><tr><th>Feature</th><th>What It Does</th></tr></thead>
    <tbody>
      <tr><td><strong>Keyboard Navigation</strong></td><td>Every button, link, form, menu, and accordion works with keyboard only (Tab, Enter, Space, Escape).</td></tr>
      <tr><td><strong>Screen Reader Support</strong></td><td>ARIA labels, roles, and live regions on all components. Works with JAWS, NVDA, and VoiceOver.</td></tr>
      <tr><td><strong>Focus Indicators</strong></td><td>Visible focus rings on all interactive elements. Proper focus management for modals and menus.</td></tr>
      <tr><td><strong>Color Contrast</strong></td><td>All text meets AA contrast ratios (4.5:1 body, 3:1 large). No color-only information.</td></tr>
      <tr><td><strong>Alt Text</strong></td><td>Every image field includes alt text input. <strong>Always fill this in</strong> for compliance.</td></tr>
      <tr><td><strong>Form Accessibility</strong></td><td>Associated labels, screen reader error announcements, and properly indicated required fields.</td></tr>
      <tr><td><strong>Responsive Text</strong></td><td>Text can zoom to 200% without content loss. Meets WCAG resize requirements.</td></tr>
      <tr><td><strong>Skip Navigation</strong></td><td>Hidden "Skip to content" link for keyboard users to bypass the navigation menu.</td></tr>
    </tbody>
  </table>

  <div class="callout important">
    <div class="callout-label">Your Role in Accessibility</div>
    <div class="callout-body">
      The platform handles the technical accessibility, but content editors play a role too. <strong>Always fill in alt text</strong> when uploading images. Use descriptive link text (not "click here"). Write clear, descriptive headings. These small actions maintain the site's compliance.
    </div>
  </div>

  <div class="page-footer">
    <span>Kaleidico &middot; Mortgage Boilerplate CMS Guide</span>
    <span>Page 14</span>
  </div>
</div>

<!-- ===================== PAGE 15: PERFORMANCE & SECURITY ===================== -->
<div class="content-page">
  <div class="page-header">
    <span class="page-header-title">Mortgage Boilerplate CMS Guide</span>
    <span class="page-header-section">12</span>
  </div>

  <h1>Performance & Security</h1>
  <p class="lead">Page load speed directly affects search rankings and conversion rates. A 1-second delay reduces conversions by 7%. The platform is engineered for sub-second load times and enterprise-grade security.</p>

  <h2 class="mt-0">Performance</h2>
  <table>
    <thead><tr><th>Feature</th><th>Details</th></tr></thead>
    <tbody>
      <tr><td><strong>Static Generation</strong></td><td>Pages pre-built at deploy time. Sub-second load times from ready-made HTML files.</td></tr>
      <tr><td><strong>Global CDN</strong></td><td>Deployed to a worldwide edge network. Visitors served from nearest data center.</td></tr>
      <tr><td><strong>Image Optimization</strong></td><td>Auto-resized, compressed, WebP/AVIF. Lazy loading for below-fold images.</td></tr>
      <tr><td><strong>Code Splitting</strong></td><td>Only the JS needed for the current page loads. Minimal code on navigation.</td></tr>
      <tr><td><strong>Instant Revalidation</strong></td><td>Publishing in Sanity rebuilds only affected pages. Rest stays cached.</td></tr>
      <tr><td><strong>Font Optimization</strong></td><td>Self-hosted, preloaded fonts. No render-blocking external requests.</td></tr>
      <tr><td><strong>Core Web Vitals</strong></td><td>Optimized for Google's LCP, FID, and CLS metrics (direct ranking factors).</td></tr>
    </tbody>
  </table>

  <h2>Security</h2>
  <table>
    <thead><tr><th>Feature</th><th>Details</th></tr></thead>
    <tbody>
      <tr><td><strong>HTTPS / TLS</strong></td><td>All traffic encrypted. Auto HTTP-to-HTTPS redirect. Required by Google for ranking.</td></tr>
      <tr><td><strong>No Database</strong></td><td>No SQL database on production. Content served as static files. Zero SQL injection risk.</td></tr>
      <tr><td><strong>Security Headers</strong></td><td>CSP, X-Frame-Options, HSTS headers prevent XSS, clickjacking, and MIME attacks.</td></tr>
      <tr><td><strong>Input Sanitization</strong></td><td>All form inputs validated and sanitized on both client and server.</td></tr>
      <tr><td><strong>DDoS Protection</strong></td><td>Built-in mitigation and rate limiting at the edge.</td></tr>
      <tr><td><strong>Isolated CMS</strong></td><td>Studio runs separately from production. No shared infrastructure.</td></tr>
      <tr><td><strong>Role-Based Access</strong></td><td>Editor, developer, and admin roles control who can publish content.</td></tr>
    </tbody>
  </table>

  <div class="callout note">
    <div class="callout-label">For Client Conversations</div>
    <div class="callout-body">
      When clients ask about the technology: the site is built on Next.js (used by Nike, Hulu, TikTok), hosted on Vercel's enterprise infrastructure with global CDN, uses Sanity's enterprise CMS, meets WCAG 2.1 AA accessibility standards, scores 90+ on Google PageSpeed Insights, and includes enterprise-grade security with HTTPS, CSP headers, and DDoS protection. These are the same standards used by major financial institutions.
    </div>
  </div>

  <div class="page-footer">
    <span>Kaleidico &middot; Mortgage Boilerplate CMS Guide</span>
    <span>Page 15</span>
  </div>
</div>

</body>
</html>`;

async function generatePDF() {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log("Rendering HTML...");
  await page.setContent(html, { waitUntil: "networkidle0" });

  console.log("Generating PDF...");
  await page.pdf({
    path: outputPath,
    format: "letter",
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });

  await browser.close();
  console.log(`PDF saved to: ${outputPath}`);
}

generatePDF().catch((err) => {
  console.error("PDF generation failed:", err);
  process.exit(1);
});
