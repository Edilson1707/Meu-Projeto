import React, { createContext, useContext, useState, useEffect } from 'react';
import imgPadraoMonofasico from '../assets/images/caixa_medicao_taf_1788448891381.jpg';
import imgPadraoBifasico from '../assets/images/padrao_bifasico_1788448844189.jpg';
import imgPadraoTrifasico from '../assets/images/padrao_trifasico_1788448860161.jpg';
import imgPadraoAgrupamento from '../assets/images/padrao_agrupamento_1788448876917.jpg';
import imgFachadaLoja from '../assets/images/fachada_sopadroes_real_1788453777565.jpg';
import imgFachadaHeroBg from '../assets/images/fachada_fundo_hero_1788454453825.jpg';

export interface ImageFilters {
  brightness: number; // 50 to 150 (default: 100)
  contrast: number;   // 50 to 150 (default: 100)
  saturate: number;   // 0 to 200 (default: 100)
  zoom: number;       // 50 to 200 (default: 100)
  rotate: number;     // 0, 90, 180, 270 (default: 0)
  flipH: boolean;     // default: false
  objectFit: 'cover' | 'contain';
  position: 'center' | 'top' | 'bottom';
}

export const DEFAULT_FILTERS: ImageFilters = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  zoom: 100,
  rotate: 0,
  flipH: false,
  objectFit: 'cover',
  position: 'center'
};

export interface ImageSlotConfig {
  id: string;
  title: string;
  category: string;
  description: string;
  defaultSrc: string;
  currentSrc: string;
  filters: ImageFilters;
  aspectRatioLabel: string;
}

export interface PresetImage {
  id: string;
  title: string;
  category: string;
  url: string;
}

export const PRESET_GALLERY_IMAGES: PresetImage[] = [
  {
    id: 'fachada_real',
    title: 'Fachada Só Padrões Real (Av. Mangabeiras)',
    category: 'Fachadas e Loja',
    url: '/images/fachada_sopadroes_real.jpg'
  },
  {
    id: 'fachada_loja',
    title: 'Fachada da Loja & Entrada',
    category: 'Fachadas e Loja',
    url: '/images/fachada_sopadroes.jpg'
  },
  {
    id: 'fachada_hero',
    title: 'Fundo Panorâmico Fachada',
    category: 'Fachadas e Loja',
    url: '/images/fachada_fundo_hero.jpg'
  },
  {
    id: 'caixa_taf',
    title: 'Caixa de Medição TAF Policarbonato',
    category: 'Padrões de Medição',
    url: '/images/caixa_medicao_taf_1788448891381.jpg'
  },
  {
    id: 'padrao_mono',
    title: 'Padrão Monofásico Residencial',
    category: 'Padrões de Medição',
    url: '/images/padrao_monofasico.jpg'
  },
  {
    id: 'padrao_bi',
    title: 'Padrão Bifásico / Conjunto Médio',
    category: 'Padrões de Medição',
    url: '/images/padrao_bifasico.jpg'
  },
  {
    id: 'padrao_tri',
    title: 'Padrão Trifásico Industrial',
    category: 'Padrões de Medição',
    url: '/images/padrao_trifasico.jpg'
  },
  {
    id: 'padrao_agrup',
    title: 'Conjunto de Medição Agrupado',
    category: 'Padrões de Medição',
    url: '/images/padrao_agrupamento.jpg'
  }
];

const INITIAL_SLOTS: Record<string, ImageSlotConfig> = {
  'hero_storefront': {
    id: 'hero_storefront',
    title: 'Foto Principal da Fachada (Hero)',
    category: 'Destaque Principal',
    description: 'Exibida no cartão de destaque da seção principal com o endereço Av. Mangabeiras, 967.',
    defaultSrc: imgFachadaLoja,
    currentSrc: imgFachadaLoja,
    filters: { ...DEFAULT_FILTERS, position: 'top' },
    aspectRatioLabel: '16:10 (Paisagem)'
  },
  'hero_background': {
    id: 'hero_background',
    title: 'Imagem de Fundo da Seção Principal',
    category: 'Destaque Principal',
    description: 'Imagem de fundo escurecida que dá profundidade industrial ao topo da página.',
    defaultSrc: imgFachadaHeroBg,
    currentSrc: imgFachadaHeroBg,
    filters: { ...DEFAULT_FILTERS, brightness: 75, contrast: 110 },
    aspectRatioLabel: 'Panorâmica (16:9)'
  },
  'product_padrao-monofasico': {
    id: 'product_padrao-monofasico',
    title: 'Foto: Padrão Monofásico Homologado',
    category: 'Catálogo de Produtos',
    description: 'Exibida no card do padrão monofásico residencial (normas NT-001 M-1).',
    defaultSrc: imgPadraoMonofasico,
    currentSrc: imgPadraoMonofasico,
    filters: { ...DEFAULT_FILTERS },
    aspectRatioLabel: '16:9 / 4:3'
  },
  'product_conjunto-medicao-agrupado': {
    id: 'product_conjunto-medicao-agrupado',
    title: 'Foto: Conjunto de Medição Agrupado',
    category: 'Catálogo de Produtos',
    description: 'Exibida no card do conjunto de medição agrupado (múltiplas medições).',
    defaultSrc: imgPadraoAgrupamento,
    currentSrc: imgPadraoAgrupamento,
    filters: { ...DEFAULT_FILTERS },
    aspectRatioLabel: '16:9 / 4:3'
  },
  'product_padrao-trifasico': {
    id: 'product_padrao-trifasico',
    title: 'Foto: Padrão Trifásico Industrial / Comercial',
    category: 'Catálogo de Produtos',
    description: 'Exibida no card do padrão trifásico de alta carga (normas NT-001 T-3).',
    defaultSrc: imgPadraoTrifasico,
    currentSrc: imgPadraoTrifasico,
    filters: { ...DEFAULT_FILTERS },
    aspectRatioLabel: '16:9 / 4:3'
  },
  'product_padrao-agrupamento': {
    id: 'product_padrao-agrupamento',
    title: 'Foto: Centro de Medição Coletiva',
    category: 'Catálogo de Produtos',
    description: 'Exibida no card do centro de medição coletiva para prédios e condomínios.',
    defaultSrc: imgPadraoAgrupamento,
    currentSrc: imgPadraoAgrupamento,
    filters: { ...DEFAULT_FILTERS },
    aspectRatioLabel: '16:9 / 4:3'
  },
  'location_facade': {
    id: 'location_facade',
    title: 'Foto da Fábrica na Seção de Localização',
    category: 'Localização & Contato',
    description: 'Exibida ao lado do mapa e das rotas para identificar fisicamente a loja na Av. Mangabeiras.',
    defaultSrc: imgFachadaLoja,
    currentSrc: imgFachadaLoja,
    filters: { ...DEFAULT_FILTERS },
    aspectRatioLabel: '16:9'
  }
};

const STORAGE_KEY = 'sopadroes_custom_images_v2';

interface ImageEditorContextType {
  slots: Record<string, ImageSlotConfig>;
  editingSlotId: string | null;
  isCentralGalleryOpen: boolean;
  isEditorModeActive: boolean;
  hasCustomizations: boolean;
  openEditor: (slotId: string) => void;
  closeEditor: () => void;
  openCentralGallery: () => void;
  closeCentralGallery: () => void;
  toggleEditorMode: () => void;
  updateSlotImage: (slotId: string, newSrc: string, filters?: Partial<ImageFilters>) => void;
  updateSlotFilters: (slotId: string, filters: Partial<ImageFilters>) => void;
  resetSlot: (slotId: string) => void;
  resetAllSlots: () => void;
  getSlot: (slotId: string) => ImageSlotConfig | undefined;
}

const ImageEditorContext = createContext<ImageEditorContextType | null>(null);

export const ImageEditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [slots, setSlots] = useState<Record<string, ImageSlotConfig>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with initial slots to guarantee new keys exist
        const merged: Record<string, ImageSlotConfig> = { ...INITIAL_SLOTS };
        Object.keys(parsed).forEach((key) => {
          if (merged[key]) {
            merged[key] = {
              ...merged[key],
              currentSrc: parsed[key].currentSrc || merged[key].defaultSrc,
              filters: { ...merged[key].filters, ...(parsed[key].filters || {}) }
            };
          }
        });
        return merged;
      }
    } catch (e) {
      console.error('Error loading saved images', e);
    }
    return INITIAL_SLOTS;
  });

  const [editingSlotId, setEditingSlotId] = useState<string | null>(null);
  const [isCentralGalleryOpen, setIsCentralGalleryOpen] = useState<boolean>(false);
  const [isEditorModeActive, setIsEditorModeActive] = useState<boolean>(true);

  // Save to localStorage whenever slots change
  useEffect(() => {
    try {
      const toSave: Record<string, { currentSrc: string; filters: ImageFilters }> = {};
      Object.keys(slots).forEach((key) => {
        toSave[key] = {
          currentSrc: slots[key].currentSrc,
          filters: slots[key].filters
        };
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.warn('Unable to persist custom image in localStorage', e);
    }
  }, [slots]);

  const hasCustomizations = (Object.values(slots) as ImageSlotConfig[]).some(
    (slot) => slot.currentSrc !== slot.defaultSrc || JSON.stringify(slot.filters) !== JSON.stringify(DEFAULT_FILTERS)
  );

  const openEditor = (slotId: string) => {
    if (slots[slotId]) {
      setEditingSlotId(slotId);
      setIsCentralGalleryOpen(false);
    }
  };

  const closeEditor = () => {
    setEditingSlotId(null);
  };

  const openCentralGallery = () => {
    setIsCentralGalleryOpen(true);
    setEditingSlotId(null);
  };

  const closeCentralGallery = () => {
    setIsCentralGalleryOpen(false);
  };

  const toggleEditorMode = () => {
    setIsEditorModeActive((prev) => !prev);
  };

  const updateSlotImage = (slotId: string, newSrc: string, filters?: Partial<ImageFilters>) => {
    setSlots((prev) => {
      const current = prev[slotId];
      if (!current) return prev;
      return {
        ...prev,
        [slotId]: {
          ...current,
          currentSrc: newSrc,
          filters: filters ? { ...current.filters, ...filters } : current.filters
        }
      };
    });
  };

  const updateSlotFilters = (slotId: string, filters: Partial<ImageFilters>) => {
    setSlots((prev) => {
      const current = prev[slotId];
      if (!current) return prev;
      return {
        ...prev,
        [slotId]: {
          ...current,
          filters: { ...current.filters, ...filters }
        }
      };
    });
  };

  const resetSlot = (slotId: string) => {
    setSlots((prev) => {
      const current = prev[slotId];
      if (!current) return prev;
      return {
        ...prev,
        [slotId]: {
          ...current,
          currentSrc: current.defaultSrc,
          filters: { ...DEFAULT_FILTERS }
        }
      };
    });
  };

  const resetAllSlots = () => {
    setSlots(INITIAL_SLOTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const getSlot = (slotId: string) => {
    return slots[slotId];
  };

  return (
    <ImageEditorContext.Provider
      value={{
        slots,
        editingSlotId,
        isCentralGalleryOpen,
        isEditorModeActive,
        hasCustomizations,
        openEditor,
        closeEditor,
        openCentralGallery,
        closeCentralGallery,
        toggleEditorMode,
        updateSlotImage,
        updateSlotFilters,
        resetSlot,
        resetAllSlots,
        getSlot
      }}
    >
      {children}
    </ImageEditorContext.Provider>
  );
};

export const useImageEditor = () => {
  const context = useContext(ImageEditorContext);
  if (!context) {
    throw new Error('useImageEditor must be used within an ImageEditorProvider');
  }
  return context;
};
