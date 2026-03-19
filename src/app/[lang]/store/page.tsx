"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

const products = [
  { id: "ms-3", name: "MS-3", category: "MIDI Switcher", price: "$299", status: "available", image: "/lda-logo.png", description: "3 loops, 9 presets, full MIDI control" },
  { id: "ls-4p3", name: "LS-4p3", category: "Loop Switcher", price: "$349", status: "coming", image: "/lda-logo.png", description: "4 loops, true bypass, expression control" },
];

export default function Store() {
  const { t } = useLanguage();
  const [cart, setCart] = useState<string[]>([]);

  const addToCart = (productId: string) => {
    if (!cart.includes(productId)) setCart([...cart, productId]);
  };

  return (
    <main className="min-h-screen bg-[#131212] text-white w-full">
      <Navigation />

      <section className="px-4 md:px-12 py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-4">{t.store.hero.title}</h1>
        <p className="text-gray-400 text-center max-w-2xl mx-auto">{t.store.hero.subtitle}</p>
      </section>

      <section className="px-4 md:px-12 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-[#1a1a1a] border border-[#333] hover:border-gray-600 transition-colors group">
              <div className="aspect-square bg-[#151515] flex items-center justify-center p-8 relative overflow-hidden">
                <div className="text-6xl font-bold text-[#333]">{product.name}</div>
                {product.status === "coming" && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="px-4 py-2 bg-gray-700 text-white text-xs uppercase tracking-widest">{t.store.product.comingSoon}</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{product.category}</p>
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">{product.price}</span>
                  {product.status === "available" ? (
                    <button onClick={() => addToCart(product.id)} className="px-6 py-2 bg-white text-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors">
                      {t.store.product.addToCart}
                    </button>
                  ) : (
                    <button disabled className="px-6 py-2 bg-[#333] text-gray-500 text-xs uppercase tracking-widest cursor-not-allowed">
                      {t.store.product.notifyMe}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-[#333] px-4 md:px-12 py-4 flex items-center justify-between">
          <span className="text-sm">{cart.length} {t.store.cart.items}</span>
          <button className="px-6 py-2 bg-white text-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors">
            {t.store.cart.checkout}
          </button>
        </div>
      )}

      <Footer />
    </main>
  );
}
