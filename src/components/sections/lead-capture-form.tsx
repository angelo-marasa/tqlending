"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Shield, Clock } from "lucide-react";
import { ScaleIn } from "@/components/ui/motion";

interface LeadCaptureFormProps {
  variant?: "inline" | "full";
  title?: string;
  description?: string;
}

export function LeadCaptureForm({
  variant = "inline",
  title = "See What You Qualify For",
  description = "Enter your ZIP code to get started with personalized rates.",
}: LeadCaptureFormProps) {
  const [zipCode, setZipCode] = useState("");

  if (variant === "inline") {
    return (
      <ScaleIn>
        <div className="rounded-xl bg-card p-6 shadow-lg border border-border">
          <h3 className="font-heading text-lg font-semibold text-foreground">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (zipCode) window.location.href = `/apply?zip=${zipCode}`;
            }}
          >
            <div className="flex-1">
              <Label htmlFor="inline-zip" className="sr-only">
                ZIP Code
              </Label>
              <Input
                id="inline-zip"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{5}"
                maxLength={5}
                placeholder="ZIP Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
                className="h-11"
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold h-11 px-6"
            >
              Go
              <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
            </Button>
          </form>
        </div>
      </ScaleIn>
    );
  }

  return (
    <ScaleIn>
      <div className="rounded-2xl bg-card p-8 shadow-xl border border-border">
        <h3 className="font-heading text-2xl font-bold text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-muted-foreground">{description}</p>
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (zipCode) window.location.href = `/apply?zip=${zipCode}`;
          }}
        >
          <div>
            <Label htmlFor="full-zip">ZIP Code</Label>
            <Input
              id="full-zip"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{5}"
              maxLength={5}
              placeholder="Enter your ZIP code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
              className="mt-1.5 h-12 text-base"
              required
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold h-12 text-base"
          >
            See My Rates
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </form>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            No credit check required
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            Takes just 2 minutes
          </div>
        </div>
      </div>
    </ScaleIn>
  );
}
