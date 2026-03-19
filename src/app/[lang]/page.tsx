"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage, useLocalizedPath } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const path = useLocalizedPath();

  return (
    <main className="min-h-screen bg-[#131212] text-white w-full relative">
      {/* Subtle noise texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.005] z-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}></div>

      <Navigation />

      {/* Hero Section - Products */}
      <section className="px-4 md:px-12 py-8 md:py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12 w-full">
          {/* MS-3 - Available Now */}
          <Link href={path("/ms-3")} className="group w-full">
            <div className="aspect-[16/9] bg-[#1a1a1a] flex flex-col items-center justify-center p-6 md:p-8 lg:p-12 border border-[#333] hover:border-gray-600 transition-colors w-full">
              <span className="text-xs md:text-sm uppercase tracking-widest mb-4">{t.home.hero.midiSwitcher}</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">MS-3</h2>
              <span className="px-4 py-1 bg-green-600 text-white text-xs uppercase tracking-widest">
                {t.home.hero.availableNow}
              </span>
            </div>
          </Link>

          {/* LS-4p3 - Coming Soon */}
          <div className="group w-full">
            <div className="aspect-[16/9] bg-[#1a1a1a] flex flex-col items-center justify-center p-6 md:p-8 lg:p-12 border border-[#333] w-full">
              <span className="text-xs md:text-sm uppercase tracking-widest mb-4">{t.home.hero.loopSwitcher}</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">LS-4p3</h2>
              <span className="px-4 py-1 bg-gray-600 text-white text-xs uppercase tracking-widest">
                {t.home.hero.comingSoon}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Get Fully Control - Video Background */}
      <section className="relative h-screen w-full">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/lda-hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <h2 className="text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-light tracking-wide text-center px-2 py-2 bg-black/30 drop-shadow-[0_0_20px_rgba(255,255,255,0.9)] drop-shadow-[0_0_40px_rgba(255,255,255,0.6)] drop-shadow-[0_0_60px_rgba(255,255,255,0.3)]">
            {t.home.hero.getFullyControl}
          </h2>
          <h2 className="text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-light tracking-wide mt-4 md:mt-6 lg:mt-8 text-center px-2 py-2 bg-black/30 drop-shadow-[0_0_20px_rgba(255,255,255,0.9)] drop-shadow-[0_0_40px_rgba(255,255,255,0.6)] drop-shadow-[0_0_60px_rgba(255,255,255,0.3)]">
            {t.home.hero.yourEffectChain}
          </h2>

          {/* Explore Button */}
          <div className="mt-8 md:mt-10 lg:mt-12">
            <a href="#content" className="inline-block px-6 md:px-8 py-3 md:py-4 border border-white text-xs md:text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
              {t.home.hero.explore}
            </a>
          </div>
        </div>
      </section>

      {/* Explore Content */}
      <section id="content" className="px-4 md:px-12 py-8 md:py-12 w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 w-full">
          {/* What's on Pedals */}
          <Link href={path("/gallery")} className="aspect-square bg-[#1a1a1a] flex items-center justify-center p-2 md:p-4 border border-[#333] hover:border-gray-600 transition-colors cursor-pointer">
            <div className="text-center leading-tight">
              <span className="text-xs md:text-sm uppercase tracking-widest block">{t.home.explore.pedals}</span>
            </div>
          </Link>

          {/* What's on Boards */}
          <Link href={path("/gallery")} className="aspect-square bg-[#1a1a1a] flex items-center justify-center p-2 md:p-4 border border-[#333] hover:border-gray-600 transition-colors cursor-pointer">
            <div className="text-center leading-tight">
              <span className="text-xs md:text-sm uppercase tracking-widest block">{t.home.explore.boards}</span>
            </div>
          </Link>

          {/* LdA Custom */}
          <div className="col-span-2 aspect-square bg-[#1a1a1a] flex flex-col items-center justify-center p-2 md:p-4 border border-[#333] hover:border-gray-600 transition-colors cursor-pointer">
            <div className="text-center">
              <span className="text-lg md:text-xl font-bold">{t.home.explore.customShop}</span>
              <div className="text-xs uppercase tracking-widest mt-2">{t.home.explore.shop}</div>
            </div>
          </div>

          {/* MIDI Library */}
          <div className="col-span-2 aspect-square bg-[#1a1a1a] flex items-center justify-center p-2 md:p-4 border border-[#333] hover:border-gray-600 transition-colors cursor-pointer">
            <div className="text-center">
              <span className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-widest">{t.home.explore.midiLibrary}</span>
              <div className="text-lg md:text-xl mt-1">{t.home.explore.library}</div>
            </div>
          </div>

          {/* Gallery */}
          <Link href={path("/gallery")} className="aspect-square bg-[#1a1a1a] flex items-center justify-center p-2 md:p-4 border border-[#333] hover:border-gray-600 transition-colors cursor-pointer">
            <span className="text-lg md:text-xl font-light uppercase tracking-widest">{t.home.explore.gallery}</span>
          </Link>

          {/* Downloads */}
          <Link href={path("/downloads")} className="aspect-square bg-[#1a1a1a] flex items-center justify-center p-2 md:p-4 border border-[#333] hover:border-gray-600 transition-colors cursor-pointer">
            <span className="text-lg md:text-xl font-light uppercase tracking-widest">{t.home.explore.downloads}</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
