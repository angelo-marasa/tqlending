"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Shield, Clock, Lock } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const loanPurposes = [
  { value: "purchase", label: "Purchase" },
  { value: "refinance", label: "Refinance" },
  { value: "cashout", label: "Cash-Out" },
];

const creditScoreRanges = [
  { value: "excellent", label: "Excellent", range: "740+" },
  { value: "good", label: "Good", range: "700-739" },
  { value: "fair", label: "Fair", range: "660-699" },
  { value: "below", label: "Below 660", range: "<660" },
];

function ApplyForm() {
  const searchParams = useSearchParams();
  const initialZip = searchParams.get("zip") || "";

  const [formData, setFormData] = useState({
    loanPurpose: "",
    zipCode: initialZip,
    propertyValue: "",
    downPayment: "",
    creditScore: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
  };

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <Card className="overflow-hidden">
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Loan Purpose */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Loan Purpose</Label>
              <div className="grid grid-cols-3 gap-3">
                {loanPurposes.map((purpose) => (
                  <button
                    key={purpose.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        loanPurpose: purpose.value,
                      }))
                    }
                    className={`flex items-center justify-center rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors ${
                      formData.loanPurpose === purpose.value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-input bg-background text-foreground hover:border-primary/50"
                    }`}
                  >
                    {purpose.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode">Property ZIP Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{5}"
                  maxLength={5}
                  placeholder="Enter ZIP code"
                  value={formData.zipCode}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      zipCode: e.target.value.replace(/\D/g, ""),
                    }))
                  }
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyValue">Estimated Property Value</Label>
                <Input
                  id="propertyValue"
                  name="propertyValue"
                  type="text"
                  inputMode="numeric"
                  placeholder="$300,000"
                  value={formData.propertyValue}
                  onChange={handleChange}
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="downPayment">
                  {formData.loanPurpose === "refinance" ||
                  formData.loanPurpose === "cashout"
                    ? "Current Loan Balance"
                    : "Down Payment"}
                </Label>
                <Input
                  id="downPayment"
                  name="downPayment"
                  type="text"
                  inputMode="numeric"
                  placeholder={
                    formData.loanPurpose === "refinance" ||
                    formData.loanPurpose === "cashout"
                      ? "$200,000"
                      : "$10,500"
                  }
                  value={formData.downPayment}
                  onChange={handleChange}
                  className="h-11"
                  required
                />
              </div>
            </div>

            {/* Credit Score */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Estimated Credit Score
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {creditScoreRanges.map((score) => (
                  <button
                    key={score.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        creditScore: score.value,
                      }))
                    }
                    className={`flex flex-col items-center rounded-lg border-2 px-4 py-3 transition-colors ${
                      formData.creditScore === score.value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-input bg-background text-foreground hover:border-primary/50"
                    }`}
                  >
                    <span className="text-sm font-medium">{score.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {score.range}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Info */}
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="h-11"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-11"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold h-12 text-base"
            >
              Get My Rates
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Trust Signals */}
      <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-5 w-5 text-accent" aria-hidden="true" />
          No credit check required
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="h-5 w-5 text-accent" aria-hidden="true" />
          256-bit encrypted
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-5 w-5 text-accent" aria-hidden="true" />
          Takes 2 minutes
        </div>
      </div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <>
      <HeroSection
        variant="page"
        headline="Check Your Rates"
        subheadline="Get personalized rates in minutes"
        showForm={false}
      />
      <Suspense fallback={null}>
        <ApplyForm />
      </Suspense>
    </>
  );
}
