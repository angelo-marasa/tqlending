import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

interface Product {
  title: string;
  slug: string;
  category: string;
  description: string;
  highlights: string[];
  featured: boolean;
}

interface ProductCardsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  showAll?: boolean;
}

export function ProductCards({
  products,
  title = "Loan Products",
  subtitle = "Find the Right Loan for You",
  showAll = false,
}: ProductCardsProps) {
  const displayProducts = showAll
    ? products
    : products.filter((p) => p.featured);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
              {subtitle}
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
          </div>
        </FadeIn>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayProducts.map((product) => {
            const href =
              product.category === "other"
                ? `/${product.slug}`
                : `/${product.category}/${product.slug}`;
            return (
              <StaggerItem key={`${product.category}-${product.slug}`}>
                <Card
                  className={`group relative overflow-hidden transition-all hover:shadow-lg ${
                    product.featured ? "border-secondary/30" : ""
                  }`}
                >
                  {product.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-secondary text-secondary-foreground">
                        Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {product.category === "purchase"
                        ? "Purchase"
                        : product.category === "refinance"
                          ? "Refinance"
                          : "Equity"}
                    </div>
                    <CardTitle className="font-heading text-xl">
                      {product.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                    <ul className="mt-4 space-y-2" role="list">
                      {product.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Check
                            className="h-4 w-4 text-accent shrink-0"
                            aria-hidden="true"
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      variant="outline"
                      className="mt-6 w-full transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <Link href={href}>
                        Learn More
                        <ArrowRight
                          className="ml-2 h-4 w-4"
                          aria-hidden="true"
                        />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {!showAll && (
          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/refinance/cash-out">
                View All Loan Products
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
