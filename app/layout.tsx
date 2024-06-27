import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PurchasedEventsProvider } from "@/contexts/PurchasedEventsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luxtix",
  description: "Your luxurious ticket gateway",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PurchasedEventsProvider>
        <body className={inter.className}>{children}</body>
      </PurchasedEventsProvider>
    </html>
  );
}
