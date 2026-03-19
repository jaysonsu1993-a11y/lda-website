"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage, useLocalizedPath } from "@/context/LanguageContext";

export default function Privacy() {
  const { t } = useLanguage();
  const path = useLocalizedPath();
  const s = t.privacy.sections;

  return (
    <main className="min-h-screen bg-[#131212] text-white w-full">
      <Navigation />

      <section className="px-4 md:px-12 py-16 md:py-24 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">{t.privacy.title}</h1>

        <div className="space-y-8 text-gray-300 text-sm md:text-base">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">{s.dataCollect.heading}</h2>
            <p>{s.dataCollect.intro}</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              {s.dataCollect.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">{s.dataUse.heading}</h2>
            <ul className="list-disc list-inside space-y-2">
              {s.dataUse.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">{s.dataSharing.heading}</h2>
            <p>{s.dataSharing.intro}</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              {s.dataSharing.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">{s.cookies.heading}</h2>
            <p>{s.cookies.text}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">{s.rights.heading}</h2>
            <ul className="list-disc list-inside space-y-2">
              {s.rights.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">{s.contact.heading}</h2>
            <p>{s.contact.text}</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-[#333]">
          <a href={path("/")} className="text-gray-400 hover:text-white transition-colors">{t.privacy.back}</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
