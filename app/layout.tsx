import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "StreamHub - Your Movie Dashboard",
  description: "Discover and explore thousands of movies with StreamHub. Your ultimate streaming dashboard for finding the perfect movie to watch.",
  keywords: ["movies", "streaming", "dashboard", "films", "entertainment"],
  authors: [{ name: "StreamHub" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-black text-white`}
      >
        <Header />
        {/* Add top padding to main so content isn't hidden behind the fixed header */}
        <main className="pt-16 md:pt-[68px]">{children}</main>
      </body>
    </html>
  );
}
