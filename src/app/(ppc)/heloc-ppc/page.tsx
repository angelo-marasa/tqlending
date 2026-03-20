import type { Metadata } from "next";
import { getSettings } from "@/lib/sanity/queries/settings";
import HELOCPPCClient from "./heloc-ppc-client";

export const metadata: Metadata = {
  title: "HELOC - Unlock Your Home Equity",
  description: "Access your home equity with a flexible HELOC. Competitive rates, fast approval, and expert guidance. Get your free quote in 2 minutes.",
};

export default async function HELOCPPCPage() {
  const settings = await getSettings();

  return <HELOCPPCClient settings={settings} />;
}
