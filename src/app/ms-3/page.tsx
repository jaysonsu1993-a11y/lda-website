"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Ms3Product() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#131212] text-white w-full">
      {/* Top Banner */}
      <div className="bg-[#1a1a1a] text-center py-2 text-sm w-full">
        <a href="#" className="hover:underline">FREE worldwide shipping on orders over $200.</a>
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 md:px-8 lg:px-12 py-4 border-b border-[#333] w-full relative">
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

        <div className="hidden md:flex items-center gap-4 md:gap-8">
          <Link href="/" className="text-xs md:text-sm uppercase tracking-widest hover:text-gray-400">
            CATALOG
          </Link>
          <Link href="/store" className="text-xs md:text-sm uppercase tracking-widest hover:text-gray-400">
            STORE
          </Link>
          <Link href="/lab" className="text-xs md:text-sm uppercase tracking-widest hover:text-gray-400">
            LAB
          </Link>
        </div>
        
        <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
          <Image 
            src="/lda-logo.png" 
            alt="Logic des Audio" 
            width={120} 
            height={50}
            className="h-10 md:h-14 lg:h-16 w-auto object-contain"
          />
        </Link>
        
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

        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#1a1a1a] border-b border-[#333] py-4 md:hidden z-50">
            <div className="flex flex-col items-center gap-4">
              <Link href="/" className="text-xs uppercase tracking-widest hover:text-gray-400" onClick={() => setMobileMenuOpen(false)}>
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
            </div>
          </div>
        )}
      </nav>

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
              <h2 className="text-xl md:text-2xl text-gray-400 mb-6">MIDI SWITCHER</h2>
              
              <div className="inline-block bg-[#00d4ff] text-black px-4 py-2 text-sm font-bold mb-8">
                AVAILABLE NOW
              </div>
              
              <p className="text-gray-300 mb-8 text-lg">
                Professional MIDI switcher with 3 loops, 9 presets, and USB/MIDI connectivity.
                Perfect for controlling your entire pedalboard with a single device.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  href="/store" 
                  className="px-8 py-4 bg-white text-black font-bold text-center hover:bg-gray-200 transition-colors"
                >
                  BUY NOW — $299
                </Link>
                <Link 
                  href="/ms-3/editor" 
                  className="px-8 py-4 border border-[#00d4ff] text-[#00d4ff] font-bold text-center hover:bg-[#00d4ff] hover:text-black transition-colors"
                >
                  CONFIGURE
                </Link>
              </div>
              
              {/* Specs */}
              <div className="border-t border-[#333] pt-6">
                <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Loops</span>
                    <p className="text-white">3</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Presets</span>
                    <p className="text-white">9</p>
                  </div>
                  <div>
                    <span className="text-gray-500">MIDI Channels</span>
                    <p className="text-white">16</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Connectivity</span>
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
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">KEY FEATURES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-lg font-bold mb-2">3 Effect Loops</h3>
              <p className="text-gray-400">True bypass loops for your effects pedals</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💾</div>
              <h3 className="text-lg font-bold mb-2">9 Presets</h3>
              <p className="text-gray-400">Store and recall your favorite setups instantly</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎹</div>
              <h3 className="text-lg font-bold mb-2">MIDI Control</h3>
              <p className="text-gray-400">Full MIDI program change and CC control</p>
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
