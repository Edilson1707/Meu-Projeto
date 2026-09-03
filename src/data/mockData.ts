import { ProductSpec, Review } from '../types';
import imgPadraoMonofasico from '../assets/images/caixa_medicao_taf_1788448891381.jpg';
import imgPadraoBifasico from '../assets/images/padrao_bifasico_1788448844189.jpg';
import imgPadraoTrifasico from '../assets/images/padrao_trifasico_1788448860161.jpg';
import imgPadraoAgrupamento from '../assets/images/padrao_agrupamento_1788448876917.jpg';

export const PRODUCTS: ProductSpec[] = [
  {
    id: 'padrao-monofasico',
    name: 'Padrão Monofásico Homologado',
    category: 'monofasico',
    voltage: '220V (Fase + Neutro)',
    maxPower: 'Até 10 kW',
    currentRange: '40A a 63A',
    breaker: 'Disjuntor Bipolar DIN 40A / 50A / 63A',
    cableSection: 'Cobre 10mm² a 16mm² anti-chama',
    groundingRod: 'Haste cobreada 2,40m com caixa de inspeção',
    boxType: 'Caixa de Policarbonato Anti-UV NDU-001',
    ramalType: 'Aéreo ou Subterrâneo',
    normCode: 'NDU 001 - Equatorial GO (Tipo M-1)',
    recommendedFor: 'Residências unifamiliares, quiosques, pequenas reformas e padrões provisórios de obra.',
    badge: 'Mais Vendido Residencial',
    image: imgPadraoMonofasico,
    popular: true
  },
  {
    id: 'padrao-bifasico',
    name: 'Padrão Bifásico de Alta Eficiência',
    category: 'bifasico',
    voltage: '220V / 380V (2 Fases + Neutro)',
    maxPower: 'Até 15 kW',
    currentRange: '50A a 70A',
    breaker: 'Disjuntor Tripolar DIN 50A / 63A / 70A',
    cableSection: 'Cobre 16mm² a 25mm² isolação 750V',
    groundingRod: 'Haste 2,40m com conector reforçado',
    boxType: 'Caixa Policarbonato com Visor de Medição Frontal',
    ramalType: 'Aéreo ou Subterrâneo',
    normCode: 'NDU 001 - Equatorial GO (Tipo B-2)',
    recommendedFor: 'Casas com 2 a 3 aparelhos de ar-condicionado, chuveiros elétricos simultâneos e pequenos comércios.',
    badge: 'Excelente Custo-Benefício',
    image: imgPadraoBifasico
  },
  {
    id: 'padrao-trifasico',
    name: 'Padrão Trifásico Industrial / Comercial',
    category: 'trifasico',
    voltage: '220V / 380V Trifásico (3 Fases + Neutro)',
    maxPower: 'Até 75 kW (Medição Direta)',
    currentRange: '63A a 200A',
    breaker: 'Disjuntor Caixa Moldada / DIN 70A a 200A',
    cableSection: 'Cobre 25mm² a 70mm² norma NBR 5410',
    groundingRod: 'Malha de aterramento com 2 a 3 hastes interligadas',
    boxType: 'Caixa Policarbonato Reforçada ou Metálica Galvanizada',
    ramalType: 'Aéreo / Subterrâneo com Mufla e Tubo Galvanizado',
    normCode: 'NDU 001 / NTC - Equatorial GO (Tipo T-3)',
    recommendedFor: 'Sobrados de alto padrão, galpões industriais, padarias, clínicas, restaurantes e sistemas de energia solar.',
    badge: 'Engenharia de Alta Carga',
    image: imgPadraoTrifasico,
    popular: true
  },
  {
    id: 'padrao-agrupamento',
    name: 'Centro de Medição Coletiva (Agrupamento)',
    category: 'agrupamento',
    voltage: 'Trifásico com Derivações Individuais',
    maxPower: 'Customizado conforme memorial de carga',
    currentRange: 'Múltiplas caixas (de 2 a 24 medidores)',
    breaker: 'Quadro Geral de Proteção (QGP) + Disjuntores Individuais',
    cableSection: 'Barramentos de cobre eletrolítico dimensionados',
    groundingRod: 'Sistema de Aterramento Equipotencializado',
    boxType: 'Módulos integrados homologados Equatorial GO',
    ramalType: 'Entrada Subterrânea ou Aérea com Poste Próprio',
    normCode: 'NDU 002 / NTC - Equatorial GO',
    recommendedFor: 'Prédios residenciais, centros de salas comerciais, condomínios fechados e galerias em Goiânia.',
    badge: 'Projetos Especiais',
    image: imgPadraoAgrupamento
  }
];

export const GOOGLE_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Eng. Ricardo Silveira',
    role: 'Engenheiro Civil - Construtora Opus/Aldeia',
    location: 'Setor Bueno, Goiânia',
    rating: 5,
    date: 'Há 2 semanas',
    comment: 'Compro direto da Só Padrões há mais de 3 anos para todas as nossas obras residenciais. Zero reprovação na vistoria da Equatorial Goiás. A pontualidade de entrega na Av. T-10 e Bueno é imbatível.',
    verified: true
  },
  {
    id: '2',
    author: 'Marcos Aurélio Mendonça',
    role: 'Eletricista Instalador Credenciado',
    location: 'Jardim Goiás, Goiânia',
    rating: 5,
    date: 'Há 1 mês',
    comment: 'Padrão completo já vem com todos os cabos crimpados, aterramento correto e disjuntores no padrão exato da concessionária. Economizo pelo menos um dia inteiro de montagem na obra do cliente.',
    verified: true
  },
  {
    id: '3',
    author: 'Dra. Vanessa Carrijo',
    role: 'Proprietária Residencial',
    location: 'Jardins Valência, Goiânia',
    rating: 5,
    date: 'Há 3 semanas',
    comment: 'Fui atendida super rápido pelo WhatsApp. O pessoal tirou todas as dúvidas sobre o trifásico para suportar os 5 aparelhos de ar-condicionado e a piscina aquecida. A Equatorial ligou de primeira!',
    verified: true
  }
];

export const EQUATORIAL_CHECKLIST = [
  {
    title: 'Caixa de Medição Homologada',
    desc: 'Visor voltado para a via pública em policarbonato com proteção UV e selo de conformidade da Equatorial GO.'
  },
  {
    title: 'Poste Homologado e Engastado',
    desc: 'Poste de concreto ou aço galvanizado com altura e resistência nominal (daN) calculada para a tração dos cabos.'
  },
  {
    title: 'Disjuntor Termomagnético Curva C',
    desc: 'Disjuntores DIN aprovados pelas normas NBR NM 60898, devidamente calibrados para o limite da chave de entrada.'
  },
  {
    title: 'Malha de Aterramento TN-S',
    desc: 'Haste de aterramento com espessura de cobre garantida, tampa de inspeção em PVC e conector mecânico reforçado.'
  },
  {
    title: 'Cabos Cobre Isolação 750V / 1kV',
    desc: 'Condutores elétricos de puro cobre eletrolítico anti-chama sem misturas e terminais ilhós perfeitamente prensados.'
  },
  {
    title: 'Liberação Rápida sem Retrabalho',
    desc: 'Sem risco de ' + 'notificação de pendência técnica' + ' pelos fiscais da concessionária em Goiânia.'
  }
];
