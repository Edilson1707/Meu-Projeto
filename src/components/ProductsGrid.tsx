import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Check, Info, ShieldAlert, Cpu, ArrowUpRight, X, Droplets, MapPin, Sparkles, SlidersHorizontal } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { PRODUCTS } from '../data/mockData';
import { ProductSpec } from '../types';
import { CONTACT_INFO } from '../data/contactConfig';

gsap.registerPlugin(ScrollTrigger);

export const ProductsGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductSpec | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'energia' | 'saneago' | 'endereco'>('all');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'energia') return p.category === 'monofasico' || p.category === 'bifasico' || p.category === 'trifasico' || p.category === 'agrupamento';
    if (activeTab === 'saneago') return p.category === 'saneago';
    if (activeTab === 'endereco') return p.category === 'endereco';
    return true;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ScrollTrigger scale-up animation for products
      const cards = gsap.utils.toArray<HTMLElement>('.product-card');

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            scale: 0.95,
            opacity: 0.85,
            y: 24,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              end: 'top 60%',
              scrub: 0.5,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

  const handleOrderWhatsApp = (productName: string) => {
    const message = `Olá! Estou no site da Só Padrões e tenho interesse no item: ${productName}. Gostaria de confirmar valores e prazo para entrega em Goiânia.`;
    window.open(CONTACT_INFO.getWhatsAppUrl(message), '_blank');
  };

  const renderCardSpecs = (prod: ProductSpec) => {
    if (prod.category === 'saneago') {
      return (
        <div className="space-y-2.5 text-xs text-slate-700">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Rede / Utilidade:</span>
            <span className="font-bold text-[#1E293B]">{prod.voltage}</span>
          </div>
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Capacidade:</span>
            <span className="font-bold text-[#0056b3]">{prod.maxPower}</span>
          </div>
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Conexões:</span>
            <span className="font-bold text-slate-900">{prod.currentRange}</span>
          </div>
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Material da Caixa:</span>
            <span className="font-semibold text-slate-700 truncate max-w-[150px] text-right" title={prod.boxType}>
              {prod.boxType}
            </span>
          </div>
        </div>
      );
    }

    if (prod.category === 'endereco') {
      return (
        <div className="space-y-2.5 text-xs text-slate-700">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Identificação:</span>
            <span className="font-bold text-[#1E293B]">{prod.voltage}</span>
          </div>
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Durabilidade:</span>
            <span className="font-bold text-[#0056b3]">{prod.maxPower}</span>
          </div>
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Personalização:</span>
            <span className="font-bold text-slate-900">{prod.currentRange}</span>
          </div>
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Acabamento:</span>
            <span className="font-semibold text-slate-700 truncate max-w-[150px] text-right" title={prod.boxType}>
              {prod.boxType}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-2.5 text-xs text-slate-700">
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
          <span className="text-slate-500 font-medium">Tensão Operacional:</span>
          <span className="font-bold text-[#1E293B]">{prod.voltage}</span>
        </div>
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
          <span className="text-slate-500 font-medium">Carga Máxima:</span>
          <span className="font-bold text-[#0056b3]">{prod.maxPower}</span>
        </div>
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
          <span className="text-slate-500 font-medium">Disjuntor Entrada:</span>
          <span className="font-bold text-slate-900">{prod.currentRange}</span>
        </div>
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
          <span className="text-slate-500 font-medium">Caixa / Visor:</span>
          <span className="font-semibold text-slate-700 truncate max-w-[150px] text-right" title={prod.boxType}>
            {prod.boxType}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section id="produtos" ref={containerRef} className="py-20 bg-gradient-to-b from-[#D8DEE5] via-[#E4E9EE] to-[#D5DBE2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0056b3] text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            Catálogo Completo de Fábrica
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#1E293B]">
            Padrões Elétricos, Caixas Saneago & Placas de Endereço
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Linha completa fabricada com materiais de alta resistência, pronta entrega em Goiânia e 100% de conformidade técnica com a <strong className="text-[#0056b3]">Equatorial Goiás</strong> e a <strong className="text-[#0056b3]">SANEAGO</strong>.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#0056b3] text-white shadow-md shadow-blue-900/20'
                : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Todos os Produtos ({PRODUCTS.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('energia')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'energia'
                ? 'bg-[#0056b3] text-white shadow-md shadow-blue-900/20'
                : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Padrões Equatorial Goiás
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('saneago')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'saneago'
                ? 'bg-[#0056b3] text-white shadow-md shadow-blue-900/20'
                : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200'
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-cyan-600" />
            Caixa de Hidrômetro SANEAGO
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('endereco')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'endereco'
                ? 'bg-[#0056b3] text-white shadow-md shadow-blue-900/20'
                : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            Placas de Endereço & Fachada
          </button>
        </div>

        {/* Products Technical Grid - 3 columns for balanced 6 products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className={`product-card rounded-2xl bg-white border ${
                prod.popular ? 'border-[#0056b3] shadow-xl shadow-blue-900/10 ring-2 ring-[#0056b3]/20' : 'border-slate-200 shadow-md'
              } flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-[#0056b3] relative group`}
            >
              {/* Product Top Image & Badge */}
              <div className="relative h-52 overflow-hidden bg-slate-900">
                <img
                  src={prod.image}
                  alt={prod.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none"></div>

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow ${
                      prod.category === 'saneago'
                        ? 'bg-cyan-500 text-white'
                        : prod.category === 'endereco'
                        ? 'bg-slate-900 text-[#FFD700] border border-[#FFD700]/30'
                        : prod.popular
                        ? 'bg-[#FFD700] text-[#1E293B]'
                        : 'bg-white/95 text-[#0056b3] backdrop-blur-sm'
                    }`}
                  >
                    {prod.badge}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-mono text-[#FFD700] uppercase tracking-wider block">
                    {prod.normCode}
                  </span>
                  <h3 className="font-heading font-extrabold text-lg leading-tight text-white">
                    {prod.name}
                  </h3>
                </div>
              </div>

              {/* Technical Specifications Specs Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                
                {/* Tech Highlights with Context-Aware Fields */}
                {renderCardSpecs(prod)}

                {/* Practical Recommendation */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800 block mb-0.5">Aplicação Ideal:</span>
                  <p className="line-clamp-2 leading-relaxed">{prod.recommendedFor}</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={() => handleOrderWhatsApp(prod.name)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm shadow-md transition-all min-h-[48px] active:scale-98 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    Cotar via WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedProduct(prod)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-200 hover:border-[#0056b3] text-slate-700 hover:text-[#0056b3] text-xs font-semibold transition-colors min-h-[40px] cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    Ficha Técnica Completa
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Notice of special custom projects */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-900 to-[#0056b3] p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded bg-[#FFD700] text-[#1E293B] text-xs font-extrabold uppercase">
              Soluções Completas para sua Obra
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold">
              Precisa de Padrão Elétrico, Caixa de Hidrômetro e Placa de Endereço em um só pedido?
            </h3>
            <p className="text-sm text-blue-100 max-w-2xl">
              Economize no frete e unifique a entrada da sua obra. Fornecemos o kit completo homologado pela Equatorial Goiás e SANEAGO, com placas de endereço sob medida para identificação da sua fachada.
            </p>
          </div>

          <a
            href={CONTACT_INFO.getWhatsAppUrl("Olá! Gostaria de cotar um kit completo para minha obra com padrão de energia, caixa de hidrômetro SANEAGO e placa de endereço.")}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#0056b3] font-bold text-sm shadow-md transition-all min-h-[48px] flex items-center gap-2"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            Cotar Kit Completo
          </a>
        </div>

      </div>

      {/* Technical Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#0056b3] text-white p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#FFD700] uppercase tracking-wider block">
                  {selectedProduct.normCode}
                </span>
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl">
                  {selectedProduct.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white min-w-[40px] min-h-[40px] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Fechar ficha técnica"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Photo Preview */}
            <div className="relative h-48 bg-slate-900 border-b border-slate-200 overflow-hidden">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Modal Specs Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6 text-sm text-slate-700">
              <div>
                <h4 className="font-heading font-bold text-base text-[#1E293B] mb-2 flex items-center gap-2">
                  {selectedProduct.category === 'saneago' ? (
                    <Droplets className="w-4 h-4 text-cyan-600" />
                  ) : selectedProduct.category === 'endereco' ? (
                    <MapPin className="w-4 h-4 text-rose-500" />
                  ) : (
                    <Zap className="w-4 h-4 text-[#0056b3]" />
                  )}
                  {selectedProduct.category === 'saneago'
                    ? 'Especificações Técnicas do Padrão de Água SANEAGO'
                    : selectedProduct.category === 'endereco'
                    ? 'Especificações Técnicas da Placa de Endereço'
                    : 'Especificações Elétricas e Mecânicas'}
                </h4>

                {selectedProduct.category === 'saneago' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-xs text-slate-500 block">Rede / Concessionária:</span>
                      <strong className="text-slate-900">{selectedProduct.voltage}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Capacidade / Aplicação:</span>
                      <strong className="text-[#0056b3]">{selectedProduct.maxPower}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Conexões Hidráulicas:</span>
                      <strong className="text-slate-900">{selectedProduct.currentRange}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Nicho de Acesso:</span>
                      <strong className="text-slate-900">{selectedProduct.breaker}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Tubulação e Conexões:</span>
                      <strong className="text-slate-900">{selectedProduct.cableSection}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Drenagem e Visor:</span>
                      <strong className="text-slate-900">{selectedProduct.groundingRod}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Material da Caixa:</span>
                      <strong className="text-slate-900">{selectedProduct.boxType}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Tipo de Instalação:</span>
                      <strong className="text-slate-900">{selectedProduct.ramalType}</strong>
                    </div>
                  </div>
                ) : selectedProduct.category === 'endereco' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-xs text-slate-500 block">Identificação:</span>
                      <strong className="text-slate-900">{selectedProduct.voltage}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Durabilidade:</span>
                      <strong className="text-[#0056b3]">{selectedProduct.maxPower}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Personalização:</span>
                      <strong className="text-slate-900">{selectedProduct.currentRange}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Fixação Antivandalismo:</span>
                      <strong className="text-slate-900">{selectedProduct.breaker}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Composição do Material:</span>
                      <strong className="text-slate-900">{selectedProduct.cableSection}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Tecnologia de Corte:</span>
                      <strong className="text-slate-900">{selectedProduct.groundingRod}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Opções de Acabamento:</span>
                      <strong className="text-slate-900">{selectedProduct.boxType}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Locais de Instalação:</span>
                      <strong className="text-slate-900">{selectedProduct.ramalType}</strong>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-xs text-slate-500 block">Tensão / Alimentação:</span>
                      <strong className="text-slate-900">{selectedProduct.voltage}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Potência Máxima Suportada:</span>
                      <strong className="text-[#0056b3]">{selectedProduct.maxPower}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Faixa de Disjuntor Recomendada:</span>
                      <strong className="text-slate-900">{selectedProduct.breaker}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Bitola dos Cabos de Entrada:</span>
                      <strong className="text-slate-900">{selectedProduct.cableSection}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Haste e Aterramento:</span>
                      <strong className="text-slate-900">{selectedProduct.groundingRod}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Tipo de Caixa:</span>
                      <strong className="text-slate-900">{selectedProduct.boxType}</strong>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-heading font-bold text-base text-[#1E293B] mb-2">
                  Conformidade Normativa e Qualidade
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-blue-50/70 p-3 rounded-lg border border-blue-100">
                  {selectedProduct.category === 'saneago'
                    ? 'Fabricada em estrita obediência às especificações técnicas e portarias da SANEAGO (Saneamento de Goiás S.A.). Visor transparente anti-UV, travas adequadas e proteção mecânica para ligação nova unifamiliar e comercial em Goiânia e Região Metropolitana.'
                    : selectedProduct.category === 'endereco'
                    ? 'Desenvolvida com materiais nobres de alta durabilidade (ACM / Inox com proteção contra radiação solar e chuva). Garante perfeita identificação para os Correios, concessionárias de serviços públicos, motoristas de aplicativo e entregadores.'
                    : 'Este conjunto é fabricado em rigorosa obediência às normas NT-001 da Equatorial Energia Goiás e às normas NBR 5410. Aprovado para vistorias em toda a microrregião de Goiânia, Aparecida de Goiânia, Trindade e Senador Canedo.'}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleOrderWhatsApp(selectedProduct.name);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  Solicitar Este Modelo no WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="py-3 px-5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-sm min-h-[48px] cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
