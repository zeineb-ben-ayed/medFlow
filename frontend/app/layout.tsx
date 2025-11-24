"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { client } from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "MedFlow UI",
//   description: "Healthcare system interface with custom palette",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground `}
      >
        <ApolloProvider client={client}>
          {children}
          <Toaster richColors />
        </ApolloProvider>
      </body>
    </html>
  );
}
