import { Link } from "react-router-dom";
import DocumentationLayout from "@/components/DocumentationLayout";

const TermsAndConditions = () => {
  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'about-zerox', title: 'About 𝒯 ⊂ ℒ' },
    { id: 'eligibility', title: 'Eligibility' },
    { id: 'account-registration', title: 'Account Registration' },
    { id: 'role-of-zerox', title: 'Role of 𝒯 ⊂ ℒ' },
    { id: 'expert-services', title: 'Expert Services' },
    { id: 'ai-lab-responsibilities', title: 'AI Lab Responsibilities' },
    { id: 'payments-fees', title: 'Payments & Fees' },
    { id: 'intellectual-property', title: 'Intellectual Property' },
    { id: 'confidentiality', title: 'Confidentiality' },
    { id: 'prohibited-conduct', title: 'Prohibited Conduct' },
    { id: 'suspension-termination', title: 'Suspension & Termination' },
    { id: 'disclaimers', title: 'Disclaimers' },
    { id: 'limitation-liability', title: 'Limitation of Liability' },
    { id: 'indemnification', title: 'Indemnification' },
    { id: 'governing-law', title: 'Governing Law' },
    { id: 'changes-to-terms', title: 'Changes to Terms' },
    { id: 'contact', title: 'Contact Us' }
  ];

  return (
    <DocumentationLayout
      title="Terms and Conditions"
      lastUpdated="[Insert Date]"
      sections={sections}
      currentSection="terms"
    >
      <div className="space-y-8">
        <section id="introduction">
          <p className="text-gray-600">
            These Terms and Conditions ("Terms") govern your access to and use of our platform (the "Platform"), 
            operated under the name <strong className="font-math text-xl">𝒯 ⊂ ℒ</strong> ("we," "us," or "our"). By accessing or using the Platform, 
            you agree to be bound by these Terms.
          </p>
          <p className="mt-4 text-gray-600">
            If you do not agree to these Terms, do not use the Platform.
          </p>
        </section>

        <section id="about-zerox" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">1. About <span className="font-math">𝒯 ⊂ ℒ</span></h2>
          <p className="mt-4 text-gray-600">
            <span className="font-math">𝒯 ⊂ ℒ</span> provides a technology platform that <strong>connects AI labs, companies, and research teams ("AI Labs") 
            with independent experts and professionals ("Experts")</strong> for consultation, collaboration, and 
            knowledge-sharing services. We do <strong>not</strong> provide expert advice, employment, 
            or professional services.
          </p>
          <p className="mt-4 text-gray-600">
            <span className="font-math">𝒯 ⊂ ℒ</span> acts solely as a <strong>facilitator and marketplace</strong>.
          </p>
        </section>

        <section id="eligibility" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">2. Eligibility</h2>
          <ul className="mt-4 ml-6 list-disc text-gray-600 space-y-1">
            <li>You must be legally permitted to use the Platform under applicable laws.</li>
            <li>If you are using our platform on behalf of an organization, you confirm that you have authority to bind that organization to these Terms.</li>
            <li>We do not guarantee access to age-restricted features where prohibited by law.</li>
          </ul>
        </section>

        <section id="account-registration" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">3. Account Registration</h2>
          <ul className="mt-4 ml-6 list-disc text-gray-600 space-y-1">
            <li>You must provide accurate, complete, and current information during registration.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You are responsible for all activity occurring under your account.</li>
          </ul>
          <p className="mt-4 text-gray-600">
            We reserve the right to suspend or terminate accounts that provide false information or violate these Terms.
          </p>
        </section>

        <section id="role-of-zerox" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">4. Role of <span className="font-math">𝒯 ⊂ ℒ</span></h2>
          <p className="mt-4 text-gray-600">We:</p>
          <ul className="mt-2 ml-6 list-disc text-gray-600 space-y-1">
            <li>Does <strong>not</strong> employ Experts</li>
            <li>Does <strong>not</strong> guarantee the quality, accuracy, legality, or suitability of Expert services</li>
            <li>Is <strong>not</strong> a party to agreements formed between AI Labs and Experts</li>
          </ul>
          <p className="mt-4 text-gray-600">
            All engagements, deliverables, and outcomes are the sole responsibility of the AI Lab and the Expert involved.
          </p>
        </section>

        <section id="expert-services" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">5. Expert Services</h2>
          <ul className="mt-4 ml-6 list-disc text-gray-600 space-y-1">
            <li>Experts are independent contractors, not employees, agents, or partners of <span className="font-math">𝒯 ⊂ ℒ</span>.</li>
            <li>Experts are solely responsible for the services they provide, including compliance with laws, regulations, and professional standards.</li>
            <li>We do not verify credentials beyond limited platform checks and make no warranties regarding expertise claims.</li>
          </ul>
        </section>

        <section id="ai-lab-responsibilities" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">6. AI Lab Responsibilities</h2>
          <p className="mt-4 text-gray-600">AI Labs agree to:</p>
          <ul className="mt-2 ml-6 list-disc text-gray-600 space-y-1">
            <li>Clearly define the scope of work, duration, and compensation</li>
            <li>Use Expert services lawfully and ethically</li>
            <li>Not misuse, resell, or misrepresent Expert output</li>
          </ul>
          <p className="mt-4 text-gray-600">
            AI Labs are responsible for evaluating whether Expert services meet their needs.
          </p>
        </section>

        <section id="payments-fees" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">7. Payments and Fees</h2>
          <ul className="mt-4 ml-6 list-disc text-gray-600 space-y-1">
            <li>Payment terms are agreed directly between AI Labs and Experts, unless otherwise stated.</li>
            <li>We may charge a platform or service fee, disclosed before any transaction.</li>
            <li>We are not responsible for payment delays caused by third-party payment providers.</li>
          </ul>
          <p className="mt-4 text-gray-600">
            All payments are final unless otherwise required by law.
          </p>
        </section>

        <section id="intellectual-property" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">8. Intellectual Property</h2>
          <ul className="mt-4 ml-6 list-disc text-gray-600 space-y-1">
            <li>Each party retains ownership of its pre-existing intellectual property.</li>
            <li>Ownership of work product created during an engagement must be agreed upon directly between the AI Lab and the Expert.</li>
            <li>We do not claim ownership over user-generated content.</li>
          </ul>
          <p className="mt-4 text-gray-600">
            You grant us a limited, non-exclusive license to host and display content solely for operating the Platform.
          </p>
        </section>

        <section id="confidentiality" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">9. Confidentiality</h2>
          <p className="mt-4 text-gray-600">
            Users may receive confidential or proprietary information during engagements.
          </p>
          <p className="mt-4 text-gray-600">You agree to:</p>
          <ul className="mt-2 ml-6 list-disc text-gray-600 space-y-1">
            <li>Use confidential information only for the agreed purpose</li>
            <li>Not disclose confidential information without authorization</li>
          </ul>
          <p className="mt-4 text-gray-600">
            We are not responsible for confidentiality breaches between users.
          </p>
        </section>

        <section id="prohibited-conduct" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">10. Prohibited Conduct</h2>
          <p className="mt-4 text-gray-600">You agree not to:</p>
          <ul className="mt-2 ml-6 list-disc text-gray-600 space-y-1">
            <li>Violate any laws or regulations</li>
            <li>Post false, misleading, or fraudulent information</li>
            <li>Circumvent platform fees or systems</li>
            <li>Harass, abuse, or exploit other users</li>
            <li>Attempt to reverse engineer or disrupt the Platform</li>
          </ul>
        </section>

        <section id="suspension-termination" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">11. Suspension and Termination</h2>
          <p className="mt-4 text-gray-600">We may suspend or terminate access to the Platform at any time if:</p>
          <ul className="mt-2 ml-6 list-disc text-gray-600 space-y-1">
            <li>These Terms are violated</li>
            <li>Fraud, abuse, or unlawful behavior is suspected</li>
            <li>Required by law or regulatory authorities</li>
          </ul>
          <p className="mt-4 text-gray-600">
            Termination does not affect accrued rights or obligations.
          </p>
        </section>

        <section id="disclaimers" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">12. Disclaimers</h2>
          <p className="mt-4 text-gray-600">
            The Platform is provided on an <strong>"as is"</strong> and <strong>"as available"</strong> basis.
          </p>
          <p className="mt-4 text-gray-600">We disclaim all warranties, including:</p>
          <ul className="mt-2 ml-6 list-disc text-gray-600 space-y-1">
            <li>Accuracy of Expert advice</li>
            <li>Fitness for a particular purpose</li>
            <li>Availability or uninterrupted operation</li>
          </ul>
        </section>

        <section id="limitation-liability" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">13. Limitation of Liability</h2>
          <p className="mt-4 text-gray-600">To the maximum extent permitted by law, we shall not be liable for:</p>
          <ul className="mt-2 ml-6 list-disc text-gray-600 space-y-1">
            <li>Indirect, incidental, or consequential damages</li>
            <li>Loss of profits, data, or business opportunities</li>
            <li>Disputes or damages arising between AI Labs and Experts</li>
          </ul>
          <p className="mt-4 text-gray-600">
            Our total liability shall not exceed the fees paid to us in the preceding 12 months.
          </p>
        </section>

        <section id="indemnification" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">14. Indemnification</h2>
          <p className="mt-4 text-gray-600">You agree to indemnify and hold us harmless from any claims, losses, or damages arising from:</p>
          <ul className="mt-2 ml-6 list-disc text-gray-600 space-y-1">
            <li>Your use of the Platform</li>
            <li>Your violation of these Terms</li>
            <li>Your interactions or agreements with other users</li>
          </ul>
        </section>

        <section id="governing-law" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">15. Governing Law</h2>
          <p className="mt-4 text-gray-600">
            These Terms shall be governed by and interpreted in accordance with applicable laws, without regard to conflict of law principles.
          </p>
        </section>

        <section id="changes-to-terms" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">16. Changes to Terms</h2>
          <p className="mt-4 text-gray-600">
            We may update these Terms from time to time. Continued use of the Platform after updates constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section id="contact" className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-900">17. Contact Information</h2>
          <p className="mt-4 text-gray-600">
            For questions or legal notices, contact:
          </p>
          <div className="mt-2 p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900"><span className="font-math">𝒯 ⊂ ℒ</span></p>
            <p className="text-gray-600">Email: [Insert Official Email]</p>
          </div>
        </section>

        <div className="pt-12 mt-12 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            <strong>By using our platform, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</strong>
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

export default TermsAndConditions;
