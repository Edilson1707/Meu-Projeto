import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ShieldCheck, ArrowRight, CheckCircle2, Factory, Zap, Clock, Award, Camera, Upload, RefreshCw } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CONTACT_INFO } from '../data/contactConfig';
import heroImageDefault from '../assets/images/fachada_loja_sopadroes_1788449498232.jpg';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [photoSrc, setPhotoSrc] = useState<string>(() => {
    return localStorage.getItem('sopadroes_original_photo') || heroImageDefault;
  });
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setPhotoSrc(dataUrl);
        try {
          localStorage.setItem('sopadroes_original_photo', dataUrl);
        } catch (err) {
          console.warn('LocalStorage limit exceeded', err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger reveal animation for Hero elements as requested
      const elements = [
        badgeRef.current,
        titleRef.current,
        headlineRef.current,
        ctaRef.current,
        imageCardRef.current
      ].filter(Boolean);

      gsap.from(elements, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const whatsappUrl = CONTACT_INFO.getWhatsAppUrl(
    'Olá! Preciso de um padrão de energia aprovado pela Equatorial Goiás e gostaria de um orçamento direto da fábrica Só Padrões em Goiânia.'
  );

  return (
    <section ref={heroRef} className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#DCE1E7] via-[#E6EBF0] to-[#D5DBE2]">
      {/* Precision grid pattern background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(#0056b3 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Semantic & Persuasive Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust badge */}
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0056b3] text-xs font-semibold tracking-wide uppercase">
              <Factory className="w-3.5 h-3.5 text-[#0056b3]" />
              <span>Direto da Fábrica em Goiânia</span>
              <span className="w-1 h-1 rounded-full bg-blue-400"></span>
              <span className="text-slate-600">Sem Intermediários</span>
            </div>

            {/* H1 Semantic SEO */}
            <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1E293B] leading-[1.15]">
              Fábrica de Padrões de Energia em Goiânia: <br className="hidden sm:inline" />
              <span className="text-[#0056b3]">Economia Direta da Fábrica</span> e <span className="underline decoration-[#FFD700] decoration-4 underline-offset-4">Aprovação Garantida</span>.
            </h1>

            {/* Persuasive Headline & Subheadline */}
            <div ref={headlineRef} className="space-y-3">
              <p className="font-heading text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700]"></span>
                A Segurança de quem Fabrica. A Precisão de quem Projeta.
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                Padrões monofásicos, bifásicos e trifásicos em Goiânia, desenvolvidos sob medida e 100% em conformidade com as normas da <strong className="text-slate-900 font-semibold">Equatorial Goiás</strong>. Evite atrasos de ligação e reprovações na vistoria.
              </p>
            </div>

            {/* Quick value bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pronta entrega em Goiânia e Região</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Norma NDU-001 Equatorial 100% cumprida</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Caixas em Policarbonato Anti-UV e Aço</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
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
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-base shadow-xl shadow-emerald-900/25 transition-all transform hover:-translate-y-0.5 active:scale-98 min-h-[52px]"
              >
                <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
                <span>Solicitar Orçamento via WhatsApp</span>
              </a>

              <a
                href="#produtos"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-base transition-all hover:border-[#0056b3] min-h-[52px]"
              >
                <span>Ver Catálogo Técnico</span>
                <ArrowRight className="w-4 h-4 text-[#0056b3]" />
              </a>
            </div>

            {/* Local Physical Address reminder */}
            <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Retirada imediata na fábrica: <strong>Av. Mangabeiras, 967 - Goiânia</strong> ou entrega no local da sua obra.</span>
            </div>

          </div>

          {/* Right Column: Industrial High-Tech Visual Mockup */}
          <div className="lg:col-span-5" ref={imageCardRef}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative engineering frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#0056b3] via-blue-600 to-[#FFD700] rounded-2xl opacity-30 blur-sm"></div>
              
              <div className="relative rounded-2xl bg-white p-3 shadow-2xl border border-slate-200 overflow-hidden">
                
                {/* Visual Image Container */}
                <div 
                  className={`relative rounded-xl overflow-hidden bg-slate-900 group cursor-pointer transition-all ${isDragOver ? 'ring-4 ring-[#0056b3] ring-offset-2' : ''}`}
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  title="Clique para carregar a foto original exata do seu dispositivo"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileSelect(e.target.files[0]);
                      }
                    }}
                  />

                  {/* Real Photo Element - clean, un-darkened, full natural clarity */}
                  <img
                    src={photoSrc}
                    alt="Fachada da loja e fábrica Só Padrões em Goiânia"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[580px] object-cover object-top"
                    loading="eager"
                  />

                  {/* Clean controls for uploading/restoring the original photo */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0056b3] hover:bg-[#004494] text-white text-xs font-bold shadow-lg transition-all border border-blue-400 cursor-pointer"
                      title="Selecione o arquivo 'WhatsApp Image...' do seu dispositivo"
                    >
                      <Camera className="w-4 h-4 text-[#FFD700]" />
                      <span>Usar Foto Original Enviada</span>
                    </button>
                    {localStorage.getItem('sopadroes_original_photo') && (
                      <button
                        type="button"
                        onClick={() => {
                          localStorage.removeItem('sopadroes_original_photo');
                          setPhotoSrc(heroImageDefault);
                        }}
                        className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-600 hover:text-red-600 shadow transition-all cursor-pointer"
                        title="Restaurar padrão"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Subtle hover guide overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 backdrop-blur-sm p-2 text-center text-xs text-white opacity-90 group-hover:opacity-100 transition-opacity">
                    <p className="flex items-center justify-center gap-1.5 font-medium">
                      <Upload className="w-3.5 h-3.5 text-[#FFD700]" />
                      <span>Clique na foto para selecionar o arquivo original <strong>WhatsApp Image</strong></span>
                    </p>
                  </div>
                </div>

                {/* Micro tech specs bar under hero image */}
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="block font-bold text-slate-900">Norma NDU-001</span>
                    <span className="text-[11px] text-slate-500">Equatorial Goiás</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="block font-bold text-[#0056b3]">Aço Galvanizado</span>
                    <span className="text-[11px] text-slate-500">Anti-Corrosão</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="block font-bold text-emerald-600">24h Pronta</span>
                    <span className="text-[11px] text-slate-500">Entrega Goiânia</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
