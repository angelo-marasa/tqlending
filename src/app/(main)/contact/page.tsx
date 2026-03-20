import type { Metadata } from "next";
import { getSettings } from "@/lib/sanity/queries/settings";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our mortgage team. We are here to help with your home loan needs.",
};

export default async function ContactPage() {
  const settings = await getSettings();

  return <ContactClient settings={settings} />;
}
