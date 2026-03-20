import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { getSettings } from "@/lib/sanity/queries/settings";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: {
      default: `${settings?.siteName || "FHA Cash Out"} | ${settings?.company || "Mortgage Pipeline"}`,
      template: `%s | ${settings?.siteName || "FHA Cash Out"}`,
    },
    description: settings?.defaultSeo?.metaDescription ||
      "FHA Cash Out loans with rates as low as 3.5%. Down payments starting at 3.5%. Flexible credit guidelines and no income limits. Apply today with Mortgage Pipeline.",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased`}
      >
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
