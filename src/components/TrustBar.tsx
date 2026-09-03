import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, CheckCircle, ShieldCheck, ThumbsUp, Building2, MapPin } from 'lucide-react';
import { GOOGLE_REVIEWS } from '../data/mockData';

gsap.registerPlugin(ScrollTrigger);

export const TrustBar: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsCounterRef = useRef<HTMLSpanElement>(null);
  const yearsCounterRef = useRef<HTMLSpanElement>(null);
  const approvalCounterRef = useRef<HTMLSpanElement>(null);
  const speedCounterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter 1: Projetos Aprovados (0 -> 4850)
      if (projectsCounterRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 4850,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            if (projectsCounterRef.current) {
              projectsCounterRef.current.textContent = `+${Math.floor(obj.val).toLocaleString('pt-BR')}`;
            }
          },
        });
      }

      // Counter 2: Anos de Mercado (0 -> 15)
      if (yearsCounterRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 15,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            if (yearsCounterRef.current) {
              yearsCounterRef.current.textContent = `+${Math.floor(obj.val)}`;
            }
          },
        });
      }

      // Counter 3: Taxa de Aprovação na 1ª Vistoria (0 -> 99.8)
      if (approvalCounterRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 99.8,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            if (approvalCounterRef.current) {
              approvalCounterRef.current.textContent = `${obj.val.toFixed(1)}%`;
            }
          },
        });
      }

      // Counter 4: Prazo de Pronta Entrega
      if (speedCounterRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 24,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            if (speedCounterRef.current) {
              speedCounterRef.current.textContent = `${Math.floor(obj.val)}h`;
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="border-y border-slate-300/80 bg-gradient-to-b from-[#D5DBE2] via-[#DFE4EA] to-[#D8DEE5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Numerical Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-slate-300/60">
          
          {/* Metric 1: Projetos Aprovados */}
          <div className="text-center p-4 rounded-xl bg-white/75 backdrop-blur-sm border border-slate-300/70 shadow-sm">
            <span
              ref={projectsCounterRef}
              className="block font-heading text-3xl sm:text-4xl font-extrabold text-[#0056b3]"
            >
              +0
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#1E293B] uppercase tracking-wider mt-1 block">
              Padrões Aprovados
            </span>
            <span className="text-xs text-slate-500">Sem retrabalho na Equatorial</span>
          </div>

          {/* Metric 2: Anos de Mercado */}
          <div className="text-center p-4 rounded-xl bg-white/75 backdrop-blur-sm border border-slate-300/70 shadow-sm">
            <span
              ref={yearsCounterRef}
              className="block font-heading text-3xl sm:text-4xl font-extrabold text-[#1E293B]"
            >
              +0
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#1E293B] uppercase tracking-wider mt-1 block">
              Anos de Mercado
            </span>
            <span className="text-xs text-slate-500">Fabricação própria em Goiânia</span>
          </div>

          {/* Metric 3: Taxa de Aprovação */}
          <div className="text-center p-4 rounded-xl bg-white/75 backdrop-blur-sm border border-slate-300/70 shadow-sm">
            <span
              ref={approvalCounterRef}
              className="block font-heading text-3xl sm:text-4xl font-extrabold text-emerald-600"
            >
              0%
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#1E293B] uppercase tracking-wider mt-1 block">
              Aprovação na 1ª Vistoria
            </span>
            <span className="text-xs text-slate-500">Garantia por escrito</span>
          </div>

          {/* Metric 4: Entrega Rápida */}
          <div className="text-center p-4 rounded-xl bg-white/75 backdrop-blur-sm border border-slate-300/70 shadow-sm">
            <span
              ref={speedCounterRef}
              className="block font-heading text-3xl sm:text-4xl font-extrabold text-[#0056b3]"
            >
              0h
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#1E293B] uppercase tracking-wider mt-1 block">
              Pronta Entrega
            </span>
            <span className="text-xs text-slate-500">Estoque de fábrica disponível</span>
          </div>

        </div>

        {/* Google Reviews Trust Section */}
        <div className="pt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-2">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>Avaliação Máxima no Google Meu Negócio</span>
              </div>
              <h2 className="text-2xl font-heading font-extrabold text-[#1E293B]">
                Aprovado por Engenheiros, Eletricistas e Construtores em Goiânia
              </h2>
              <p className="text-sm text-slate-600">
                Veja a experiência real de quem não pode perder prazo de ligação com a Equatorial Goiás.
              </p>
            </div>

            {/* Google rating overall badge */}
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-xl border border-slate-300/80 shrink-0 shadow-sm">
              <div className="text-right">
                <div className="flex items-center justify-end gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-500 block mt-0.5">
                  Classificação <strong>4.9 / 5.0</strong> Google Reviews
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm font-bold text-slate-800 text-lg">
                G
              </div>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GOOGLE_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="rounded-xl p-6 bg-white/85 backdrop-blur-sm border border-slate-300/80 hover:border-[#0056b3] transition-colors flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">{review.date}</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed italic mb-4">
                    "{review.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-[#1E293B]">{review.author}</h4>
                    <p className="text-slate-500">{review.role}</p>
                    <span className="text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {review.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 font-semibold text-[11px] bg-emerald-50 px-2 py-1 rounded">
                    <CheckCircle className="w-3 h-3" />
                    Verificado
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
