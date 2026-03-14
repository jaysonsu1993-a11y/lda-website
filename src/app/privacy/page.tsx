"use client";

import Link from "next/link";

export default function Privacy() {
  return (
    <main className="min-h-screen bg-[#131212] text-white w-full">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 md:px-12 py-4 border-b border-[#333] w-full">
        <Link href="/" className="text-xl font-bold tracking-widest">
          LdA
        </Link>
      </nav>

      <section className="px-4 md:px-12 py-16 md:py-24 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">PRIVACY POLICY</h1>
        
        <div className="space-y-8 text-gray-300 text-sm md:text-base">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">DATA WE COLLECT</h2>
            <p>We collect minimal data necessary for order processing and product support:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Email address (for order updates and newsletter)</li>
              <li>Shipping and billing address</li>
              <li>Payment information (processed securely via Stripe)</li>
              <li>Device information for product support</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">HOW WE USE DATA</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Process and fulfill orders</li>
              <li>Provide customer support</li>
              <li>Send product updates (if subscribed)</li>
              <li>Improve our products and services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">DATA SHARING</h2>
            <p>We do not sell your personal data. We share data only with:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Payment processors (Stripe) for transactions</li>
              <li>Shipping partners for delivery</li>
              <li>Legal authorities when required</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">COOKIES</h2>
            <p>We use essential cookies for site functionality. You can disable cookies in your browser settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">YOUR RIGHTS</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Access your data</li>
              <li>Request data deletion</li>
              <li>Opt-out of newsletter</li>
              <li>Export your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">CONTACT</h2>
            <p>Questions? Email us at privacy@logicdesaudio.com</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-[#333]">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            ← BACK TO HOME
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#333] px-4 md:px-12 py-8">
        <div className="text-center text-sm text-gray-500">
          ©2025 Logic des Audio · 粤ICP备2025509252号-1
        </div>
      </footer>
    </main>
  );
}
