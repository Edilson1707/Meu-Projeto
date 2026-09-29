export interface ProductSpec {
  id: string;
  name: string;
  category: 'monofasico' | 'bifasico' | 'trifasico' | 'agrupamento' | 'saneago' | 'endereco' | string;
  voltage: string;
  maxPower: string;
  currentRange: string;
  breaker: string;
  cableSection: string;
  groundingRod: string;
  boxType: string;
  ramalType: string;
  normCode: string;
  recommendedFor: string;
  badge: string;
  image: string;
  popular?: boolean;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface CalculationResult {
  category: string;
  title: string;
  breaker: string;
  cables: string;
  recommendedPower: string;
  normReference: string;
  whatsappMessage: string;
}
