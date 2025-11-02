"use client";

export default function PrivacyPage() {
  const handleDownload = () => {
    // Get the content element
    const content = document.querySelector(".privacy-content");
    if (!content) return;

    // Create a new window with the content
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    // Get the content HTML
    const contentHTML = content.innerHTML;

    // Create a complete HTML document with styles
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Privacy Policy - OrbitTwelve</title>
          <style>
            body {
              font-family: 'Roboto', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              max-width: 800px;
              margin: 40px auto;
              padding: 20px;
              line-height: 1.6;
              color: #000;
            }
            h2 {
              font-size: 20px;
              font-weight: bold;
              margin-top: 24px;
              margin-bottom: 12px;
            }
            ul {
              margin-left: 20px;
              margin-bottom: 12px;
            }
            li {
              margin-bottom: 8px;
            }
            strong {
              font-weight: bold;
            }
            a {
              color: #1098D5;
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <h1 style="text-align: center; margin-bottom: 30px;">Privacy Policy</h1>
          ${contentHTML}
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load, then print as PDF
    setTimeout(() => {
      printWindow.print();
      // Clean up after a delay
      setTimeout(() => {
        printWindow.close();
      }, 250);
    }, 250);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1f1f1f] via-[#2a2a2a] to-[#1f1f1f] py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Privacy
              <span className="bg-gradient-to-r from-[#1098D5] to-[#1098D5] bg-clip-text text-transparent">
                {" "}
                Policy
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we protect and handle
              your personal information.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 bg-[#1098D5] rounded-full animate-pulse" />
                <span className="text-sm font-medium">GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy Content Section */}
      <div className="relative py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="max-w-4xl mx-auto privacy-content">
              {/* Introductory Paragraph */}
              <div className="mb-10">
                <p className="text-black leading-relaxed">
                  OrbitTwelve Digital Information Technology ("OrbitTwelve,"
                  "we," "our," or "us") values the privacy of our clients,
                  partners, and users. This Privacy Policy outlines how we
                  collect, use, store, and protect personal data in compliance
                  with applicable data protection regulations, including the
                  General Data Protection Regulation (GDPR) where applicable.
                </p>
              </div>

              {/* Section 1 */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black mb-4">
                  1. INFORMATION WE COLLECT
                </h2>
                <div className="text-black leading-relaxed space-y-3">
                  <p>
                    We may collect the following types of personal information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Client and business contact details:</strong>{" "}
                      Name, email address, phone number, company name, billing
                      address.
                    </li>
                    <li>
                      <strong>Campaign-related data:</strong> Marketing account
                      IDs, advertising performance data, target audience
                      insights.
                    </li>
                    <li>
                      <strong>Website usage data:</strong> When users visit our
                      website, we may collect IP address, browser type, device
                      information, and cookies for analytics purposes.
                    </li>
                    <li>
                      <strong>Financial information:</strong> Limited to payment
                      processing, invoices, and receipts.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 2 */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black mb-4">
                  2. HOW WE USE INFORMATION
                </h2>
                <div className="text-black leading-relaxed space-y-3">
                  <p>
                    Personal data is used strictly for business-related
                    purposes, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Delivering and managing marketing campaigns.</li>
                    <li>
                      Communicating with clients and responding to inquiries.
                    </li>
                    <li>Managing contracts, billing, and payments.</li>
                    <li>Analyzing performance and improving services.</li>
                    <li>
                      Complying with applicable laws and regulatory
                      requirements.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 3 */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black mb-4">
                  3. DATA SHARING & DISCLOSURE
                </h2>
                <div className="text-black leading-relaxed space-y-3">
                  <p>We do not sell or rent personal data.</p>
                  <p>We may share data only in the following cases:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      With trusted third-party service providers (such as
                      advertising platforms, analytics tools, or IT service
                      providers) strictly for operational purposes.
                    </li>
                    <li>When required by law or legal processes.</li>
                    <li>
                      With client consent, when relevant to campaign execution.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black mb-4">
                  4. DATA STORAGE & SECURITY
                </h2>
                <div className="text-black leading-relaxed space-y-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Personal data is stored on secure servers with restricted
                      access.
                    </li>
                    <li>
                      We apply industry-standard security practices, including
                      encryption, firewalls, and regular audits, to protect
                      against unauthorized access, loss, or misuse.
                    </li>
                    <li>
                      Access to client data is limited to authorized personnel
                      only.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 5 */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black mb-4">
                  5. COOKIES & TRACKING TECHNOLOGIES
                </h2>
                <div className="text-black leading-relaxed space-y-3">
                  <p>
                    Our website uses cookies and similar technologies to enhance
                    user experience, analyze site traffic, and measure campaign
                    performance. Users may control cookie preferences through
                    their browser settings.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black mb-4">
                  6. DATA RETENTION
                </h2>
                <div className="text-black leading-relaxed space-y-3">
                  <p>
                    We retain personal information only for as long as necessary
                    to fulfill business purposes or comply with legal
                    obligations. Data that is no longer required will be
                    securely deleted or anonymized.
                  </p>
                </div>
              </div>

              {/* Section 7 */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black mb-4">
                  7. USER RIGHTS
                </h2>
                <div className="text-black leading-relaxed space-y-3">
                  <p>Depending on applicable laws, users may have rights to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Access, update, or correct their personal information.
                    </li>
                    <li>Request deletion of personal data.</li>
                    <li>
                      Restrict or object to certain processing activities.
                    </li>
                    <li>Request a copy of their personal data.</li>
                  </ul>
                  <p>
                    Requests can be submitted by contacting us at:{" "}
                    <a
                      href="mailto:team@orbitwelve.com"
                      className="text-[#1098D5] underline"
                    >
                      team@orbitwelve.com
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Section 8 */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black mb-4">
                  8. INTERNATIONAL DATA TRANSFERS
                </h2>
                <div className="text-black leading-relaxed space-y-3">
                  <p>
                    As a digital marketing agency working across multiple
                    countries, personal data may be transferred internationally.
                    We ensure appropriate safeguards are in place to protect
                    personal information during such transfers.
                  </p>
                </div>
              </div>

              {/* Section 9 */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black mb-4">
                  9. CHILDREN&apos;S PRIVACY
                </h2>
                <div className="text-black leading-relaxed space-y-3">
                  <p>
                    Our services are directed to businesses and not to
                    individuals under the age of 18. We do not knowingly collect
                    personal data from children.
                  </p>
                </div>
              </div>

              {/* Section 10 */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black mb-4">
                  10. CHANGES TO THIS PRIVACY POLICY
                </h2>
                <div className="text-black leading-relaxed space-y-3">
                  <p>
                    We may update this Privacy Policy from time to time to
                    reflect operational, legal, or regulatory changes.
                  </p>
                </div>
              </div>

              {/* Section 11 */}
              <div className="mb-12">
                <h2 className="text-xl font-bold text-black mb-4">
                  11. CONTACT US
                </h2>
                <div className="text-black leading-relaxed space-y-3">
                  <p>
                    For any questions or concerns regarding this Privacy Policy
                    or how your data is handled, please contact us.
                  </p>
                </div>
              </div>

              {/* Download Button */}
              <div className="flex justify-start mt-12">
                <button
                  onClick={handleDownload}
                  className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  DOWNLOAD
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
