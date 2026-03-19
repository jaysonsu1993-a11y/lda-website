"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage, useLocalizedPath } from "@/context/LanguageContext";
import MidiEditor from "@/components/MidiEditor";

export default function Ms3EditorPage() {
  const { t } = useLanguage();
  const path = useLocalizedPath();

  return (
    <main className="min-h-screen bg-[#131212] text-white w-full">
      <Navigation />

      {/* MS-3 Editor Section - Editor content stays in English */}
      <section className="px-4 md:px-8 lg:px-12 py-12 md:py-20 lg:py-32 w-full">
        <div className="max-w-full mx-auto w-full">
          <div className="text-center mb-4">
            <Link href={path("/ms-3")} className="text-sm text-gray-400 hover:text-white inline-block mb-4">
              ← Back to MS-3
            </Link>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
              MS-3 MIDI SWITCHER
            </h1>
            <p className="text-gray-400 text-center mb-6 md:mb-8">Configure and control your MS-3 device</p>
          </div>

          <div className="border border-[#333] bg-[#1a1a1a] p-3 md:p-6 w-full overflow-x-auto h-[80vh]">
            <div className="h-full w-full">
              <MidiEditor />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
