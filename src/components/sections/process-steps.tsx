import { ClipboardList, FileText, TrendingUp } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
}

const stepIcons = [ClipboardList, FileText, TrendingUp];

export function ProcessSteps({
  steps,
  title = "3-Step Process",
  subtitle = "Get Customized Rates Now",
}: ProcessStepsProps) {
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

        <StaggerContainer className="mt-12 grid gap-8 sm:grid-cols-3 lg:mt-16" staggerDelay={0.15}>
          {steps.map((step, index) => {
            const Icon = stepIcons[index] || ClipboardList;
            return (
              <StaggerItem key={step.step}>
                <div className="relative text-center group">
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-12 left-[calc(50%+2rem)] hidden w-[calc(100%-4rem)] border-t-2 border-dashed border-border sm:block" aria-hidden="true" />
                  )}
                  <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <Icon className="h-10 w-10 text-primary" aria-hidden="true" />
                    <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {step.description}
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
