"use client";

import Link from "next/link";
import { useLanguage, useLocalizedPath } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const path = useLocalizedPath();

  return (
    <footer className="border-t border-[#333] px-4 md:px-12 py-8 md:py-12 mt-8 md:mt-12 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-full mx-auto w-full">
        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-4">{t.footer.newsletter.title}</h3>
          <p className="text-sm text-gray-400 mb-4">{t.footer.newsletter.subtitle}</p>
          <form className="flex" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={t.footer.newsletter.placeholder}
              className="flex-1 bg-transparent border border-[#333] px-4 py-2 text-sm focus:outline-none focus:border-white"
            />
            <button
              type="submit"
              className="px-4 md:px-6 py-2 bg-white text-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors"
            >
              {t.footer.newsletter.submit}
            </button>
          </form>
        </div>

        {/* Mission */}
        <div>
          <h3 className="text-lg font-bold mb-4">{t.footer.mission.title}</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>{t.footer.mission.design}</li>
            <li>{t.footer.mission.manufacture}</li>
            <li>{t.footer.mission.creativity}</li>
          </ul>
        </div>

        {/* Terms & Policy */}
        <div>
          <h3 className="text-lg font-bold mb-4">{t.footer.terms.title}</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href={path("/terms")} className="hover:text-white transition-colors">{t.footer.terms.return}</Link></li>
            <li><Link href={path("/privacy")} className="hover:text-white transition-colors">{t.footer.terms.privacy}</Link></li>
            <li>{t.footer.terms.copyright}</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold mb-4">{t.footer.contact.title}</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{t.footer.contact.youtube}</a></li>
            <li><a href="mailto:hello@logicdesaudio.com" className="hover:text-white transition-colors">{t.footer.contact.email}</a></li>
            <li>{t.footer.contact.wechat}</li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{t.footer.contact.instagram}</a></li>
            <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{t.footer.contact.tiktok}</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8 md:mt-12 text-sm text-gray-500">
        {t.footer.copyright}
        <br />
        <span className="text-xs">粤ICP备2025509252号-1</span>
      </div>
    </footer>
  );
}
