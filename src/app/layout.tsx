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
      "Align intent and method without surveillance. Workers find rhythm; managers hear the whole chord.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Tablature" }],
    siteName: "Tablature",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tablature — Coordinate the work. Stay aligned.",
    description:
      "A human alignment dashboard that turns coordination into harmony.",
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    shortcut: ["/favicon.ico"],
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
