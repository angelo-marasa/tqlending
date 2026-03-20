import { client } from "../client";

export const homepageQuery = `*[_type == "homepage"][0]{
  blocks[]{
    _type,
    _key,
    ...,
    _type == "guideDownloadBlock" => {
      "guide": guide->{title, description, pages, "slug": slug.current}
    },
    _type == "blogCardsBlock" => {
      ...,
      "posts": *[_type == "blogPost"] | order(publishDate desc) [0...6] {
        title,
        "slug": slug.current,
        excerpt,
        category,
        "date": publishDate,
        readTime,
        "image": featuredImage.asset->url
      }
    },
    _type == "productCardsBlock" => {
      ...,
      "products": *[_type == "productPage"] {
        title,
        "slug": slug.current,
        "description": heroDescription,
        "highlights": benefits[0...3],
        "category": select(
          slug.current match "purchase-*" => "purchase",
          slug.current match "refinance-*" => "refinance",
          "other"
        ),
        "featured": slug.current in ["refinance-cash-out", "purchase-fha", "purchase-va"]
      }
    }
  },
  seo
}`;

export async function getHomepage() {
  return await client.fetch(homepageQuery, {}, { next: { tags: ["homepage"] } });
}
