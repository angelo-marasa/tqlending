import { Shield, Users, HeadphonesIcon } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

interface TrustBadgesProps {
  variant?: "light" | "dark";
}

export function TrustBadges({ variant = "light" }: TrustBadgesProps) {
  const items = [
    {
      icon: Users,
      title: "Experienced Team",
      description: "Our loan officers bring decades of combined expertise to guide you through every step of the mortgage process.",
    },
    {
      icon: Shield,
      title: "Trusted & Secure",
      description: "As a licensed lender, your personal and financial information is protected with bank-level security.",
    },
    {
      icon: HeadphonesIcon,
      title: "Continued Support",
      description: "We are here for you long after closing. Our team provides ongoing support for the life of your loan.",
    },
  ];

  const isDark = variant === "dark";

  return (
    <section className={isDark ? "bg-primary py-16 sm:py-20" : "py-16 sm:py-20 bg-background"}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className={`font-heading text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? "text-primary-foreground" : "text-foreground"}`}>
            Why Choose Mortgage Pipeline?
          </h2>
        </div>
        </FadeIn>

        <StaggerContainer className="mt-12 grid gap-8 sm:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
              <div className="text-center group">
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl transition-colors ${
                  isDark
                    ? "bg-primary-foreground/10 group-hover:bg-secondary/20"
                    : "bg-primary/5 group-hover:bg-primary/10"
                }`}>
                  <Icon
                    className={`h-8 w-8 ${isDark ? "text-secondary" : "text-primary"}`}
                    aria-hidden="true"
                  />
                </div>
                <h3 className={`mt-4 font-heading text-lg font-semibold ${isDark ? "text-primary-foreground" : "text-foreground"}`}>
                  {item.title}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed max-w-xs mx-auto ${isDark ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {item.description}
                </p>
              </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
