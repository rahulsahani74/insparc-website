import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access Your Purchases",
  description: "Find your Insparc workflow purchases and download information.",
  robots: { index: false, follow: false },
};

export default function OrderLookupLayout({ children }: { children: React.ReactNode }) { return children; }
