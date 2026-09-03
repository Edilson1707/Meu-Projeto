import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { ProductsGrid } from './components/ProductsGrid';
import { Differentials } from './components/Differentials';
import { EquatorialCompliance } from './components/EquatorialCompliance';
import { LoadCalculator } from './components/LoadCalculator';
import { LocationContact } from './components/LocationContact';
import { CtaSection } from './components/CtaSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#DCE1E7] via-[#E6EBF0] to-[#D5DBE2] text-[#1E293B] font-body selection:bg-[#0056b3] selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section (Impact, H1, Headline, GSAP Reveal) */}
        <Hero />

        {/* 2. TrustBar (Google Reviews & GSAP ScrollTrigger Counters) */}
        <TrustBar />

        {/* 3. Products Technical Grid (Monofásico, Bifásico, Trifásico, GSAP Scale-up) */}
        <ProductsGrid />

        {/* 4. Differentials of Factory Engineering (Autoridade & Economia) */}
        <Differentials />

        {/* 5. Equatorial Goiás Technical Compliance (NDU-001) */}
        <EquatorialCompliance />

        {/* 6. Interactive Load Calculator & WhatsApp Generator */}
        <LoadCalculator />

        {/* 7. Strategic Location (Av. Mangabeiras, 967) & Phone (62 3296-9402) */}
        <LocationContact />

        {/* 8. Conversion CTA Section */}
        <CtaSection />
      </main>

      {/* Persistent Pulsing WhatsApp Floating CTA */}
      <FloatingWhatsApp />

      {/* Clean Technical Footer */}
      <Footer />
    </div>
  );
}
