import { client } from "../client";

export const guidesQuery = `*[_type == "guide"] | order(_createdAt desc) {
  title,
  "slug": slug.current,
  description,
  pages,
  "pdfUrl": pdfFile.asset->url,
  "coverImage": coverImage.asset->url,
  seo
}`;

export type GuideData = {
  title: string;
  slug: string;
  description: string;
  pages: string;
  pdfUrl: string | null;
  coverImage: string | null;
  seo?: any;
};

export async function getGuides(): Promise<GuideData[]> {
  return await client.fetch(guidesQuery, {}, { next: { tags: ["guides"] } });
}
