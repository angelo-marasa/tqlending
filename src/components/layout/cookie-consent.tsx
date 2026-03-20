"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Shield, Settings2, X } from "lucide-react";
import {
  getConsent,
  acceptAll,
  rejectNonEssential,
  setConsent,
} from "@/lib/consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    // Only show if no consent recorded yet
    const existing = getConsent();
    if (!existing) {
      // Small delay so the page loads first
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleAcceptAll() {
    acceptAll();
    setVisible(false);
  }

  function handleRejectAll() {
    rejectNonEssential();
    setVisible(false);
  }

  function handleSavePreferences() {
    setConsent({ analytics, marketing });
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6">
      <div className="mx-auto max-w-2xl rounded-xl border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-start gap-3 p-5 pb-0">
          <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
          <div className="flex-1">
            <p className="font-heading font-semibold text-foreground">
              We value your privacy
            </p>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              We use cookies to enhance your browsing experience, serve
              personalized content, and analyze our traffic. You can choose which
              cookies to allow.{" "}
              <Link
                href="/privacy-policy"
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
          <button
            onClick={handleRejectAll}
            className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Dismiss cookie banner"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Expandable Details */}
        {showDetails && (
          <div className="mx-5 mt-4 space-y-3 rounded-lg border bg-muted/30 p-4">
            {/* Essential */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Essential
                </p>
                <p className="text-xs text-muted-foreground">
                  Required for the site to function. Always active.
                </p>
              </div>
              <Switch checked disabled aria-label="Essential cookies (always on)" />
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Analytics
                </p>
                <p className="text-xs text-muted-foreground">
                  Help us understand how visitors interact with our site (GA4).
                </p>
              </div>
              <Switch
                checked={analytics}
                onCheckedChange={setAnalytics}
                aria-label="Analytics cookies"
              />
            </div>

            {/* Marketing */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Marketing
                </p>
                <p className="text-xs text-muted-foreground">
                  Used for ad targeting and measuring campaign performance.
                </p>
              </div>
              <Switch
                checked={marketing}
                onCheckedChange={setMarketing}
                aria-label="Marketing cookies"
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col-reverse gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <Settings2 className="h-3.5 w-3.5" aria-hidden="true" />
            {showDetails ? "Hide preferences" : "Customize preferences"}
          </button>
          <div className="flex gap-2">
            {showDetails ? (
              <Button
                onClick={handleSavePreferences}
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
              >
                Save Preferences
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleRejectAll}
                  className="text-sm"
                >
                  Reject All
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
                >
                  Accept All
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
