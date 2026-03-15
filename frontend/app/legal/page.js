export default function LegalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Legal</h1>
        <p className="text-slate-400 mt-2">Terms of service and privacy policy.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Terms of Service</h2>
          <div className="prose prose-invert max-w-none">
            <h3 className="text-lg font-semibold text-slate-100 mt-6 mb-3">1. Acceptance of Terms</h3>
            <p className="text-slate-300 mb-4">
              By accessing and using LocalRank AI, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h3 className="text-lg font-semibold text-slate-100 mt-6 mb-3">2. Use License</h3>
            <p className="text-slate-300 mb-4">
              Permission is granted to temporarily use LocalRank AI for personal, non-commercial transitory viewing only.
            </p>

            <h3 className="text-lg font-semibold text-slate-100 mt-6 mb-3">3. Disclaimer</h3>
            <p className="text-slate-300 mb-4">
              The materials on LocalRank AI are provided on an 'as is' basis. LocalRank AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h3 className="text-lg font-semibold text-slate-100 mt-6 mb-3">4. Limitations</h3>
            <p className="text-slate-300 mb-4">
              In no event shall LocalRank AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use LocalRank AI.
            </p>

            <h3 className="text-lg font-semibold text-slate-100 mt-6 mb-3">5. Accuracy of Materials</h3>
            <p className="text-slate-300 mb-4">
              The materials appearing on LocalRank AI could include technical, typographical, or photographic errors. LocalRank AI does not warrant that any of the materials on its website are accurate, complete, or current.
            </p>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Privacy Policy</h2>
          <div className="prose prose-invert max-w-none">
            <h3 className="text-lg font-semibold text-slate-100 mt-6 mb-3">1. Information We Collect</h3>
            <p className="text-slate-300 mb-4">
              We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include your name, email address, and Google Business Profile data.
            </p>

            <h3 className="text-lg font-semibold text-slate-100 mt-6 mb-3">2. How We Use Your Information</h3>
            <p className="text-slate-300 mb-4">
              We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.
            </p>

            <h3 className="text-lg font-semibold text-slate-100 mt-6 mb-3">3. Information Sharing</h3>
            <p className="text-slate-300 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
            </p>

            <h3 className="text-lg font-semibold text-slate-100 mt-6 mb-3">4. Data Security</h3>
            <p className="text-slate-300 mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h3 className="text-lg font-semibold text-slate-100 mt-6 mb-3">5. Contact Us</h3>
            <p className="text-slate-300 mb-4">
              If you have any questions about this Privacy Policy, please contact us at privacy@localrank.ai.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}