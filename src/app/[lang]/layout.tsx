import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Logic des Audio | MIDI Audio Equipment",
  description:
    "Logic des Audio - Professional MIDI audio equipment brand. MIDI controllers, line controllers, and functional kits for music producers.",
  icons: {
    icon: "/lda-logo.png",
    apple: "/lda-logo.png",
  },
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLang = lang === "zh" ? "zh" : "en";
  return (
    <html lang={validLang}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <LanguageProvider lang={validLang}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
