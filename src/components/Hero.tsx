import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ShieldCheck, ArrowRight, CheckCircle2, Factory, Zap, Clock, Award } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CONTACT_INFO } from '../data/contactConfig';
import { EditableImage } from './EditableImage';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger reveal animation for Hero elements
      const elements = [
        badgeRef.current,
        titleRef.current,
        headlineRef.current,
        ctaRef.current,
        imageCardRef.current
      ].filter(Boolean);

      gsap.from(elements, {
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const whatsappUrl = CONTACT_INFO.getWhatsAppUrl(
    'Olá! Preciso de um padrão de energia aprovado pela Equatorial Goiás e gostaria de um orçamento direto da fábrica Só Padrões em Goiânia.'
  );

  return (
    <section 
      ref={heroRef} 
      className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-slate-950 text-white"
    >
      {/* Clean industrial backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-slate-950 via-[#0a192f] to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(0,86,179,0.3),rgba(255,255,255,0))]" />
      </div>

      {/* Precision grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(#FFD700 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Semantic & Persuasive Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust badge */}
            <div 
              ref={badgeRef} 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-400/40 text-blue-200 text-xs font-semibold tracking-wide uppercase backdrop-blur-md shadow-sm"
            >
              <Factory className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>Direto da Fábrica em Goiânia</span>
              <span className="w-1 h-1 rounded-full bg-blue-400"></span>
              <span className="text-slate-300">Sem Intermediários</span>
            </div>

            {/* H1 Semantic SEO */}
            <h1 
              ref={titleRef} 
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15] drop-shadow-md"
            >
              Fábrica de Padrões de Energia em Goiânia: <br className="hidden sm:inline" />
              <span className="text-[#FFD700]">Economia Direta da Fábrica</span> e <span className="underline decoration-[#FFD700] decoration-4 underline-offset-4 text-blue-300">Aprovação Garantida</span>.
            </h1>

            {/* Persuasive Headline & Subheadline */}
            <div ref={headlineRef} className="space-y-3">
              <p className="font-heading text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700]"></span>
                A Segurança de quem Fabrica. A Precisão de quem Projeta.
              </p>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal drop-shadow-sm">
                Padrões monofásicos, trifásicos e conjuntos de medição agrupados em Goiânia, desenvolvidos sob medida e 100% em conformidade com as normas da <strong className="text-white font-semibold">Equatorial Goiás</strong>. Evite atrasos de ligação e reprovações na vistoria.
              </p>
            </div>

            {/* Quick value bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-200 font-medium">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pronta entrega em Goiânia e Região</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Normas NT-001 Equatorial 100% cumprida</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Caixas em Policarbonato Anti-UV e Aço</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Suporte técnico de engenharia com ART</span>
              </div>
            </div>

            {/* CTAs */}
            <div ref={ctaRef} className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                id="hero-whatsapp-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-base shadow-xl shadow-emerald-950/40 transition-all transform hover:-translate-y-0.5 active:scale-98 min-h-[52px]"
              >
                <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
                <span>Solicitar Orçamento via WhatsApp</span>
              </a>

              <a
                href="#produtos"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-base backdrop-blur-sm transition-all hover:border-[#FFD700] min-h-[52px]"
              >
                <span>Ver Catálogo Técnico</span>
                <ArrowRight className="w-4 h-4 text-[#FFD700]" />
              </a>
            </div>

            {/* Local Physical Address reminder */}
            <div className="pt-2 text-xs text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Retirada imediata na fábrica: <strong className="text-white">Av. Mangabeiras, 967 - Goiânia</strong> ou entrega no local da sua obra.</span>
            </div>

          </div>

          {/* Right Column: Industrial High-Tech Visual Mockup */}
          <div className="lg:col-span-5" ref={imageCardRef}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative engineering glow frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#0056b3] via-blue-500 to-[#FFD700] rounded-2xl opacity-50 blur-sm"></div>
              
              <div className="relative rounded-2xl bg-slate-900/90 backdrop-blur-md p-4 sm:p-5 shadow-2xl border border-white/20 overflow-hidden">
                
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="font-bold text-[#FFD700] uppercase tracking-wider">Fábrica & Loja Só Padrões</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-950/80 border border-blue-400/30 text-blue-200 text-[11px] font-semibold">
                    Sede Própria em Goiânia
                  </span>
                </div>

                {/* Visual Image Container with Photo Editor */}
                <div className="relative mt-3 rounded-xl overflow-hidden bg-slate-950 border border-white/10 aspect-[16/10]">
                  <EditableImage
                    slotId="hero_storefront"
                    alt="Fachada da loja e fábrica Só Padrões em Goiânia - Av. Mangabeiras, 967"
                    loading="eager"
                    className="w-full h-full"
                    imgClassName="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-2 left-2 right-2 z-20 pointer-events-none bg-slate-950/85 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">Av. Mangabeiras, 967</span>
                    <span className="text-emerald-400 font-bold">Atendimento Presencial</span>
                  </div>
                </div>

                {/* Micro tech specs bar under hero image */}
                <div className="mt-3.5 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <span className="block font-bold text-[#FFD700]">Direto da Fábrica</span>
                    <span className="text-[11px] text-slate-400">Sem Intermediários</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <span className="block font-bold text-blue-300">Pronta Entrega</span>
                    <span className="text-[11px] text-slate-400">Estoque Completo</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <span className="block font-bold text-emerald-400">Retirada Rápida</span>
                    <span className="text-[11px] text-slate-400">Estacionamento Fácil</span>
                  </div>
                </div>

                {/* Fast quotation CTA in card */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3.5 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0056b3] hover:bg-[#004494] text-white text-xs sm:text-sm font-bold transition-all border border-blue-400/40 shadow-md cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#FFD700]" />
                  <span>Falar com Atendimento da Loja</span>
                </a>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
