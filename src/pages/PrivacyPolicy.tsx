import { Link } from "react-router-dom";
import DocumentationLayout from "@/components/DocumentationLayout";

const PrivacyPolicy = () => {
  const sections = [
    { id: 'introduction', title: 'Introduction' },
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      items: [
        { id: 'information-you-provide', title: 'Information You Provide' },
        { id: 'automatically-collected', title: 'Automatically Collected' }
      ]
    },
    { id: 'how-we-use', title: 'How We Use Your Information' },
    { id: 'cookies', title: 'Cookies and Tracking' },
    { id: 'sharing', title: 'Information Sharing' },
    { id: 'payments', title: 'Payments' },
    { id: 'data-retention', title: 'Data Retention' },
    { id: 'security', title: 'Data Security' },
    { id: 'your-rights', title: 'Your Rights' },
    { id: 'children', title: "Children's Privacy" },
    { id: 'international', title: 'International Transfers' },
    { id: 'changes', title: 'Changes to Policy' },
    { id: 'contact', title: 'Contact Us' }
  ];

  return (
    <DocumentationLayout
      title="Privacy Policy"
      lastUpdated="[Insert Date]"
      sections={sections}
      currentSection="privacy"
    >
      <div className="space-y-8">
        <section id="introduction">
          <p className="text-gray-600">
            <span className="font-math text-xl">𝒯 ⊂ ℒ</span> ("we," "our," or "us") values your privacy. This Privacy Policy explains how we collect, use, 
            disclose, and protect information when you access or use our platform (the "Platform"), which connects 
            AI labs, companies, and research teams with independent experts.
          </p>
          <p className="mt-4 text-gray-600">
            By using our platform, you agree to the practices described in this Privacy Policy.
          </p>
        </section>

        <section id="information-we-collect" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">1. Information We Collect</h2>
          
          <div id="information-you-provide" className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">1.1 Information You Provide</h3>
            <p className="mt-2 text-gray-600">
              We may collect information you voluntarily provide, including:
            </p>
            <ul className="mt-2 ml-6 list-disc text-gray-600 space-y-1">
              <li>Name, username, and contact details (email address)</li>
              <li>Account registration details</li>
              <li>Profile information (skills, experience, company details)</li>
              <li>Communications between AI Labs and Experts on the Platform</li>
              <li>Payment-related information (processed via third-party providers)</li>
            </ul>
            <p className="mt-4 text-gray-600">
              <strong>We do not store full credit/debit card details.</strong>
            </p>
          </div>

          <div id="automatically-collected" className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">1.2 Information Collected Automatically</h3>
            <p className="mt-2 text-gray-600">
              When you use the Platform, we may automatically collect:
            </p>
            <ul className="mt-2 ml-6 list-disc text-gray-600 space-y-1">
              <li>IP address</li>
              <li>Device type, browser type, and operating system</li>
              <li>Usage data (pages viewed, actions taken, timestamps)</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </div>
        </section>

        <section id="how-we-use" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">2. How We Use Your Information</h2>
          <p className="mt-4 text-gray-600">We use collected information to:</p>
          <ul className="mt-2 ml-6 list-disc text-gray-600 space-y-1">
            <li>Operate, maintain, and improve the Platform</li>
            <li>Connect AI Labs with relevant Experts</li>
            <li>Facilitate communication between users</li>
            <li>Process transactions and platform fees</li>
            <li>Ensure security, prevent fraud, and enforce our Terms</li>
            <li>Comply with legal and regulatory obligations</li>
          </ul>
        </section>

        <section id="cookies" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">3. Cookies and Tracking Technologies</h2>
          <p className="mt-4 text-gray-600">We use cookies and similar technologies to:</p>
          <ul className="mt-2 ml-6 list-disc text-gray-600 space-y-1">
            <li>Maintain user sessions</li>
            <li>Analyze Platform performance</li>
            <li>Improve user experience</li>
          </ul>
          <p className="mt-4 text-gray-600">
            You can manage or disable cookies through your browser settings. Some features may not function properly without cookies.
          </p>
        </section>

        <section id="sharing" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">4. Information Sharing and Disclosure</h2>
          <p className="mt-4 text-gray-600">We may share information:</p>
          <ul className="mt-2 ml-6 list-disc text-gray-600 space-y-1">
            <li><strong>Between Users:</strong> Profile and engagement-related information may be visible to AI Labs and Experts for collaboration.</li>
            <li><strong>Service Providers:</strong> With trusted third-party vendors (hosting, analytics, payments) solely to operate the Platform.</li>
            <li><strong>Legal Requirements:</strong> When required by law, regulation, or valid legal process.</li>
          </ul>
          <p className="mt-4 text-gray-600">
            <strong>We do not sell or rent personal data to third parties.</strong>
          </p>
        </section>

        <section id="payments" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">5. Payments and Third-Party Services</h2>
          <p className="mt-4 text-gray-600">
            Payments are processed by third-party payment providers. Their use of your information is governed by their own privacy policies.
          </p>
          <p className="mt-2 text-gray-600">
            We are not responsible for the privacy practices of third-party services linked through the Platform.
          </p>
        </section>

        <section id="data-retention" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">6. Data Retention</h2>
          <p className="mt-4 text-gray-600">We retain personal information only for as long as:</p>
          <ul className="mt-2 ml-6 list-disc text-gray-600 space-y-1">
            <li>Necessary to provide services</li>
            <li>Required to comply with legal obligations</li>
            <li>Needed to resolve disputes or enforce agreements</li>
          </ul>
          <p className="mt-4 text-gray-600">When no longer required, data is securely deleted or anonymized.</p>
        </section>

        <section id="security" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">7. Data Security</h2>
          <p className="mt-4 text-gray-600">
            We implement reasonable technical and organizational measures to protect personal information. 
            However, no system is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section id="your-rights" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">8. Your Rights</h2>
          <p className="mt-4 text-gray-600">Depending on applicable law, you may have the right to:</p>
          <ul className="mt-2 ml-6 list-disc text-gray-600 space-y-1">
            <li>Access your personal data</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent where applicable</li>
          </ul>
          <p className="mt-4 text-gray-600">
            Requests can be made by contacting us using the details below.
          </p>
        </section>

        <section id="children" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">9. Children's Privacy</h2>
          <p className="mt-4 text-gray-600">
            The Platform is not directed toward children under the age required by applicable law to consent to data processing. 
            We do not knowingly collect personal data from children without appropriate consent.
          </p>
        </section>

        <section id="international" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">10. International Data Transfers</h2>
          <p className="mt-4 text-gray-600">
            Your information may be processed or stored in countries other than your own. By using our platform, 
            you consent to such transfers in accordance with this Privacy Policy.
          </p>
        </section>

        <section id="changes" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">11. Changes to This Privacy Policy</h2>
          <p className="mt-4 text-gray-600">
            We may update this Privacy Policy from time to time. Continued use of the Platform after 
            changes indicates acceptance of the updated policy.
          </p>
        </section>

        <section id="contact" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">12. Contact Us</h2>
          <p className="mt-4 text-gray-600">
            For privacy-related questions or requests, contact:
          </p>
          <div className="mt-2 p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900"><span className="font-math">𝒯 ⊂ ℒ</span></p>
            <p className="text-gray-600">Email: [Insert Official Email]</p>
          </div>
        </section>

        <div className="pt-12 mt-12 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            <strong>By using our platform, you acknowledge that you have read and understood this Privacy Policy.</strong>
          </p>
          <div className="mt-6 flex justify-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default PrivacyPolicy;
