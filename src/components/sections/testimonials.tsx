import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, SlideIn } from "@/components/ui/motion";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-secondary text-secondary"
              : "fill-muted text-muted"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .filter((c) => c && c === c.toUpperCase())
    .join("")
    .slice(0, 2);

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-heading font-bold text-sm">
      {initials}
    </div>
  );
}

export function Testimonials({
  testimonials,
  title = "What Our Clients Say",
  subtitle = "Trusted by Thousands",
}: TestimonialsProps) {
  const featured = testimonials[0];
  const secondary = testimonials.slice(1, 3);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn>
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
            {subtitle}
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
        </div>
        </FadeIn>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Featured Testimonial - Left Column */}
          {featured && (
            <SlideIn direction="left" delay={0.1} className="lg:col-span-3">
            <Card className="border-0 border-l-4 border-l-secondary shadow-md rounded-xl h-full">
              <CardContent className="p-8 sm:p-10">
                <StarRating rating={featured.rating} />
                <blockquote className="mt-6 text-lg sm:text-xl leading-relaxed text-foreground">
                  &ldquo;{featured.text}&rdquo;
                </blockquote>
                <div className="mt-8 flex items-center gap-3">
                  <Initials name={featured.name} />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {featured.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {featured.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </SlideIn>
          )}

          {/* Secondary Testimonials - Right Column, Stacked */}
          <SlideIn direction="right" delay={0.2} className="lg:col-span-2">
          <div className="flex flex-col gap-6 lg:gap-8 h-full">
            {secondary.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-md rounded-xl flex-1"
              >
                <CardContent className="p-6 sm:p-8">
                  <StarRating rating={testimonial.rating} />
                  <blockquote className="mt-4 text-sm leading-relaxed text-foreground">
                    &ldquo;{testimonial.text}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3">
                    <Initials name={testimonial.name} />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
