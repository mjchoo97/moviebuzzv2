import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/(navigation bar)/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer/Footer";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MovieBuzz",
  description:
    "Join MovieBuzz to discover, vote, and rank your favorite movies. Share your thoughts with a community of film enthusiasts and explore personalized recommendations based on your preferences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark bg-gradient-to-b from-gray-900 to-stone-900 antialiased`}>
        <Navbar />
        <Suspense fallback={"loading"}>
          <div className="w-full px-4 md:px-8 lg:px-16 xl:px-32">
            {children}
            <Toaster />
          </div>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
