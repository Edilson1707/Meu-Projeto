import React, { useState } from 'react';
import { Phone, Menu, X, ShieldCheck } from 'lucide-react';
import { SoPadroesLogo } from './SoPadroesLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CONTACT_INFO } from '../data/contactConfig';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const phoneDisplay = CONTACT_INFO.phoneDisplay;
  const whatsappUrl = CONTACT_INFO.getWhatsAppUrl(
    'Olá! Gostaria de solicitar um orçamento de padrão de energia direto da fábrica em Goiânia.'
  );

  return (
    <header className="sticky top-0 z-50 w-full glass-header border-b border-slate-300/90 transition-all shadow-sm">
      {/* Top micro-bar for factory status */}
      <div className="bg-[#1E293B] text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#FFD700] animate-pulse"></span>
            <span className="font-medium text-slate-200">Fábrica Aberta em Goiânia:</span>
            <span>Av. Mangabeiras, 967 • Pronta Entrega para toda Região Metropolitana</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-[#FFD700]">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Homologado Equatorial Goiás (NDU-001)
            </span>
            <a href="tel:6232969402" className="hover:text-white font-semibold transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#FFD700]" />
              {phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo - Só Padrões */}
          <a href="#" className="flex items-center group focus:outline-none" aria-label="Só Padrões Goiânia - Início">
            <SoPadroesLogo size="md" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#1E293B]">
            <a href="#produtos" className="hover:text-[#0056b3] transition-colors py-2">
              Produtos & Modelos
            </a>
            <a href="#diferenciais" className="hover:text-[#0056b3] transition-colors py-2">
              Diferenciais de Fábrica
            </a>
            <a href="#compliance" className="hover:text-[#0056b3] transition-colors py-2">
              Normas Equatorial
            </a>
            <a href="#simulador" className="hover:text-[#0056b3] transition-colors py-2">
              Simulador Técnico
            </a>
            <a href="#localizacao" className="hover:text-[#0056b3] transition-colors py-2">
              Localização
            </a>
          </nav>

          {/* Direct CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="tel:6232969402"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-slate-300 hover:border-[#0056b3] text-slate-700 hover:text-[#0056b3] text-sm font-semibold transition-all whitespace-nowrap shrink-0"
              title="Ligar para a fábrica em Goiânia"
            >
              <Phone className="w-4 h-4 text-[#0056b3] shrink-0" />
              <span className="whitespace-nowrap">{phoneDisplay}</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-sm shadow-md shadow-emerald-900/20 transition-all transform active:scale-95 whitespace-nowrap shrink-0"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span className="whitespace-nowrap">Orçamento via WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center p-3 rounded-lg text-slate-700 hover:text-[#0056b3] hover:bg-slate-100 min-w-[48px] min-h-[48px] focus:outline-none focus:ring-2 focus:ring-[#0056b3]"
            aria-label="Abrir Menu de Navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-2 text-base font-semibold text-slate-800">
            <a
              href="#produtos"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-md hover:bg-slate-100 transition-colors"
            >
              Padrões & Modelos Homologados
            </a>
            <a
              href="#diferenciais"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-md hover:bg-slate-100 transition-colors"
            >
              Por que Comprar da Fábrica
            </a>
            <a
              href="#compliance"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-md hover:bg-slate-100 transition-colors"
            >
              Normas Técnicas Equatorial GO
            </a>
            <a
              href="#simulador"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-md hover:bg-slate-100 transition-colors"
            >
              Simulador de Carga
            </a>
            <a
              href="#localizacao"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-md hover:bg-slate-100 transition-colors"
            >
              Fábrica: Av. Mangabeiras, 967
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <a
              href="tel:6232969402"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-slate-300 text-slate-800 font-semibold min-h-[48px]"
            >
              <Phone className="w-5 h-5 text-[#0056b3]" />
              Ligar Agora: (62) 3296-9402
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold min-h-[48px] shadow"
            >
              <WhatsAppIcon className="w-5 h-5 text-white" />
              Pedir Orçamento WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
