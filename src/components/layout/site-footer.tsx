import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { navLinks } from "@/lib/navigation";
import { type SiteSettings } from "@/lib/sanity/queries/settings";
import { NewsletterForm } from "@/components/layout/newsletter-form";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground font-heading font-bold text-lg">
                {settings.logoInitials || "MP"}
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg font-bold leading-tight">
                  {settings.siteName || "FHA Cash Out"}
                </span>
                <span className="text-xs text-primary-foreground/60 leading-tight">
                  by {settings.company || "Mortgage Pipeline"}
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed max-w-xs">
              {settings.footerText || "Putting affordable homeownership within reach with competitive FHA rates, flexible credit guidelines, and down payments as low as 3.5%."}
            </p>
            <div className="mt-6 space-y-2.5">
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                {settings.phoneFormatted}
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {settings.email}
              </a>
              <p className="flex items-start gap-2 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
                {settings.address}
              </p>
            </div>
          </div>

          {/* Purchase links */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-secondary">
              Purchase
            </h3>
            <ul className="mt-4 space-y-2.5" role="list">
              {navLinks.purchase.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 font-heading font-semibold text-sm uppercase tracking-wider text-secondary">
              Refinance
            </h3>
            <ul className="mt-4 space-y-2.5" role="list">
              {navLinks.refinance.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-secondary">
              Resources
            </h3>
            <ul className="mt-4 space-y-2.5" role="list">
              <li>
                <Link
                  href="/heloc"
                  className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  HELOC
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>

            <h3 className="mt-8 font-heading font-semibold text-sm uppercase tracking-wider text-secondary">
              Connect
            </h3>
            <div className="mt-4 flex gap-3">
              {Object.entries(settings.socialLinks).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/70 hover:bg-secondary hover:text-secondary-foreground transition-colors"
                  aria-label={`Follow us on ${name}`}
                >
                  <span className="text-xs font-bold uppercase">
                    {name[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-secondary">
              {settings.newsletterTitle || "Stay Informed"}
            </h3>
            <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed">
              {settings.newsletterDescription || "Get mortgage tips, rate updates, and homeownership guides delivered to your inbox."}
            </p>
            <NewsletterForm />
            <Link
              href="/apply"
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors"
            >
              Check Your Rates
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="text-xs text-primary-foreground/50">
                NMLS #{settings.nmls} |{" "}
                {settings.company} | {settings.address}
              </p>
              <p className="mt-1 text-xs text-primary-foreground/40 max-w-2xl">
                {settings.footerDisclaimer || "This is not a commitment to lend. Programs, rates, terms, and conditions are subject to change without notice. All loans subject to credit approval. Equal Housing Lender."}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-primary-foreground/50">
              <Link href="/disclosures" className="hover:text-secondary transition-colors">
                Disclosures
              </Link>
              <Link href="/privacy-policy" className="hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-secondary transition-colors">
                Terms
              </Link>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-primary-foreground/30">
            &copy; {new Date().getFullYear()} {settings.company}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
