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
