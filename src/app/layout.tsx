import type { Metadata } from "next";
import { Shippori_Mincho, Space_Grotesk } from "next/font/google";
import "@/styles/portfolio.css";
import "./globals.css";
import ThemeProvider from "@/components/theme/ThemeProvider";

const shipporiMincho = Shippori_Mincho({
  variable: "--font-shippori",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Afnaan Ahmed P — Shinobi of Data Intelligence",
  description:
    "Portfolio of Afnaan Ahmed P — M.Tech CSE student at VIT Chennai specializing in AI pipelines, RAG systems, computer vision, and cloud architecture. Pre-final year Data Intelligence engineer.",
  keywords: [
    "Afnaan Ahmed P",
    "AI Engineer",
    "Data Intelligence",
    "RAG Pipeline",
    "Machine Learning",
    "VIT Chennai",
    "Portfolio",
  ],
  authors: [{ name: "Afnaan Ahmed P" }],
  openGraph: {
    title: "Afnaan Ahmed P — Shinobi of Data Intelligence",
    description: "AI Engineer Portfolio — RAG Pipelines, Computer Vision, Cloud Architecture",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${shipporiMincho.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
