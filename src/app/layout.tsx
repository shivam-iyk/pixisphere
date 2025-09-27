import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PixiSphere - Find Your Perfect Photographer",
  description:
    "Discover talented photographers for your special moments across India. Browse portfolios, read reviews, and book professional photography services.",
  keywords:
    "photography, photographer, wedding, maternity, portrait, India, booking",
  authors: [{ name: "PixiSphere" }],
  openGraph: {
    title: "PixiSphere - Find Your Perfect Photographer",
    description:
      "Discover talented photographers for your special moments across India.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <Navbar />
        <div className="max-w-6xl mx-auto relative">
          {children}
        </div>
        <Toaster richColors />
      </body>
    </html>
  );
}
