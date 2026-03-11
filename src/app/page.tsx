"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail("");
  };

  return (
    <main className="min-h-screen bg-[#131212] text-white w-full relative">
      {/* Subtle noise texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.005] z-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}></div>
      
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

      {/* Hero Section - Products */}
      <section className="px-4 md:px-8 lg:px-12 py-8 md:py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-12 w-full">
          {/* MS-3 - Available Now */}
          <Link href="/ms-3" className="group w-full">
            <div className="aspect-[16/9] bg-[#1a1a1a] flex flex-col items-center justify-center p-6 md:p-8 lg:p-12 border border-[#333] hover:border-gray-600 transition-colors w-full">
              <span className="text-xs md:text-sm uppercase tracking-widest mb-4">MIDI SWITCHER</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">MS-3</h2>
              <span className="px-4 py-1 bg-green-600 text-white text-xs uppercase tracking-widest">
                AVAILABLE NOW
              </span>
            </div>
          </Link>

          {/* LS-4p3 - Coming Soon */}
          <div className="group w-full">
            <div className="aspect-[16/9] bg-[#1a1a1a] flex flex-col items-center justify-center p-6 md:p-8 lg:p-12 border border-[#333] w-full">
              <span className="text-xs md:text-sm uppercase tracking-widest mb-4">LOOP SWITCHER</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">LS-4p3</h2>
              <span className="px-4 py-1 bg-gray-600 text-white text-xs uppercase tracking-widest">
                COMING SOON
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Get Fully Control - Video Background */}
      <section className="relative h-screen px-4 w-full">
        {/* Video Background */}
        <video 
          className="absolute inset-0 w-full min-w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/lda-hero.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center translate-y-[308px] md:translate-y-[324px] lg:translate-y-[340px]">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-light tracking-wide px-4 py-2 bg-black/30 drop-shadow-[0_0_20px_rgba(255,255,255,0.9)] drop-shadow-[0_0_40px_rgba(255,255,255,0.6)] drop-shadow-[0_0_60px_rgba(255,255,255,0.3)]">
            GET FULLY CONTROL OF
          </h2>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-light tracking-wide mt-6 md:mt-8 lg:mt-10 px-4 py-2 bg-black/30 drop-shadow-[0_0_20px_rgba(255,255,255,0.9)] drop-shadow-[0_0_40px_rgba(255,255,255,0.6)] drop-shadow-[0_0_60px_rgba(255,255,255,0.3)]">
            YOUR EFFECT CHAIN
          </h2>
          
          {/* Explore Button */}
          <div className="mt-10 md:mt-12 lg:mt-16">
            <a href="#content" className="inline-block px-6 md:px-8 py-3 md:py-4 border border-white text-xs md:text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
              EXPLORE
            </a>
          </div>
        </div>
      </section>

      {/* Explore Content */}
      <section id="content" className="px-4 md:px-8 lg:px-12 py-8 md:py-12 w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 lg:gap-4 w-full">
          {/* What's on Pedals */}
          <div className="aspect-square bg-[#1a1a1a] flex items-center justify-center p-2 md:p-4 border border-[#333] hover:border-gray-600 transition-colors cursor-pointer">
            <div className="text-center">
              <span className="text-xs uppercase tracking-widest">WHAT'S</span>
              <div className="text-xl md:text-2xl font-bold">ON</div>
              <span className="text-xs uppercase tracking-widest">PEDALS?</span>
            </div>
          </div>

          {/* What's on Boards */}
          <div className="aspect-square bg-[#1a1a1a] flex items-center justify-center p-2 md:p-4 border border-[#333] hover:border-gray-600 transition-colors cursor-pointer">
            <div className="text-center">
              <span className="text-xs uppercase tracking-widest">WHAT'S</span>
              <div className="text-xl md:text-2xl font-bold">ON</div>
              <span className="text-xs uppercase tracking-widest">BOARDS?</span>
            </div>
          </div>

          {/* LdA Custom */}
          <div className="col-span-2 aspect-square bg-[#1a1a1a] flex flex-col items-center justify-center p-2 md:p-4 border border-[#333] hover:border-gray-600 transition-colors cursor-pointer">
            <div className="text-center">
              <span className="text-lg md:text-xl font-bold">LdA CUSTOM</span>
              <div className="text-xs uppercase tracking-widest mt-2">SHOP</div>
            </div>
          </div>

          {/* MIDI Library */}
          <div className="col-span-2 aspect-square bg-[#1a1a1a] flex items-center justify-center p-2 md:p-4 border border-[#333] hover:border-gray-600 transition-colors cursor-pointer">
            <div className="text-center">
              <span className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-widest">MIDI</span>
              <div className="text-lg md:text-xl mt-1">LIBRARY</div>
            </div>
          </div>

          {/* Gallery */}
          <div className="aspect-square bg-[#1a1a1a] flex items-center justify-center p-2 md:p-4 border border-[#333] hover:border-gray-600 transition-colors cursor-pointer">
            <span className="text-lg md:text-xl font-light uppercase tracking-widest">Gallery</span>
          </div>

          {/* Downloads */}
          <div className="aspect-square bg-[#1a1a1a] flex items-center justify-center p-2 md:p-4 border border-[#333] hover:border-gray-600 transition-colors cursor-pointer">
            <span className="text-lg md:text-xl font-light uppercase tracking-widest">Downloads</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#333] px-4 md:px-8 lg:px-12 py-8 md:py-12 mt-8 md:mt-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-full mx-auto w-full">
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">EMAIL NEWSLETTER</h3>
            <p className="text-sm text-gray-400 mb-4">Get 10% off your first merchandise order.</p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="flex-1 bg-transparent border border-[#333] px-4 py-2 text-sm focus:outline-none focus:border-white"
              />
              <button
                type="submit"
                className="px-4 md:px-6 py-2 bg-white text-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors"
              >
                SUBMIT
              </button>
            </form>
          </div>

          {/* Mission */}
          <div>
            <h3 className="text-lg font-bold mb-4">MISSION</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Responsible Design</li>
              <li>Responsible Manufacture</li>
              <li>Creativity</li>
            </ul>
          </div>

          {/* Terms & Policy */}
          <div>
            <h3 className="text-lg font-bold mb-4">TERMS & POLICY</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Return Terms</li>
              <li>Privacy Policy</li>
              <li>Copyright</li>
            </ul>
          </div>

          {/* Contact */}
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
