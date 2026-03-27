import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRM Map Maker — Turn CRM Exports into Google Maps",
  description:
    "Upload a CSV, map your columns, and download a Google My Maps-ready file. No login, no setup.",
  openGraph: {
    title: "CRM Map Maker",
    description:
      "Turn CRM exports into Google Maps pins in 30 seconds. Free, no login required.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
        <footer className="py-6 text-center text-xs text-gray-400">
          <a
            href="https://www.perplexity.ai/computer"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors"
          >
            Created with Perplexity Computer
          </a>
        </footer>
      </body>
    </html>
  );
}
