"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage, useLocalizedPath } from "@/context/LanguageContext";

export default function Navigation() {
  const { t, lang, toggleLang } = useLanguage();
  const path = useLocalizedPath();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#1a1a1a] text-center py-2 text-sm w-full">
        <a href="#" className="hover:underline">{t.banner.shipping}</a>
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 md:px-12 py-4 border-b border-[#333] w-full relative">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Left Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="#" className="text-sm uppercase tracking-widest hover:text-gray-400">
            {t.nav.catalog}
          </Link>
          <Link href={path("/store")} className="text-sm uppercase tracking-widest hover:text-gray-400">
            {t.nav.store}
          </Link>
          <Link href={path("/lab")} className="text-sm uppercase tracking-widest hover:text-gray-400">
            {t.nav.lab}
          </Link>
        </div>

        {/* Logo - Center */}
        <Link href={path("/")} className="absolute left-1/2 transform -translate-x-1/2">
          <Image
            src="/lda-logo.png"
            alt="Logic des Audio"
            width={120}
            height={50}
            className="h-10 lg:h-14 xl:h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Right Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href={path("/editor")} className="text-sm uppercase tracking-widest hover:text-gray-400">
            {t.nav.editor}
          </Link>
          <Link href={path("/support")} className="text-sm uppercase tracking-widest hover:text-gray-400">
            {t.nav.support}
          </Link>
          <button
            onClick={toggleLang}
            className="text-sm uppercase tracking-widest hover:text-gray-400"
          >
            {lang === "en" ? "中文" : "EN"}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#1a1a1a] border-b border-[#333] py-4 lg:hidden z-50">
            <div className="flex flex-col items-center gap-4">
              <Link href="#" className="text-xs uppercase tracking-widest hover:text-gray-400" onClick={() => setMobileMenuOpen(false)}>
                {t.nav.catalog}
              </Link>
              <Link href={path("/store")} className="text-xs uppercase tracking-widest hover:text-gray-400" onClick={() => setMobileMenuOpen(false)}>
                {t.nav.store}
              </Link>
              <Link href={path("/lab")} className="text-xs uppercase tracking-widest hover:text-gray-400" onClick={() => setMobileMenuOpen(false)}>
                {t.nav.lab}
              </Link>
              <Link href={path("/editor")} className="text-xs uppercase tracking-widest hover:text-gray-400" onClick={() => setMobileMenuOpen(false)}>
                {t.nav.editor}
              </Link>
              <Link href={path("/support")} className="text-xs uppercase tracking-widest hover:text-gray-400" onClick={() => setMobileMenuOpen(false)}>
                {t.nav.support}
              </Link>
              <button
                onClick={() => { toggleLang(); setMobileMenuOpen(false); }}
                className="text-xs uppercase tracking-widest hover:text-gray-400"
              >
                {lang === "en" ? "中文" : "EN"}
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
