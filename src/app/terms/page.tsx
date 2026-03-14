"use client";

import Link from "next/link";

export default function Terms() {
  return (
    <main className="min-h-screen bg-[#131212] text-white w-full">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 md:px-12 py-4 border-b border-[#333] w-full">
        <Link href="/" className="text-xl font-bold tracking-widest">
          LdA
        </Link>
      </nav>

      <section className="px-4 md:px-12 py-16 md:py-24 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">RETURN TERMS</h1>
        
        <div className="space-y-8 text-gray-300 text-sm md:text-base">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">30-DAY RETURN POLICY</h2>
            <p>We offer a 30-day return policy for all products in original condition. If you're not satisfied, return within 30 days for a full refund.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">ELIGIBILITY</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Product must be in original packaging</li>
              <li>All accessories must be included</li>
              <li>Product must show no signs of use</li>
              <li>Proof of purchase required</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">HOW TO RETURN</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Contact support@logicdesaudio.com to request a return</li>
              <li>Pack product securely in original packaging</li>
              <li>Ship to the address provided by our team</li>
              <li>Refunds processed within 14 days of receipt</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">SHIPPING COSTS</h2>
            <p>Customer is responsible for return shipping costs unless the product is defective.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">DEFECTIVE PRODUCTS</h2>
            <p>If your product arrives defective, contact us immediately for a replacement. We'll cover all shipping costs.</p>
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
