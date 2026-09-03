import React, { useState } from 'react';
import { Calculator, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CONTACT_INFO } from '../data/contactConfig';

export const LoadCalculator: React.FC = () => {
  const [propertyType, setPropertyType] = useState<'residencial' | 'comercial' | 'industrial'>('residencial');
  const [showers, setShowers] = useState<number>(1);
  const [acUnits, setAcUnits] = useState<number>(1);
  const [hasHeavyLoads, setHasHeavyLoads] = useState<boolean>(false);
  const [solarPanels, setSolarPanels] = useState<boolean>(false);

  // Recommendation logic based on typical Goiânia load standards (normas NT-001)
  const getRecommendation = () => {
    if (propertyType === 'industrial' || hasHeavyLoads || acUnits >= 4 || showers >= 3) {
      return {
        type: 'Trifásico (normas NT-001 Tipo T-3)',
        voltage: '220V / 380V Trifásico',
        breaker: 'Disjuntor de 63A a 100A DIN / Caixa Moldada',
        power: 'Acima de 25 kW a 75 kW',
        description: 'Ideal para suportar múltiplos aparelhos simultâneos, piscina aquecida, usina solar e evitar quedas de disjuntor.',
        box: 'Caixa de Policarbonato Trifásica Homologada Equatorial GO',
        whatsappText: `Olá! Fiz a simulação no site da Só Padrões: Meu imóvel precisa de um PADRÃO TRIFÁSICO (${acUnits} ares-condicionados, ${showers} chuveiros). Gostaria de um orçamento para Goiânia!`
      };
    } else if (propertyType === 'comercial' || acUnits >= 2 || showers >= 2 || solarPanels) {
      return {
        type: 'Conjunto de Medição Agrupado',
        voltage: '220V / 380V Trifásico com Derivações',
        breaker: 'Disjuntores Individuais + Proteção Geral',
        power: 'Dimensionado conforme quantidade de unidades',
        description: 'Ideal para kitnets, sobrados, galerias e imóveis com múltiplas unidades consumidoras ou medições individuais.',
        box: 'Conjunto de Caixas em Policarbonato Homologadas Equatorial GO',
        whatsappText: `Olá! Fiz a simulação no site da Só Padrões: Meu imóvel necessita de um CONJUNTO DE MEDIÇÃO AGRUPADO (${acUnits} ares-condicionados, ${showers} chuveiros). Gostaria de saber preço e prazo de fabricação!`
      };
    } else {
      return {
        type: 'Monofásico (normas NT-001 Tipo M-1)',
        voltage: '220V Fase + Neutro',
        breaker: 'Disjuntor de 40A a 63A DIN',
        power: 'Até 10 kW',
        description: 'Perfeito para casas padrão, kitnets, padrões provisórios de obra ou reformas com carga essencial.',
        box: 'Caixa de Policarbonato Monofásica Homologada Equatorial GO',
        whatsappText: `Olá! Fiz a simulação no site da Só Padrões: Preciso de um PADRÃO MONOFÁSICO para minha obra em Goiânia. Qual o valor e prazo de entrega?`
      };
    }
  };

  const rec = getRecommendation();

  return (
    <section id="simulador" className="py-20 bg-gradient-to-b from-[#D5DBE2] via-[#DFE4EB] to-[#D8DEE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-gradient-to-br from-[#1E293B] to-slate-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Subtle accent light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0056b3]/30 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Form Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-xs font-bold uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5" />
                Simulador Inteligente de Carga
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                  Não Sabe Qual Padrão Comprar? Descubra em 30 Segundos.
                </h3>
                <p className="text-sm text-slate-300 mt-2">
                  Selecione as características do seu imóvel para calcular a recomendação técnica de acordo com o memorial da Equatorial Goiás.
                </p>
              </div>

              {/* Step 1: Property Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  1. Tipo de Imóvel:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['residencial', 'comercial', 'industrial'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setPropertyType(t)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] ${
                        propertyType === t
                          ? 'bg-[#0056b3] text-white ring-2 ring-[#FFD700]'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Showers & ACs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    2. Chuveiros Elétricos simultâneos:
                  </label>
                  <select
                    value={showers}
                    onChange={(e) => setShowers(Number(e.target.value))}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0056b3]"
                  >
                    <option value={0}>Nenhum chuveiro elétrico</option>
                    <option value={1}>1 Chuveiro (até 5.500W)</option>
                    <option value={2}>2 Chuveiros simultâneos</option>
                    <option value={3}>3 ou mais Chuveiros</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    3. Aparelhos de Ar-Condicionado:
                  </label>
                  <select
                    value={acUnits}
                    onChange={(e) => setAcUnits(Number(e.target.value))}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0056b3]"
                  >
                    <option value={0}>Nenhum</option>
                    <option value={1}>1 Aparelho (9k a 12k BTUs)</option>
                    <option value={2}>2 a 3 Aparelhos</option>
                    <option value={4}>4 ou mais Aparelhos / Inverter</option>
                  </select>
                </div>
              </div>

              {/* Step 3: Checkboxes */}
              <div className="space-y-3 pt-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  4. Equipamentos Especiais:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={hasHeavyLoads}
                      onChange={(e) => setHasHeavyLoads(e.target.checked)}
                      className="rounded border-slate-600 text-[#0056b3] focus:ring-[#0056b3] w-4 h-4"
                    />
                    <span>Piscina, Carro Elétrico ou Motor</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={solarPanels}
                      onChange={(e) => setSolarPanels(e.target.checked)}
                      className="rounded border-slate-600 text-[#0056b3] focus:ring-[#0056b3] w-4 h-4"
                    />
                    <span>Sistema de Energia Solar (Inversor)</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Right Column: Dynamic Recommendation Result */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-white text-slate-900 p-6 sm:p-7 shadow-xl border-2 border-[#FFD700] relative">
                <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-[#FFD700] text-[#1E293B] text-[11px] font-extrabold uppercase tracking-wider shadow">
                  Recomendação Técnica
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-mono text-[#0056b3] font-bold uppercase tracking-wider">
                      Modelo Sugerido
                    </span>
                    <h4 className="text-2xl font-heading font-extrabold text-[#1E293B]">
                      {rec.type}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{rec.voltage}</p>
                  </div>

                  <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Disjuntor Recomendado:</span>
                      <strong className="text-slate-800">{rec.breaker}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Potência Estimada:</span>
                      <strong className="text-[#0056b3]">{rec.power}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Caixa Padrão:</span>
                      <strong className="text-slate-800 truncate max-w-[170px]">{rec.box}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {rec.description}
                  </p>

                  <a
                    href={CONTACT_INFO.getWhatsAppUrl(rec.whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm shadow-md transition-all active:scale-98 min-h-[48px]"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>Enviar Este Dimensionamento no WhatsApp</span>
                  </a>

                  <p className="text-[11px] text-center text-slate-400">
                    Atendimento imediato por engenheiro da fábrica em Goiânia.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
