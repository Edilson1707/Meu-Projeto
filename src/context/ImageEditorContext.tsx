import React, { createContext, useContext, useState, useEffect } from 'react';
import imgPadraoMonofasico from '../assets/images/caixa_medicao_taf_1788448891381.jpg';
import imgPadraoBifasico from '../assets/images/padrao_bifasico_1788448844189.jpg';
import imgPadraoTrifasico from '../assets/images/padrao_trifasico_1788448860161.jpg';
import imgPadraoAgrupamento from '../assets/images/padrao_agrupamento_1788448876917.jpg';
import imgFachadaLojaReal from '../assets/images/fachada_sopadroes_real_1788453777565.jpg';
import imgFachadaFundoLoja from '../assets/images/fachada_fundo_loja_real_1788454600037.jpg';
import imgFachadaHeroBg from '../assets/images/fachada_fundo_hero_1788454453825.jpg';

export interface ImageFilters {
  brightness: number; // 50 to 150
  contrast: number;   // 50 to 150
  saturate: number;   // 0 to 200
  zoom: number;       // 50 to 200
  rotate: number;     // 0, 90, 180, 270
  flipH: boolean;
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
    id: 'fachada_fundo_loja',
    title: 'Fachada Só Padrões (Av. Mangabeiras, 967)',
    category: 'Fachadas e Loja',
    url: imgFachadaFundoLoja
  },
  {
    id: 'fachada_real',
    title: 'Fachada da Fábrica & Entrada',
    category: 'Fachadas e Loja',
    url: imgFachadaLojaReal
  },
  {
    id: 'caixa_taf',
    title: 'Caixa de Medição TAF Policarbonato',
    category: 'Padrões de Medição',
    url: imgPadraoMonofasico
  },
  {
    id: 'padrao_bifasico',
    title: 'Padrão Bifásico Homologado',
    category: 'Padrões de Medição',
    url: imgPadraoBifasico
  },
  {
    id: 'padrao_trifasico',
    title: 'Padrão Trifásico Industrial',
    category: 'Padrões de Medição',
    url: imgPadraoTrifasico
  },
  {
    id: 'padrao_agrupado',
    title: 'Conjunto de Medição Agrupado',
    category: 'Padrões de Medição',
    url: imgPadraoAgrupamento
  }
];

const INITIAL_SLOTS: Record<string, ImageSlotConfig> = {
  'hero_storefront': {
    id: 'hero_storefront',
    title: 'Foto da Fachada (Seção Principal)',
    category: 'Destaque Principal',
    description: 'Foto principal da fachada da loja e fábrica na Av. Mangabeiras, 967.',
    defaultSrc: imgFachadaFundoLoja,
    currentSrc: imgFachadaFundoLoja,
    filters: { ...DEFAULT_FILTERS, position: 'top' },
    aspectRatioLabel: '16:10'
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
    description: 'Exibida no card do centro de medição coletiva para condomínios e galerias.',
    defaultSrc: imgPadraoAgrupamento,
    currentSrc: imgPadraoAgrupamento,
    filters: { ...DEFAULT_FILTERS },
    aspectRatioLabel: '16:9 / 4:3'
  },
  'location_facade': {
    id: 'location_facade',
    title: 'Foto da Fachada na Seção de Localização',
    category: 'Localização & Contato',
    description: 'Exibida ao lado do mapa e informações de atendimento na Av. Mangabeiras.',
    defaultSrc: imgFachadaLojaReal,
    currentSrc: imgFachadaLojaReal,
    filters: { ...DEFAULT_FILTERS },
    aspectRatioLabel: '16:10'
  }
};

const STORAGE_KEY = 'sopadroes_edited_photos_v4';

interface ImageEditorContextType {
  slots: Record<string, ImageSlotConfig>;
  editingSlotId: string | null;
  galleryModalOpen: boolean;
  openEditor: (slotId: string) => void;
  closeEditor: () => void;
  openGalleryModal: () => void;
  closeGalleryModal: () => void;
  updateSlotImage: (slotId: string, newSrc: string, filters?: Partial<ImageFilters>) => void;
  updateSlotFilters: (slotId: string, filters: Partial<ImageFilters>) => void;
  resetSlot: (slotId: string) => void;
  getSlot: (slotId: string) => ImageSlotConfig | undefined;
}

const ImageEditorContext = createContext<ImageEditorContextType | null>(null);

export const ImageEditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [slots, setSlots] = useState<Record<string, ImageSlotConfig>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
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
  const [galleryModalOpen, setGalleryModalOpen] = useState<boolean>(false);

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

  const openEditor = (slotId: string) => {
    if (slots[slotId]) {
      setEditingSlotId(slotId);
      setGalleryModalOpen(false);
    }
  };

  const closeEditor = () => {
    setEditingSlotId(null);
  };

  const openGalleryModal = () => {
    setGalleryModalOpen(true);
  };

  const closeGalleryModal = () => {
    setGalleryModalOpen(false);
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

  const getSlot = (slotId: string) => {
    return slots[slotId];
  };

  return (
    <ImageEditorContext.Provider
      value={{
        slots,
        editingSlotId,
        galleryModalOpen,
        openEditor,
        closeEditor,
        openGalleryModal,
        closeGalleryModal,
        updateSlotImage,
        updateSlotFilters,
        resetSlot,
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
