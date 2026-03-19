"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

const galleryItems = [
  { id: 1, category: "Setup", title: "Pedalboard Setup #1", location: "Nashville, TN" },
  { id: 2, category: "Product", title: "MS-3 Studio Shot", location: "Product" },
  { id: 3, category: "Setup", title: "Minimal Board", location: "Tokyo, JP" },
  { id: 4, category: "Live", title: "Tour 2024", location: "London, UK" },
  { id: 5, category: "Product", title: "Close Up Detail", location: "Product" },
  { id: 6, category: "Setup", title: "Full MIDI Rig", location: "Berlin, DE" },
  { id: 7, category: "Studio", title: "Recording Session", location: "LA, CA" },
  { id: 8, category: "Live", title: "Festival Stage", location: "Austin, TX" },
];

const categories = ["All", "Product", "Setup", "Live", "Studio"];

export default function Gallery() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const filterLabels: Record<string, string> = {
    All: t.gallery.filter.all,
    Product: t.gallery.filter.product,
    Setup: t.gallery.filter.setup,
    Live: t.gallery.filter.live,
    Studio: t.gallery.filter.studio,
  };

  return (
    <main className="min-h-screen bg-[#131212] text-white w-full">
      <Navigation />

      <section className="px-4 md:px-12 py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-4">{t.gallery.hero.title}</h1>
        <p className="text-gray-400 text-center max-w-2xl mx-auto">{t.gallery.hero.subtitle}</p>
      </section>

      <section className="px-4 md:px-12 pb-8">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 text-xs uppercase tracking-widest transition-colors ${
                activeCategory === category ? "bg-white text-black" : "border border-[#333] hover:border-white"
              }`}
            >
              {filterLabels[category]}
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-12 pb-16 md:pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {filteredItems.map((item) => (
            <div key={item.id} className="aspect-square bg-[#1a1a1a] border border-[#333] hover:border-gray-600 transition-colors cursor-pointer group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#252525] to-[#151515] group-hover:scale-105 transition-transform duration-500"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-xs text-gray-600 uppercase tracking-widest mb-2">{item.category}</span>
                <h3 className="text-sm font-bold mb-1">{item.title}</h3>
                <span className="text-xs text-gray-500">{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-12 py-16 bg-[#1a1a1a] border-y border-[#333]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.gallery.cta.title}</h2>
          <p className="text-gray-400 mb-6">{t.gallery.cta.subtitle}</p>
          <button className="px-8 py-3 bg-white text-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors">
            {t.gallery.cta.button}
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
