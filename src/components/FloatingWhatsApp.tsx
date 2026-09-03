import React, { useState } from 'react';
import { X, Send, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SoPadroesLogo } from './SoPadroesLogo';
import { CONTACT_INFO } from '../data/contactConfig';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickMessages = [
    {
      title: '⚡ Padrão Residencial Monofásico',
      text: 'Olá! Gostaria de um orçamento para Padrão Monofásico homologado Equatorial Goiás em Goiânia.'
    },
    {
      title: '❄️ Padrão Bifásico (Para Ar-Condicionado)',
      text: 'Olá! Preciso de um Padrão Bifásico para suportar ar-condicionado na minha obra em Goiânia.'
    },
    {
      title: '🏢 Padrão Trifásico / Comercial',
      text: 'Olá! Preciso de um orçamento de Padrão Trifásico para empresa/residência de alto padrão em Goiânia.'
    },
    {
      title: '📍 Retirar na Fábrica (Av. Mangabeiras)',
      text: 'Olá! Gostaria de saber se posso retirar o padrão hoje na Av. Mangabeiras, 967 em Goiânia.'
    }
  ];

  const handleSend = (msg: string) => {
    const url = CONTACT_INFO.getWhatsAppUrl(msg);
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* WhatsApp Interactive Drawer / Quick Chat */}
      {isOpen && (
        <div className="mb-4 w-[340px] sm:w-[380px] rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-[#0056b3] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1 shadow-sm">
                <SoPadroesLogo variant="mark" size="sm" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm leading-tight">
                  Só Padrões • Fábrica Goiânia
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-blue-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>WhatsApp: {CONTACT_INFO.whatsappDisplay}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Fechar janela do WhatsApp"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3 text-xs text-slate-700">
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-sm leading-relaxed">
              👋 Olá! Bem-vindo à <strong>Só Padrões Goiânia</strong>. Escolha uma opção rápida ou envie sua dúvida direto para o nosso WhatsApp oficial:
            </div>

            <div className="space-y-1.5">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Selecione para iniciar no WhatsApp:
              </p>
              {quickMessages.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(item.text)}
                  className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-emerald-50 border border-slate-200 hover:border-[#25D366] text-slate-800 text-xs font-medium transition-colors flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{item.title}</span>
                  <WhatsAppIcon className="w-4 h-4 text-slate-400 group-hover:text-[#25D366] shrink-0 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer of popup */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Equatorial GO 100% Homologado
            </span>
            <a
              href={CONTACT_INFO.whatsappBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#25D366] hover:underline flex items-center gap-1"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              {CONTACT_INFO.whatsappDisplay}
            </a>
          </div>

        </div>
      )}

      {/* Floating Pulsing Trigger Button with WhatsApp Logo */}
      <button
        id="floating-whatsapp-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="pulse-whatsapp flex items-center justify-center gap-2.5 w-14 h-14 sm:w-auto sm:px-5 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold shadow-2xl transition-all transform hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Falar no WhatsApp com a Fábrica Só Padrões"
      >
        <WhatsAppIcon className="w-7 h-7 text-white shrink-0" />
        <span className="hidden sm:inline font-heading text-sm tracking-wide">
          Orçamento WhatsApp
        </span>
      </button>

    </div>
  );
};
