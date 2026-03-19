"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import en from "@/i18n/en.json";
import zh from "@/i18n/zh.json";

type Lang = "en" | "zh";
type Translations = typeof en;

const dictionaries: Record<Lang, Translations> = { en, zh };

interface LanguageContextValue {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const [currentLang, setCurrentLang] = useState<Lang>(lang);

  // Persist language preference in localStorage
  useEffect(() => {
    const stored = localStorage.getItem("lda-lang") as Lang | null;
    if (stored && (stored === "en" || stored === "zh")) {
      setCurrentLang(stored);
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setCurrentLang(l);
    localStorage.setItem("lda-lang", l);
  }, []);

  const toggleLang = useCallback(() => {
    const next = currentLang === "en" ? "zh" : "en";
    setLang(next);
  }, [currentLang, setLang]);

  return (
    <LanguageContext.Provider
      value={{ lang: currentLang, t: dictionaries[currentLang], setLang, toggleLang }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

// Helper: get path prefixed with current language
export function useLocalizedPath() {
  const { lang } = useLanguage();
  return (path: string) => `/${lang}${path}`;
}
