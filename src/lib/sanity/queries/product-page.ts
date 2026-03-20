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
  return await client.fetch(
    productPageQuery,
    { slug },
    { next: { tags: [`product-${slug}`] } }
  );
}

export const allProductPagesQuery = `*[_type == "productPage"]{
  title,
  "slug": slug.current,
  subtitle,
  heroDescription,
  benefits[0...3]
}`;

export async function getAllProductPages() {
  return await client.fetch(allProductPagesQuery, {}, { next: { tags: ["products"] } });
}
