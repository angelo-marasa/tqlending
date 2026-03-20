import { getBlogPosts } from "@/lib/sanity/queries/blog";
import { HeroSection } from "@/components/sections/hero-section";
import { BlogArchiveClient } from "@/components/blog/blog-archive-client";

export default async function BlogArchivePage() {
  const posts = await getBlogPosts();

  return (
    <>
      <HeroSection
        variant="page"
        headline="Blog"
        subheadline="Mortgage Tips, Guides & Industry News"
      />
      <BlogArchiveClient posts={posts} />
    </>
  );
}
