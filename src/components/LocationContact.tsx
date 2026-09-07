import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CONTACT_INFO } from '../data/contactConfig';
import { EditableImage } from './EditableImage';

export const LocationContact: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [standardType, setStandardType] = useState('Conjunto de Medição Agrupado');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá, meu nome é ${name}, tenho uma obra no bairro ${neighborhood || 'Goiânia'} e gostaria de cotar um padrão ${standardType} na Só Padrões.`;
    window.open(CONTACT_INFO.getWhatsAppUrl(msg), '_blank');
    setFormSent(true);
  };

  return (
    <section id="localizacao" className="py-20 bg-gradient-to-b from-[#D8DEE5] via-[#E4E9EE] to-[#CFD6DE] border-t border-slate-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0056b3] text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            Localização e Fábrica Própria
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#1E293B]">
            Ponto Estratégico em Goiânia para Retirada Imediata
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Estamos situados no coração de Goiânia com facilidade de acesso para construtoras, frotas e instaladores de toda a região metropolitana.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Strategic Address & Operational Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Storefront Card with Photo Editor */}
            <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm">
              <div className="relative aspect-[16/10] w-full">
                <EditableImage
                  slotId="location_facade"
                  alt="Sede física e fábrica da Só Padrões na Av. Mangabeiras, 967 em Goiânia"
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-2 left-2 z-20 pointer-events-none bg-slate-950/85 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-semibold text-white">
                  Fachada da Fábrica • Av. Mangabeiras, 967
                </div>
              </div>
            </div>

            {/* Main Physical Address Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0056b3] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Endereço da Fábrica:</span>
                  <h3 className="font-heading font-bold text-xl text-[#1E293B]">
                    Av. Mangabeiras, 967
                  </h3>
                  <p className="text-sm text-slate-600">
                    Goiânia - GO, CEP: 74500-000
                  </p>
                  <span className="inline-block mt-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Estacionamento próprio para carga e descarga
                  </span>
                </div>
              </div>

              {/* Direct Phone & WhatsApp */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#25D366] flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">WhatsApp Oficial Fábrica:</span>
                  <h4 className="font-heading font-extrabold text-2xl text-emerald-600">
                    <a
                      href={CONTACT_INFO.whatsappBaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-2"
                    >
                      {CONTACT_INFO.whatsappDisplay}
                    </a>
                  </h4>
                  <p className="text-xs text-slate-500">
                    Telefone Fixo: <a href="tel:6232969402" className="text-slate-700 font-semibold hover:underline">{CONTACT_INFO.phoneDisplay}</a>
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Horário de Expedição:</span>
                  <p className="text-sm font-semibold text-slate-800">
                    Segunda a Sexta: 07h30 às 18h00
                  </p>
                  <p className="text-xs text-slate-500">
                    Sábados: 08h00 às 12h00
                  </p>
                </div>
              </div>

              {/* Navigation Action */}
              <div className="pt-2">
                <a
                  href={CONTACT_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-300 hover:border-[#0056b3] text-slate-800 hover:text-[#0056b3] font-bold text-sm transition-all min-h-[48px]"
                >
                  <Navigation className="w-4 h-4 text-[#0056b3]" />
                  <span>Traçar Rota no Google Maps / Waze</span>
                </a>
              </div>

            </div>

            {/* Coverage badge */}
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700 space-y-1.5">
              <strong className="text-[#0056b3] font-bold block">Logística Ágil para Todo o Estado de Goiás:</strong>
              <p>
                Entregas rápidas nos principais bairros: Setor Bueno, Marista, Oeste, Sul, Jardim Goiás, Alphaville, Jardins, além de Aparecida de Goiânia, Senador Canedo e Trindade.
              </p>
            </div>

          </div>

          {/* Right Column: Direct Quick Quote Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0056b3]">
                Atendimento Imediato
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1E293B]">
                Solicite uma Cotação Rápida de Fábrica
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Preencha abaixo para falar diretamente com nosso especialista pelo WhatsApp com prioridade.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                  Seu Nome ou Nome da Construtora:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Mendes / Engenharia Construtora"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full py-3 px-4 rounded-xl border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-[#0056b3]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                    Bairro / Cidade da Obra:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Setor Bueno - Goiânia"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full py-3 px-4 rounded-xl border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-[#0056b3]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                    Tipo de Padrão Necessário:
                  </label>
                  <select
                    value={standardType}
                    onChange={(e) => setStandardType(e.target.value)}
                    className="w-full py-3 px-4 rounded-xl border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-[#0056b3]"
                  >
                    <option value="Monofásico">Monofásico (Residencial comum)</option>
                    <option value="Conjunto de Medição Agrupado">Conjunto de Medição Agrupado (Kitnets / Sobrados / Múltiplas caixas)</option>
                    <option value="Trifásico">Trifásico (Comércio / Alto padrão)</option>
                    <option value="Agrupamento Coletivo">Agrupamento Coletivo Modular (Prédio / Grandes Empreendimentos)</option>
                    <option value="Padrão Provisório de Obra">Padrão Provisório de Obra</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-base shadow-lg shadow-emerald-900/20 transition-all min-h-[52px] active:scale-98"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                  <span>Chamar no WhatsApp Fábrica: {CONTACT_INFO.whatsappDisplay}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[11px] text-slate-500 text-center">
                <span className="flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Sem compromisso
                </span>
                <span className="flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Resposta em até 5 min
                </span>
                <span className="flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Preço direto de fábrica
                </span>
              </div>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
