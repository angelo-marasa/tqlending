import { client } from "../client";

export const landingPageQuery = `*[_type == "landingPage" && slug.current == $slug][0]{
  title,
  blocks[]{
    _type,
    _key,
    ...,
    _type == "guideDownloadBlock" => {
      "guide": guide->{title, description, pages, "slug": slug.current}
    }
  },
  seo
}`;

export async function getLandingPage(slug: string) {
  return await client.fetch(
    landingPageQuery,
    { slug },
    { next: { tags: [`landing-${slug}`] } }
  );
}
