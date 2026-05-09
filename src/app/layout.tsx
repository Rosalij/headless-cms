// This is the root layout component for the Next.js application.
//  It defines the overall structure of the HTML document, including the header and footer that will be present on all pages.
//  The metadata object provides information about the page, such as the title and description, which can be used for SEO purposes.

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";  
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Skintrack Åre",
  description: "Guided ski touring adventures in Åre, Sweden",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="pt-16 flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}