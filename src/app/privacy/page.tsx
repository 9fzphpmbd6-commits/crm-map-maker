export default function Privacy() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      <a
        href="/"
        className="text-sm text-blue-600 hover:text-blue-800 font-medium mb-6 inline-block"
      >
        ← Back to PinWhip
      </a>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <div className="prose prose-sm prose-gray max-w-none space-y-4 text-gray-600 text-[14px] leading-relaxed">
        <p>
          <strong>Last updated:</strong> March 2026
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-6">
          What We Collect
        </h2>
        <p>
          When you upload a CSV file to PinWhip, the contents of that file
          (including any data in the rows and columns) may be stored on our
          servers to improve our service, analyze usage patterns, and enhance
          the product experience.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-6">
          How We Use Your Data
        </h2>
        <p>We may use uploaded data to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Improve column auto-detection accuracy</li>
          <li>Understand common CRM export formats</li>
          <li>Analyze aggregate usage trends</li>
          <li>Improve the overall product experience</li>
        </ul>

        <h2 className="text-lg font-semibold text-gray-900 mt-6">
          No Account Required
        </h2>
        <p>
          PinWhip does not require you to create an account, log in, or
          provide any personal information such as your name or email address.
          All CSV processing happens in your browser, and the formatted output
          file is generated locally on your device.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-6">
          Analytics
        </h2>
        <p>
          We use Google Analytics to collect anonymous usage data such as page
          views, device type, and general geographic region. This data does
          not personally identify you.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-6">
          Third-Party Services
        </h2>
        <p>
          PinWhip links to Google My Maps for map creation. Your interaction
          with Google My Maps is governed by Google&apos;s own privacy policy.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-6">
          Contact
        </h2>
        <p>
          If you have questions about this privacy policy, contact us at
          pinwhip at gmail dot com.
        </p>
      </div>
    </main>
  );
}
