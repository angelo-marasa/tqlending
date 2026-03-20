"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, FileText, Shield } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

interface GuideDownloadProps {
  title: string;
  description: string;
  pages: string;
  slug: string;
  variant?: "card" | "sidebar";
}

export function GuideDownload({
  title,
  description,
  pages,
  slug,
  variant = "sidebar",
}: GuideDownloadProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div
        className={`rounded-xl border border-border bg-card p-6 text-center ${
          variant === "card" ? "shadow-sm" : "shadow-lg"
        }`}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
          <Download className="h-6 w-6 text-secondary" aria-hidden="true" />
        </div>
        <p className="mt-4 font-heading text-lg font-semibold text-foreground">
          Check Your Inbox
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Your guide is on its way to {email}. Check your inbox (and spam
          folder) shortly.
        </p>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <FadeIn>
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        {/* Cover mockup */}
        <div className="relative h-48 bg-gradient-to-br from-primary via-primary/80 to-secondary/60 p-6 flex flex-col justify-end">
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
              <FileText className="h-3 w-3" aria-hidden="true" />
              {pages} pages
            </span>
          </div>
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              Free Guide
            </span>
          </div>
          <h3 className="font-heading text-lg font-bold text-white leading-snug">
            {title}
          </h3>
        </div>

        <div className="p-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <Label htmlFor={`guide-email-${slug}`} className="sr-only">
                Email
              </Label>
              <Input
                id={`guide-email-${slug}`}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold h-11"
            >
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              Download Free Guide
            </Button>
          </form>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="h-3 w-3" aria-hidden="true" />
            Instant download. No spam.
          </p>
        </div>
      </div>
      </FadeIn>
    );
  }

  // Sidebar variant
  return (
    <FadeIn>
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-lg">
      {/* Compact cover */}
      <div className="relative h-32 bg-gradient-to-br from-primary via-primary/80 to-secondary/60 p-4 flex flex-col justify-end">
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-2 py-0.5 text-xs font-medium text-white">
            <FileText className="h-3 w-3" aria-hidden="true" />
            {pages} pages
          </span>
        </div>
        <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground w-fit mb-1">
          Free Guide
        </span>
        <h3 className="font-heading text-sm font-bold text-white leading-snug line-clamp-2">
          {title}
        </h3>
      </div>

      <div className="p-4">
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {description}
        </p>
        <form onSubmit={handleSubmit} className="mt-3 space-y-2">
          <div>
            <Label htmlFor={`guide-sidebar-${slug}`} className="sr-only">
              Email
            </Label>
            <Input
              id={`guide-sidebar-${slug}`}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 text-sm"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold h-10 text-sm"
          >
            <Download className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
            Download Free Guide
          </Button>
        </form>
        <p className="mt-2 flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
          <Shield className="h-2.5 w-2.5" aria-hidden="true" />
          Instant download. No spam.
        </p>
      </div>
    </div>
    </FadeIn>
  );
}
