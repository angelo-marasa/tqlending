/**
 * Cookie consent management utility.
 *
 * Categories:
 *   - essential: Always on. Session cookies, security, basic functionality.
 *   - analytics: GA4, Hotjar, etc.
 *   - marketing: Facebook pixel, Google Ads remarketing, PPC tracking.
 *
 * Usage in tracking scripts:
 *   import { hasConsent, onConsentChange } from "@/lib/consent";
 *
 *   if (hasConsent("analytics")) {
 *     // Fire GA4
 *   }
 *
 *   onConsentChange((preferences) => {
 *     if (preferences.analytics) { ... }
 *   });
 */

export type ConsentCategory = "essential" | "analytics" | "marketing";

export interface ConsentPreferences {
  essential: boolean; // always true
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = "cookie-consent";
const CONSENT_EVENT = "consent-update";

export function getConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as ConsentPreferences;
  } catch {
    return null;
  }
}

export function setConsent(preferences: Omit<ConsentPreferences, "essential" | "timestamp">): void {
  if (typeof window === "undefined") return;
  const full: ConsentPreferences = {
    essential: true,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: full }));
}

export function hasConsent(category: ConsentCategory): boolean {
  if (category === "essential") return true;
  const prefs = getConsent();
  if (!prefs) return false;
  return prefs[category] ?? false;
}

export function clearConsent(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function onConsentChange(callback: (prefs: ConsentPreferences) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (e: Event) => {
    const detail = (e as CustomEvent<ConsentPreferences>).detail;
    callback(detail);
  };
  window.addEventListener(CONSENT_EVENT, handler);
  return () => window.removeEventListener(CONSENT_EVENT, handler);
}

export function acceptAll(): void {
  setConsent({ analytics: true, marketing: true });
}

export function rejectNonEssential(): void {
  setConsent({ analytics: false, marketing: false });
}
