"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage, useLocalizedPath } from "@/context/LanguageContext";

export default function EditorPage() {
  const { t } = useLanguage();
  const path = useLocalizedPath();

  return (
    <main className="min-h-screen bg-[#131212] text-white w-full">
      <Navigation />

      <section className="px-4 md:px-8 lg:px-12 py-12 md:py-20 lg:py-32 w-full">
        <div className="max-w-full mx-auto w-full text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">PRESET EDITORS</h1>
          <p className="text-gray-400 text-lg mb-12">Select a device to configure</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* MS-3 */}
            <Link
              href={path("/editor/ms-3")}
              className="bg-[#1a1a1a] border border-[#333] hover:border-[#00d4ff] transition-colors p-8 text-center group"
            >
              <div className="text-5xl font-bold mb-4 group-hover:text-[#00d4ff] transition-colors">MS-3</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest">MIDI SWITCHER</div>
            </Link>

            {/* LS-4p3 - Coming Soon */}
            <div className="bg-[#1a1a1a] border border-[#333] p-8 text-center opacity-50">
              <div className="text-5xl font-bold mb-4">LS-4p3</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest">LOOP SWITCHER</div>
              <div className="mt-4 text-xs text-gray-600">COMING SOON</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
