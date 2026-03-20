import type { Metadata } from "next";
import { getHomepage } from "@/lib/sanity/queries/homepage";
import { BlockRenderer } from "@/components/blocks/block-renderer";

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepage();
  if (!homepage?.seo) return {};
  return {
    title: homepage.seo.metaTitle,
    description: homepage.seo.metaDescription,
  };
}

export default async function HomePage() {
  const homepage = await getHomepage();
  if (!homepage?.blocks) return null;
  return <BlockRenderer blocks={homepage.blocks} />;
}
