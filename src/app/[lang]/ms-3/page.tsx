"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage, useLocalizedPath } from "@/context/LanguageContext";

export default function Ms3Product() {
  const { t } = useLanguage();
  const path = useLocalizedPath();

  return (
    <main className="min-h-screen bg-[#131212] text-white w-full">
      <Navigation />

      {/* MS-3 Product Hero */}
      <section className="px-4 md:px-8 lg:px-12 py-12 md:py-20 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Product Image */}
            <div className="relative aspect-square bg-[#1a1a1a] rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl font-bold text-[#333]">MS-3</div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">MS-3</h1>
              <h2 className="text-xl md:text-2xl text-gray-400 mb-6">{t.ms3.product.midiSwitcher}</h2>

              <div className="inline-block bg-[#00d4ff] text-black px-4 py-2 text-sm font-bold mb-8">
                {t.ms3.product.availableNow}
              </div>

              <p className="text-gray-300 mb-8 text-lg">
                {t.ms3.product.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href={path("/store")}
                  className="px-8 py-4 bg-white text-black font-bold text-center hover:bg-gray-200 transition-colors"
                >
                  {t.ms3.product.buyNow}
                </Link>
                <Link
                  href={path("/ms-3/editor")}
                  className="px-8 py-4 border border-[#00d4ff] text-[#00d4ff] font-bold text-center hover:bg-[#00d4ff] hover:text-black transition-colors"
                >
                  {t.ms3.product.configure}
                </Link>
              </div>

              {/* Specs */}
              <div className="border-t border-[#333] pt-6">
                <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-4">{t.ms3.product.specs}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">{t.ms3.product.loops}</span>
                    <p className="text-white">3</p>
                  </div>
                  <div>
                    <span className="text-gray-500">{t.ms3.product.presets}</span>
                    <p className="text-white">9</p>
                  </div>
                  <div>
                    <span className="text-gray-500">{t.ms3.product.midiChannels}</span>
                    <p className="text-white">16</p>
                  </div>
                  <div>
                    <span className="text-gray-500">{t.ms3.product.connectivity}</span>
                    <p className="text-white">USB-C, 5-pin DIN</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 md:px-8 lg:px-12 py-12 md:py-16 bg-[#1a1a1a] w-full">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{t.ms3.features.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-lg font-bold mb-2">{t.ms3.features.loops.title}</h3>
              <p className="text-gray-400">{t.ms3.features.loops.desc}</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💾</div>
              <h3 className="text-lg font-bold mb-2">{t.ms3.features.presets.title}</h3>
              <p className="text-gray-400">{t.ms3.features.presets.desc}</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎹</div>
              <h3 className="text-lg font-bold mb-2">{t.ms3.features.midi.title}</h3>
              <p className="text-gray-400">{t.ms3.features.midi.desc}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
