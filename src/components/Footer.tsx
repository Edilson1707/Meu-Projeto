import React from 'react';
import { Phone, MapPin, ShieldCheck, Mail } from 'lucide-react';
import { SoPadroesLogo } from './SoPadroesLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CONTACT_INFO } from '../data/contactConfig';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <SoPadroesLogo theme="dark" size="md" />
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Fábrica de Padrões de Energia em Goiânia especializada em padrões monofásicos, trifásicos e conjuntos de medição agrupados 100% homologados nas normas técnicas da Equatorial Goiás.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Conformidade Estrita com as Normas NT-001 Equatorial GO</span>
            </div>
          </div>

          {/* Column 2: Technical Line */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm tracking-wider uppercase">
              Linha de Produtos
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#produtos" className="hover:text-white transition-colors">
                  Padrão Monofásico Residencial (normas NT-001 M-1)
                </a>
              </li>
              <li>
                <a href="#produtos" className="hover:text-white transition-colors">
                  Conjunto de Medição Agrupado (Múltiplas Medições)
                </a>
              </li>
              <li>
                <a href="#produtos" className="hover:text-white transition-colors">
                  Padrão Trifásico de Alta Potência (normas NT-001 T-3)
                </a>
              </li>
              <li>
                <a href="#produtos" className="hover:text-white transition-colors">
                  Centros de Medição Coletiva (Agrupamentos)
                </a>
              </li>
              <li>
                <a href="#produtos" className="hover:text-white transition-colors">
                  Padrões Provisórios Homologados para Canteiro de Obras
                </a>
              </li>
              <li>
                <a href="#produtos" className="hover:text-white transition-colors">
                  Acessórios: Caixas Policarbonato, Cabos e Hastes
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Factory Location in Goiânia */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm tracking-wider uppercase">
              Fábrica e Atendimento
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" />
                <a
                  href={CONTACT_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <strong>Av. Mangabeiras, 967</strong><br />
                  Goiânia - GO, CEP: 74500-000
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFD700] shrink-0" />
                <a href="tel:6232969402" className="hover:text-white font-semibold">
                  {CONTACT_INFO.phoneDisplay} (Fixo)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={CONTACT_INFO.whatsappBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 font-semibold transition-colors"
                >
                  {CONTACT_INFO.whatsappDisplay} (WhatsApp Fábrica)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FFD700] shrink-0" />
                <span>contato@sopadroesgoiania.com.br</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Segunda a Sexta: 07h30 às 18h00 | Sábado: 08h00 às 12h00
              </p>
            </div>
          </div>

          {/* Column 4: Engineering & Legal */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm tracking-wider uppercase">
              Engenharia & Qualidade
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs space-y-2">
              <p className="text-slate-300">
                <strong>Projeto e Responsabilidade Técnica:</strong>
              </p>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Todos os modelos são calculados em estrita harmonia com as normas ABNT NBR 5410 e as normas NT-001 da concessionária Equatorial Goiás.
              </p>
            </div>
            <p className="text-[11px] text-slate-500">
              Goiânia, Aparecida de Goiânia, Senador Canedo, Trindade e interior de Goiás.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} Só Padrões Goiânia. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Normas Equatorial Goiás</span>
            <span>•</span>
            <span>Engenharia de Precisão</span>
            <span>•</span>
            <span>Economia Direta da Fábrica</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
