import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SimpleCookieBanner from "@/components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kapsalon-vilani.be"),
  title: "Kapsalon Vilani - Professionele Haarverzorging",
  description:
    "Kapsalon Vilani biedt professionele haarverzorging en styling in Stabroek. Maak online een afspraak voor knip-, kleur- en stylingdiensten.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SimpleCookieBanner />
      </body>
    </html>
  );
}
