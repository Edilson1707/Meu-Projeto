import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, ChevronRight, Check } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { EQUATORIAL_CHECKLIST } from '../data/mockData';
import { CONTACT_INFO } from '../data/contactConfig';

export const EquatorialCompliance: React.FC = () => {
  return (
    <section id="compliance" className="py-20 bg-gradient-to-b from-[#D8DEE5] via-[#E4E9EE] to-[#D5DBE2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            Conformidade Técnica Concessionária
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#1E293B]">
            Norma NDU 001 da Equatorial Goiás: Rigor que Evita Reprovações
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            A Equatorial Goiás possui critérios rigorosos de vistoria. Um erro de milímetros na altura da caixa ou uma haste mal conectada adia a ligação de energia da sua obra por semanas.
          </p>
        </div>

        {/* Side by side comparison: Riscos do Padrão Amador vs Padrão Só Padrões */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Card: Riscos de Montagem Amadora */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-red-200/80 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-red-950">
                  O Risco do Padrão Montado no Canteiro
                </h3>
                <span className="text-xs text-red-600 font-semibold">Erros comuns que atrasam a obra</span>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                <span><strong>Caixa não homologada:</strong> materiais de plástico comum ressecam no sol de Goiás e são vetados na vistoria.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                <span><strong>Fiação subdimensionada:</strong> cabos baratos superaquecem e são reprovados pelo fiscal.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                <span><strong>Aterramento incorreto:</strong> haste fora do padrão ou sem caixa de inspeção trava a ligação nova.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                <span><strong>Custo de revistoria:</strong> taxa cobrada pela concessionária e até 15 a 30 dias de atraso na entrega da obra.</span>
              </li>
            </ul>
          </div>

          {/* Card: Solução de Engenharia Só Padrões */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-emerald-300 shadow-md relative overflow-hidden ring-1 ring-emerald-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-emerald-950">
                  A Solução com a Só Padrões Goiânia
                </h3>
                <span className="text-xs text-emerald-600 font-semibold">Engenharia e tranquilidade total</span>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span><strong>100% Homologado:</strong> caixas em policarbonato com visor transparente anti-UV testadas em laboratório.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span><strong>Cabos 100% Cobre Puro:</strong> terminais ilhós prensados industrialmente com alicate pneumático.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span><strong>Kit Aterramento Completo:</strong> haste de 2,40m homologada, caixa de inspeção em PVC e tampa resistente.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span><strong>Aprovação Rápida na Equatorial:</strong> instalação aceita de primeira sem qualquer retrabalho.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Technical Checklist Grid */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-8">
            <div>
              <h3 className="font-heading font-bold text-xl text-[#1E293B]">
                Checklist Oficial de Vistoria Equatorial Goiás
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Itens inspecionados pelos técnicos e garantidos em todos os nossos modelos de fábrica.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-lg bg-blue-50 text-[#0056b3] text-xs font-bold font-mono">
              NDU 001 REV. 2024/2025
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EQUATORIAL_CHECKLIST.map((item, index) => (
              <div key={index} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#0056b3] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {index + 1}
                  </span>
                  <h4 className="font-bold text-sm text-[#1E293B]">{item.title}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-8">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Consultation CTA */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 text-center sm:text-left">
              Dúvidas sobre o tipo de entrada exigida para a sua rua ou condomínio em Goiânia?
            </div>
            <a
              href={CONTACT_INFO.getWhatsAppUrl("Olá! Gostaria de tirar uma dúvida técnica sobre as normas da Equatorial Goiás para minha obra com a Só Padrões.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-wider"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>Consultar Nossos Especialistas de Normas no WhatsApp</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
