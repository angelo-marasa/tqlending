"use client";

import { useState } from "react";

export function NewsletterForm() {
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
      <div className="mt-4">
        <p className="text-sm font-medium text-secondary">
          You are subscribed!
        </p>
        <p className="mt-1 text-xs text-primary-foreground/50">
          We will be in touch. No spam, ever.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <label htmlFor="footer-newsletter" className="sr-only">
          Email address
        </label>
        <input
          id="footer-newsletter"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-10 flex-1 min-w-0 rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
          required
        />
        <button
          type="submit"
          className="h-10 shrink-0 rounded-md bg-secondary px-4 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors"
        >
          Subscribe
        </button>
      </div>
      <p className="mt-2 text-xs text-primary-foreground/40">
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
