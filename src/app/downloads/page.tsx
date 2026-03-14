"use client";

import Link from "next/link";

const downloads = [
  {
    product: "MS-3",
    files: [
      { name: "User Manual", size: "2.4 MB", type: "PDF" },
      { name: "Quick Start Guide", size: "1.1 MB", type: "PDF" },
      { name: "MIDI Implementation Chart", size: "256 KB", type: "PDF" },
      { name: "Preset List", size: "128 KB", type: "XLSX" },
    ]
  },
  {
    product: "LS-4p3",
    files: [
      { name: "User Manual", size: "2.8 MB", type: "PDF" },
      { name: "Quick Start Guide", size: "1.2 MB", type: "PDF" },
    ]
  },
  {
    product: "General",
    files: [
      { name: "Product Images (Press Kit)", size: "45 MB", type: "ZIP" },
      { name: "Brand Guidelines", size: "5.2 MB", type: "PDF" },
      { name: "MIDI Library", size: "12 MB", type: "ZIP" },
    ]
  }
];

export default function Downloads() {
  return (
    <main className="min-h-screen bg-[#131212] text-white w-full">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 md:px-12 py-4 border-b border-[#333] w-full">
        <Link href="/" className="text-xl font-bold tracking-widest">
          LdA
        </Link>
        <Link href="/downloads" className="text-sm uppercase tracking-widest text-gray-400">
          DOWNLOADS
        </Link>
      </nav>

      {/* Hero */}
      <section className="px-4 md:px-12 py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-4">
          DOWNLOADS
        </h1>
        <p className="text-gray-400 text-center max-w-2xl mx-auto">
          Manuals, guides, and resources for your LdA devices.
        </p>
      </section>

      {/* Downloads List */}
      <section className="px-4 md:px-12 pb-16 md:pb-24">
        {downloads.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-4">
              <span className="w-2 h-2 bg-green-500"></span>
              {section.product}
            </h2>
            <div className="space-y-2">
              {section.files.map((file, fileIndex) => (
                <div 
                  key={fileIndex}
                  className="bg-[#1a1a1a] border border-[#333] hover:border-gray-600 transition-colors p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl opacity-50">
                      {file.type === "PDF" ? "📄" : file.type === "ZIP" ? "📦" : "📊"}
                    </span>
                    <div>
                      <div className="font-medium">{file.name}</div>
                      <div className="text-xs text-gray-500">{file.type} · {file.size}</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-[#333] hover:border-white text-xs uppercase tracking-widest transition-colors">
                    DOWNLOAD
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="border-t border-[#333] px-4 md:px-12 py-8">
        <div className="text-center text-sm text-gray-500">
          ©2025 Logic des Audio
        </div>
      </footer>
    </main>
  );
}
