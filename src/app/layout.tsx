import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PinWhip — Drop CRM Contacts on a Map in Seconds",
  description:
    "Upload a CSV from any CRM, map your columns, and download a Google My Maps-ready file. No login, no setup.",
  openGraph: {
    title: "PinWhip",
    description:
      "Drop CRM contacts on a Google Map in seconds. Free, no login required.",
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
