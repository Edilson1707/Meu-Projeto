import React from 'react';
import { Factory, ShieldCheck, Zap, DollarSign, Clock, Wrench, CheckCircle, FileBadge } from 'lucide-react';

export const Differentials: React.FC = () => {
  const differentialsList = [
    {
      icon: DollarSign,
      title: 'Economia Direta da Fábrica',
      description: 'Compre sem margem de lojas de varejo e intermediários. Economize até 30% no custo final do seu padrão montado e homologado.',
      highlight: 'Até 30% de Economia'
    },
    {
      icon: ShieldCheck,
      title: 'Aprovação Garantida Equatorial',
      description: 'Projetado e montado sob as diretrizes exatas das normas NT-001. Se houver qualquer divergência em vistoria por defeito de fábrica, substituímos imediatamente.',
      highlight: '100% de Garantia'
    },
    {
      icon: Clock,
      title: 'Agilidade Industrial (Pronta Entrega)',
      description: 'Estoque permanente dos principais modelos monofásicos, trifásicos e conjuntos de medição agrupados na Av. Mangabeiras, 967. Retire no mesmo dia ou receba na obra.',
      highlight: 'Retirada no Mesmo Dia'
    },
    {
      icon: Wrench,
      title: 'Materiais de Alta Precisão',
      description: 'Caixas de medição em policarbonato reforçado com proteção contra raios solares UV, barramentos de cobre puro e ferragens em aço galvanizado a fogo.',
      highlight: 'Durabilidade Superior'
    },
    {
      icon: FileBadge,
      title: 'Responsabilidade Técnica & ART',
      description: 'Corpo técnico especializado formado por engenheiros eletricistas. Oferecemos suporte completo com emissão de Anotação de Responsabilidade Técnica (ART).',
      highlight: 'Corpo de Engenharia'
    },
    {
      icon: Zap,
      title: 'Kit Completo e Pré-Crimpado',
      description: 'Você recebe o padrão pronto para fixar no poste ou muro: cabos dimensionados, terminais prensados, haste de aterramento e disjuntores calibrados.',
      highlight: 'Instalação Plug & Play'
    }
  ];

  return (
    <section id="diferenciais" className="py-20 bg-gradient-to-b from-[#D5DBE2] via-[#DFE4EB] to-[#D8DEE5] border-y border-slate-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0056b3] text-xs font-bold uppercase tracking-wider">
            <Factory className="w-3.5 h-3.5" />
            Engenharia de Precisão vs. Obras Comuns
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#1E293B]">
            Por que Profissionais e Construtoras em Goiânia Escolhem a Só Padrões
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Elimine o estresse de padrões improvisados em canteiro de obra. Produzimos em linha fabril padronizada para que a ligação da Equatorial ocorra na primeira visita.
          </p>
        </div>

        {/* 6 High-Precision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentialsList.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="rounded-2xl p-7 bg-white/85 backdrop-blur-sm border border-slate-300/80 hover:border-[#0056b3] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-[#0056b3] flex items-center justify-center shadow-sm group-hover:bg-[#0056b3] group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-[#0056b3] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                      {item.highlight}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-[#1E293B] mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Padrão de Fábrica Homologado</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Manufacturing precision statement */}
        <div className="mt-14 p-6 rounded-2xl bg-slate-900 text-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700]"></span>
              Atendimento Dedicado a Construtoras e Eletricistas
            </h4>
            <p className="text-xs text-slate-400">
              Cadastre sua construtora ou equipe de instalação elétrica e tenha condições de atacado para fornecimento contínuo.
            </p>
          </div>
          <a
            href="https://wa.me/556232969402?text=Ol%C3%A1!%20Sou%20engenheiro%2Fconstrutor%20e%20gostaria%20de%20condi%C3%A7%C3%B5es%20de%20atacado%20para%20fornecimento%20em%20obras."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded-xl bg-[#FFD700] hover:bg-[#F5CC00] text-[#1E293B] font-extrabold text-xs uppercase tracking-wider shadow transition-transform active:scale-95"
          >
            Falar com Gestor Comercial
          </a>
        </div>

      </div>
    </section>
  );
};
