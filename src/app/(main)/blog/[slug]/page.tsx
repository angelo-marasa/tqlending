import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { LeadCaptureForm } from "@/components/sections/lead-capture-form";
import { getBlogPost } from "@/lib/sanity/queries/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    ...(post.seo?.canonicalUrl && {
      alternates: { canonical: post.seo.canonicalUrl },
    }),
    ...(post.seo?.noIndex && { robots: { index: false } }),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 gradient-hero opacity-100" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">
            {post.category}
          </Badge>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl text-balance">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-primary-foreground/70">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {post.readTime}
            </span>
          </div>
          {post.author && (
            <div className="mt-6 flex items-center justify-center gap-3">
              {post.author.image && (
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div className="text-left">
                <p className="text-sm font-medium text-primary-foreground">
                  {post.author.name}
                </p>
                {post.author.title && (
                  <p className="text-xs text-primary-foreground/60">
                    {post.author.title}
                    {post.author.nmls && ` | NMLS# ${post.author.nmls}`}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Article Body */}
            <article className="lg:col-span-2 max-w-none">
              {/* Hero Image */}
              {post.image && (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-10">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                </div>
              )}

              {/* Body Content */}
              {post.body ? (
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown>{post.body}</ReactMarkdown>
                </div>
              ) : (
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <p className="text-sm text-muted-foreground italic mt-8">
                    Full article content coming soon.
                  </p>
                </div>
              )}

              {/* End-of-Article CTA */}
              <div className="mt-12 rounded-xl border-2 border-primary/20 bg-primary/5 p-8 text-center">
                <p className="font-heading text-2xl font-bold text-foreground mb-2">
                  Ready to Get Started?
                </p>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  Speak with a licensed loan officer today. No obligation, no
                  pressure, just expert guidance tailored to your goals.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/apply"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                Back to all posts
              </Link>

              <LeadCaptureForm
                title="Get Your Free Rate Quote"
                description="See what rates you qualify for today."
              />

              {/* Related Posts */}
              {post.relatedPosts && post.relatedPosts.length > 0 && (
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                    Related Posts
                  </h3>
                  <div className="space-y-3">
                    {post.relatedPosts.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/blog/${related.slug}`}
                      >
                        <div className="flex gap-3 border-l-2 border-secondary pl-3 py-2 rounded-r-md hover:bg-muted/50 transition-colors">
                          <div className="shrink-0 w-20 aspect-[3/2] rounded-md bg-gradient-to-br from-primary/20 to-secondary/30 relative overflow-hidden">
                            {related.image && (
                              <Image
                                src={related.image}
                                alt={related.title}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            )}
                          </div>
                          <div className="flex flex-col gap-1 min-w-0">
                            <Badge
                              variant="secondary"
                              className="text-xs w-fit"
                            >
                              {related.category}
                            </Badge>
                            <h4 className="text-sm font-medium leading-snug text-foreground line-clamp-2">
                              {related.title}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {related.excerpt}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
