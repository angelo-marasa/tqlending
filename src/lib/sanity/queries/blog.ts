import { client } from "../client";

export const blogListQuery = `*[_type == "blogPost"] | order(publishDate desc) {
  title,
  "slug": slug.current,
  excerpt,
  category,
  "date": publishDate,
  readTime,
  "image": featuredImage.asset->url,
  "author": author->{name, "image": photo.asset->url}
}`;

export const blogPostQuery = `*[_type == "blogPost" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  excerpt,
  category,
  "date": publishDate,
  readTime,
  "image": featuredImage.asset->url,
  body,
  "author": author->{name, title, nmls, "image": photo.asset->url},
  seo,
  "relatedPosts": *[_type == "blogPost" && slug.current != ^.slug.current] | order(publishDate desc) [0...3] {
    title,
    "slug": slug.current,
    excerpt,
    category,
    "image": featuredImage.asset->url
  }
}`;

export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string | null;
  author?: { name: string; image: string | null };
};

export type BlogPostDetail = BlogPost & {
  body: string;
  author?: { name: string; title: string; nmls: string; image: string | null };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: any;
    canonicalUrl?: string;
    noIndex?: boolean;
  };
  relatedPosts: {
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    image: string | null;
  }[];
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  return await client.fetch(blogListQuery, {}, { next: { tags: ["blog"] } });
}

export async function getBlogPost(
  slug: string
): Promise<BlogPostDetail | null> {
  return await client.fetch(
    blogPostQuery,
    { slug },
    { next: { tags: [`blog-${slug}`] } }
  );
}
