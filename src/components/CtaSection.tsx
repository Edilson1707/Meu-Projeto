import React from 'react';
import { Phone, Clock, ShieldCheck, Zap } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CONTACT_INFO } from '../data/contactConfig';

export const CtaSection: React.FC = () => {
  const whatsappUrl = CONTACT_INFO.getWhatsAppUrl(
    'Olá! Estou com urgência na minha obra em Goiânia e preciso de um padrão homologado pela Equatorial Goiás com pronta entrega da Só Padrões.'
  );

  return (
    <section className="py-20 bg-gradient-to-br from-[#0056b3] via-[#004494] to-slate-900 text-white relative overflow-hidden">
      {/* Precision background accents */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#FFD700 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFD700] text-xs font-bold uppercase tracking-wider">
          <Zap className="w-4 h-4 fill-[#FFD700]" />
          <span>Fábrica em Goiânia com Pronta Entrega</span>
        </div>

        {/* Persuasive Conversion Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
          Não Arrisque o Prazo da Sua Obra. <br className="hidden sm:inline" />
          <span className="text-[#FFD700]">Garanta a Aprovação Imediata</span> na Vistoria da Equatorial Goiás.
        </h2>

        <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Receba o padrão completo no canteiro da sua obra em Goiânia ou retire hoje mesmo na <strong className="text-white">Av. Mangabeiras, 967</strong> com preço direto da fábrica.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-extrabold text-base shadow-2xl transition-all transform hover:-translate-y-0.5 active:scale-98 min-h-[52px]"
          >
            <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
            <span>Solicitar Orçamento via WhatsApp</span>
          </a>

          <a
            href="tel:6232969402"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base backdrop-blur-sm transition-all min-h-[52px]"
          >
            <Phone className="w-5 h-5 text-[#FFD700]" />
            <span>Ligue: {CONTACT_INFO.phoneDisplay}</span>
          </a>
        </div>

        {/* Micro guarantees */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-blue-200">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#FFD700]" />
            100% Homologado NDU 001 Equatorial
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#FFD700]" />
            Expedição Rápida em até 24h
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#FFD700]" />
            Economia Direta da Fábrica
          </span>
        </div>

      </div>
    </section>
  );
};
