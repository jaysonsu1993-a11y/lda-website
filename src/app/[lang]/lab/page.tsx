"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const articles = [
  { id: "midi-basics", title: "MIDI Basics", excerpt: "Understanding MIDI: What it is and how it works", category: "Fundamentals", date: "2025-01-15" },
  { id: "program-change", title: "Program Change Messages", excerpt: "How to use program change to switch presets instantly", category: "Tutorial", date: "2025-01-20" },
  { id: "cc-messages", title: "Control Change Deep Dive", excerpt: "Mastering CC messages for expression and control", category: "Advanced", date: "2025-02-01" },
  { id: "midi-routing", title: "MIDI Routing Strategies", excerpt: "Best practices for chaining multiple devices", category: "Setup", date: "2025-02-10" },
  { id: "sync-tempo", title: "Tempo Sync & Clock", excerpt: "Keeping all your devices in perfect time", category: "Tutorial", date: "2025-02-15" },
  { id: "midi-merging", title: "MIDI Merging & Splitting", excerpt: "Combine multiple controllers into one signal", category: "Advanced", date: "2025-02-20" },
];

export default function Lab() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#131212] text-white w-full">
      <Navigation />

      <section className="px-4 md:px-12 py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-4">{t.lab.hero.title}</h1>
        <p className="text-gray-400 text-center max-w-2xl mx-auto">{t.lab.hero.subtitle}</p>
      </section>

      <section className="px-4 md:px-12 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article key={article.id} className="bg-[#1a1a1a] border border-[#333] hover:border-gray-600 transition-colors cursor-pointer group">
              <div className="h-48 bg-[#151515] flex items-center justify-center">
                <div className="text-6xl opacity-20 font-bold">MIDI</div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-green-500 uppercase tracking-widest">{article.category}</span>
                  <span className="text-xs text-gray-600">{article.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-gray-300 transition-colors">{article.title}</h3>
                <p className="text-gray-400 text-sm">{article.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-12 py-16 bg-[#1a1a1a] border-y border-[#333]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.lab.newsletter.title}</h2>
          <p className="text-gray-400 mb-6">{t.lab.newsletter.subtitle}</p>
          <form className="flex max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent border border-[#333] px-4 py-3 text-sm focus:outline-none focus:border-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors"
            >
              {t.lab.newsletter.subscribe}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
