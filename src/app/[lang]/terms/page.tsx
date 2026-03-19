"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage, useLocalizedPath } from "@/context/LanguageContext";

export default function Terms() {
  const { t } = useLanguage();
  const path = useLocalizedPath();
  const s = t.terms.sections;

  return (
    <main className="min-h-screen bg-[#131212] text-white w-full">
      <Navigation />

      <section className="px-4 md:px-12 py-16 md:py-24 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">{t.terms.title}</h1>

        <div className="space-y-8 text-gray-300 text-sm md:text-base">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">{s.policy.heading}</h2>
            <p>{s.policy.text}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">{s.eligibility.heading}</h2>
            <ul className="list-disc list-inside space-y-2">
              {s.eligibility.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">{s.howToReturn.heading}</h2>
            <ol className="list-decimal list-inside space-y-2">
              {s.howToReturn.steps.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">{s.shipping.heading}</h2>
            <p>{s.shipping.text}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">{s.defective.heading}</h2>
            <p>{s.defective.text}</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-[#333]">
          <a href={path("/")} className="text-gray-400 hover:text-white transition-colors">{t.terms.back}</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
