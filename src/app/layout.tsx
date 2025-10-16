import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/site/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tablature.io"),
  title: {
    default: "Tablature — Coordinate the work. Stay aligned.",
    template: "%s — Tablature",
  },
  description:
    "Tablature is a human alignment dashboard for teams — align intent and method without surveillance.",
  openGraph: {
    type: "website",
    url: "https://www.tablature.io/",
    title: "Tablature — Coordinate the work. Stay aligned.",
    description:
      "Tablature helps teams align intent and execution without surveillance. Workers express needs clearly. Managers understand patterns safely.",
    images: [{ url: "/tablature-brand-assets/og.png", width: 1200, height: 630, alt: "Tablature" }],
    siteName: "Tablature",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tablature — Coordinate the work. Stay aligned.",
    description:
      "A human alignment dashboard for teams — clarity at work, made simple, safe, and shared.",
    images: ["/tablature-brand-assets/og.png"],
  },
  icons: {
    icon: [
      { url: "/tablature-brand-assets/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/tablature-brand-assets/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/tablature-brand-assets/favicon.ico", sizes: "any" }
    ],
    shortcut: ["/tablature-brand-assets/favicon.ico"],
    apple: [
      { url: "/tablature-brand-assets/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-soft min-h-screen text-slate-900">
        <Header />
        {children}
      </body>
    </html>
  );
}
