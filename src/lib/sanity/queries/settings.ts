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
  return await client.fetch(settingsQuery, {}, { next: { tags: ["settings"] } });
}
