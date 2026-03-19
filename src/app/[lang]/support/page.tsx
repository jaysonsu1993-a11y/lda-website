"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage, useLocalizedPath } from "@/context/LanguageContext";
import { useState } from "react";

const faqs = [
  { question: "How do I connect my MS-3 to my computer?", answer: "Use a standard USB-B to USB-A cable. The MS-3 will appear as a MIDI device. No drivers needed on macOS or Windows 10+." },
  { question: "Can I use the MS-3 with my analog pedalboard?", answer: "Yes! The MS-3 features true bypass loops that integrate seamlessly with your analog pedals." },
  { question: "How many presets can I store?", answer: "The MS-3 stores up to 100 presets, each containing complete loop states, MIDI messages, and expression settings." },
  { question: "Does it support expression pedals?", answer: "Yes, the MS-3 has an expression pedal input that can control any MIDI CC parameter." },
  { question: "Can I chain multiple MS-3 units together?", answer: "Yes, you can MIDI chain multiple units or use them in parallel for expanded control." },
  { question: "Is firmware update available?", answer: "Yes, firmware updates are released periodically. Connect via USB and use our updater software." },
];

export default function Support() {
  const { t } = useLanguage();
  const path = useLocalizedPath();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#131212] text-white w-full">
      <Navigation />

      <section className="px-4 md:px-12 py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-4">{t.support.hero.title}</h1>
        <p className="text-gray-400 text-center max-w-2xl mx-auto">{t.support.hero.subtitle}</p>
      </section>

      <section className="px-4 md:px-12 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href={path("/downloads")} className="bg-[#1a1a1a] border border-[#333] p-6 text-center hover:border-gray-600 transition-colors">
            <div className="text-3xl mb-2">📥</div>
            <div className="text-sm uppercase tracking-widest">{t.support.quickLinks.downloads}</div>
          </a>
          <a href={path("/lab")} className="bg-[#1a1a1a] border border-[#333] p-6 text-center hover:border-gray-600 transition-colors">
            <div className="text-3xl mb-2">📖</div>
            <div className="text-sm uppercase tracking-widest">{t.support.quickLinks.docs}</div>
          </a>
          <a href="mailto:support@logicdesaudio.com" className="bg-[#1a1a1a] border border-[#333] p-6 text-center hover:border-gray-600 transition-colors">
            <div className="text-3xl mb-2">✉️</div>
            <div className="text-sm uppercase tracking-widest">{t.support.quickLinks.email}</div>
          </a>
          <a href="#faq" className="bg-[#1a1a1a] border border-[#333] p-6 text-center hover:border-gray-600 transition-colors">
            <div className="text-3xl mb-2">❓</div>
            <div className="text-sm uppercase tracking-widest">{t.support.quickLinks.faq}</div>
          </a>
        </div>
      </section>

      <section id="faq" className="px-4 md:px-12 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{t.support.faq.title}</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-[#333] bg-[#1a1a1a]">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-medium">{faq.question}</span>
                <span className="text-gray-500 text-xl ml-4">{openFaq === index ? "−" : "+"}</span>
              </button>
              {openFaq === index && (
                <div className="px-6 pb-4 text-gray-400 text-sm">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-12 py-16 bg-[#1a1a1a] border-y border-[#333]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.support.cta.title}</h2>
          <p className="text-gray-400 mb-6">{t.support.cta.subtitle}</p>
          <a href="mailto:support@logicdesaudio.com" className="inline-block px-8 py-3 bg-white text-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors">
            {t.support.cta.button}
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
