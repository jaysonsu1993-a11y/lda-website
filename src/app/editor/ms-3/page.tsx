"use client";

import Link from "next/link";
import Image from "next/image";
import MidiEditor from "@/components/MidiEditor";
import { useState } from "react";

export default function Ms3Editor() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <main className="min-h-screen bg-[#131212] text-white w-full">
      {/* Top Banner */}
      <div className="bg-[#1a1a1a] text-center py-2 text-sm w-full">
        <a href="#" className="hover:underline">FREE worldwide shipping on orders over $200.</a>
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 md:px-8 lg:px-12 py-4 border-b border-[#333] w-full relative">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
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
        <div className="hidden md:flex items-center gap-4 md:gap-8">
          <Link href="#" className="text-xs md:text-sm uppercase tracking-widest hover:text-gray-400">
            CATALOG
          </Link>
          <Link href="/store" className="text-xs md:text-sm uppercase tracking-widest hover:text-gray-400">
            STORE
          </Link>
          <Link href="/lab" className="text-xs md:text-sm uppercase tracking-widest hover:text-gray-400">
            LAB
          </Link>
        </div>
        
        {/* Logo - Center */}
        <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
          <Image 
            src="/lda-logo.png" 
            alt="Logic des Audio" 
            width={120} 
            height={50}
            className="h-10 md:h-14 lg:h-16 w-auto object-contain"
          />
        </Link>
        
        {/* Desktop Right Links */}
        <div className="hidden md:flex items-center gap-4 md:gap-8">
          <Link href="/editor" className="text-xs md:text-sm uppercase tracking-widest hover:text-gray-400">
            EDITOR
          </Link>
          <Link href="#" className="text-xs md:text-sm uppercase tracking-widest hover:text-gray-400">
            SUPPORT
          </Link>
          <button className="text-xs md:text-sm uppercase tracking-widest hover:text-gray-400">
            LANGUAGE
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#1a1a1a] border-b border-[#333] py-4 md:hidden z-50">
            <div className="flex flex-col items-center gap-4">
              <Link href="#" className="text-xs uppercase tracking-widest hover:text-gray-400" onClick={() => setMobileMenuOpen(false)}>
                CATALOG
              </Link>
              <Link href="/store" className="text-xs uppercase tracking-widest hover:text-gray-400" onClick={() => setMobileMenuOpen(false)}>
                STORE
              </Link>
              <Link href="/lab" className="text-xs uppercase tracking-widest hover:text-gray-400" onClick={() => setMobileMenuOpen(false)}>
                LAB
              </Link>
              <Link href="/editor" className="text-xs uppercase tracking-widest hover:text-gray-400" onClick={() => setMobileMenuOpen(false)}>
                EDITOR
              </Link>
              <Link href="#" className="text-xs uppercase tracking-widest hover:text-gray-400" onClick={() => setMobileMenuOpen(false)}>
                SUPPORT
              </Link>
              <button className="text-xs uppercase tracking-widest hover:text-gray-400" onClick={() => setMobileMenuOpen(false)}>
                LANGUAGE
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* MS-3 Editor Section */}
      <section className="px-4 md:px-8 lg:px-12 py-12 md:py-20 lg:py-32 w-full">
        <div className="max-w-full mx-auto w-full">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-4">MS-3 MIDI SWITCHER</h1>
          <p className="text-gray-400 text-center mb-6 md:mb-8">Configure and control your MS-3 device</p>
          
          <div className="border border-[#333] bg-[#1a1a1a] p-3 md:p-6 w-full overflow-x-auto h-[80vh]">
            <div className="h-full w-full">
              <MidiEditor />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#333] px-4 md:px-8 lg:px-12 py-8 md:py-12 mt-8 md:mt-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-full mx-auto w-full">
          <div>
            <h3 className="text-lg font-bold mb-4">EMAIL NEWSLETTER</h3>
            <p className="text-sm text-gray-400 mb-4">Get 10% off your first merchandise order.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">MISSION</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Responsible Design</li>
              <li>Responsible Manufacture</li>
              <li>Creativity</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">TERMS & POLICY</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Return Terms</li>
              <li>Privacy Policy</li>
              <li>Copyright</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">CONTACT</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>YouTube</li>
              <li>Email</li>
              <li>WeChat</li>
              <li>Instagram</li>
              <li>TikTok</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 md:mt-12 text-sm text-gray-500">
          ©2025 Logic des Audio
          <br />
          <span className="text-xs">粤ICP备2025509252号-1</span>
        </div>
      </footer>
    </main>
  );
}
