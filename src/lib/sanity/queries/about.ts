import { client } from "../client";

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

export type AboutPageData = {
  missionTitle: string;
  missionText: string;
  blocks: any[];
  seo?: any;
  teamMembers: {
    name: string;
    title: string;
    nmls: string;
    bio: string;
    image: string | null;
  }[];
};

export async function getAboutPage(): Promise<AboutPageData | null> {
  return await client.fetch(aboutQuery, {}, { next: { tags: ["about", "team"] } });
}
