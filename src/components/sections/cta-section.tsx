import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { FadeIn, SlideIn } from "@/components/ui/motion";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryText?: string;
  primaryHref?: string;
  showPhone?: boolean;
  variant?: "default" | "centered";
}

export function CTASection({
  title = "Ready to Get Started?",
  description = "Take the first step toward your financial goals. Check your personalized rates in minutes with no obligation.",
  primaryText = "Check Your Rates",
  primaryHref = "/apply",
  showPhone = true,
  variant = "default",
}: CTASectionProps) {
  if (variant === "centered") {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-muted/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 text-lg text-muted-foreground">
              {description}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold"
              >
                <Link href={primaryHref}>
                  {primaryText}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              {showPhone && (
                <Button asChild variant="outline" size="lg">
                  <a href="tel:866-866-0653">
                    <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                    (866) 866-0653
                  </a>
                </Button>
              )}
            </div>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-primary py-16 sm:py-20">
      <div className="absolute inset-0 gradient-hero opacity-100" />
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <SlideIn direction="left">
            <div className="text-center lg:text-left">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/70 max-w-xl">
                {description}
              </p>
            </div>
          </SlideIn>
          <SlideIn direction="right" delay={0.2}>
            <div className="flex flex-col gap-3 sm:flex-row shrink-0">
            <Button
              asChild
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold"
            >
              <Link href={primaryHref}>
                {primaryText}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            {showPhone && (
              <Button
                asChild
                size="lg"
                className="border border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 shadow-xs font-semibold"
              >
                <a href="tel:866-866-0653">
                  <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                  (866) 866-0653
                </a>
              </Button>
            )}
          </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
