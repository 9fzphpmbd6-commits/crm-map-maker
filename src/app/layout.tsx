import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PinWhip — Drop CRM Contacts on a Map in Seconds | 100% Free",
  description:
    "Upload a CSV from any CRM, map your columns, and download a Google My Maps-ready file. 100% free, no login, no setup.",
  openGraph: {
    title: "PinWhip — Free CRM to Google Maps Converter",
    description:
      "Drop CRM contacts on a Google Map in seconds. 100% free, no login required.",
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
      <head>
        {/* Google Analytics — replace G-XXXXXXXXXX with your Measurement ID */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-G7H49NTRL0"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-G7H49NTRL0');
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
        <footer className="border-t border-gray-100 py-8 text-center text-xs text-gray-400 space-y-2">
          <p>
            Uploaded data may be stored to improve our service.{" "}
            <a href="/privacy" className="underline hover:text-gray-600">
              Privacy Policy
            </a>
          </p>
          <p>
            <a
              href="https://www.perplexity.ai/computer"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              Created with Perplexity Computer
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
