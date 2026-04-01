import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | What to eat tonight?",
  description: "Privacy Policy for What to eat tonight? — learn how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-[100dvh] bg-gray-950 text-gray-50 flex flex-col">
      <div className="max-w-3xl mx-auto w-full px-6 py-12 flex-1">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Roulette
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
        </div>

        <p className="text-gray-500 text-sm mb-8">Last updated: March 30, 2026</p>

        <article className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-200 mb-3">1. Introduction</h2>
            <p>
              Welcome to <strong className="text-white">What to eat tonight?</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-200 mb-3">2. Information We Collect</h2>
            <p>We collect minimal information to provide and improve our service:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 mt-3">
              <li><strong className="text-gray-300">Usage Data:</strong> Anonymous analytics data such as page views, browser type, device type, and referral source, collected via Google Analytics.</li>
              <li><strong className="text-gray-300">Cookies:</strong> We use cookies for analytics and advertising purposes (Google AdSense). You can control cookie preferences through your browser settings.</li>
              <li><strong className="text-gray-300">Location Data:</strong> If you grant permission, we may use your browser&apos;s geolocation to generate Google Maps search links for nearby restaurants. This data is never stored on our servers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-200 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>To provide and maintain our food roulette service</li>
              <li>To generate relevant nearby restaurant search links</li>
              <li>To analyze website usage and improve user experience</li>
              <li>To display relevant advertisements via Google AdSense</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-200 mb-3">4. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 mt-3">
              <li><strong className="text-gray-300">Google AdSense:</strong> To display advertisements. Google may use cookies to serve ads based on your prior visits. Learn more at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">Google&apos;s Privacy Policy</a>.</li>
              <li><strong className="text-gray-300">Google Analytics:</strong> To collect anonymous usage statistics.</li>
              <li><strong className="text-gray-300">Google Maps:</strong> To provide restaurant search links. Your interaction with Google Maps is governed by Google&apos;s privacy policy.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-200 mb-3">5. Data Storage</h2>
            <p>
              We do not store any personal data on our servers. All roulette interactions happen locally in your browser. We do not require user accounts or registration to use our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-200 mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 mt-3">
              <li>Opt out of personalized advertising via <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">Google Ads Settings</a></li>
              <li>Disable cookies through your browser settings</li>
              <li>Deny location access when prompted by your browser</li>
              <li>Request information about data we hold about you</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-200 mb-3">7. Children&apos;s Privacy</h2>
            <p>
              Our service is not directed at children under the age of 13. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-200 mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-200 mb-3">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please email us at <strong>fcsfcs007@gmail.com</strong>.
            </p>
          </section>
        </article>
      </div>

      <footer className="w-full bg-gray-900 border-t border-gray-800 py-6 px-6">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/tips" className="text-gray-400 hover:text-yellow-400 transition-colors">Food Tips</Link>
          <Link href="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">About Us</Link>
          <Link href="/privacy" className="text-yellow-400 font-medium">Privacy Policy</Link>
        </div>
        <p className="text-gray-600 text-xs text-center mt-4">&copy; {new Date().getFullYear()} What to eat tonight? All rights reserved.</p>
      </footer>
    </div>
  );
}
