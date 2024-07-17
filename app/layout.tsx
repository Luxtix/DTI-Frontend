import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PurchasedEventsProvider } from "@/contexts/PurchasedEventsContext";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luxtix",
  description: "Your luxurious ticket gateway",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <PurchasedEventsProvider>
        <SessionProvider session={session} refetchInterval={120}>
          <body className={inter.className}>
            {children}
            <Toaster />
          </body>
        </SessionProvider>
      </PurchasedEventsProvider>
    </html>
  );
}
