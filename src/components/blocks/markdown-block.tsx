import ReactMarkdown from "react-markdown";

export function MarkdownBlock({ content }: { content: string }) {
  if (!content) return null;
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-lg prose-slate max-w-none [&>h2]:font-heading [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:sm:text-3xl [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:font-heading [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-foreground [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>p]:mb-4 [&>ul]:text-muted-foreground [&>ol]:text-muted-foreground [&>a]:text-primary [&>a]:hover:underline [&>blockquote]:border-l-primary [&>blockquote]:text-muted-foreground">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </section>
  );
}
