"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "../lib/apollo-client";
import { useEffect } from "react";

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
  useEffect(() => {
    document.title = "Medflow";
  }, []);

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
