import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  RotateCw,
  FlipHorizontal,
  ZoomIn,
  Sun,
  Contrast,
  Sparkles,
  RefreshCw,
  Check,
  Image as ImageIcon,
  Sliders,
  Maximize2,
  Minimize2,
  Trash2,
  Link as LinkIcon
} from 'lucide-react';
import { useImageEditor, PRESET_GALLERY_IMAGES, DEFAULT_FILTERS, ImageFilters } from '../context/ImageEditorContext';

// Helper function to compress and resize uploaded images for reliable localStorage persistence
const compressAndResizeImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1400;
        const MAX_HEIGHT = 1400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Compress as JPEG 0.85
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Erro ao processar imagem'));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
    reader.readAsDataURL(file);
  });
};

export const PhotoEditorModal: React.FC = () => {
  const { editingSlotId, closeEditor, getSlot, updateSlotImage, updateSlotFilters, resetSlot } = useImageEditor();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const slot = editingSlotId ? getSlot(editingSlotId) : null;

  // Local state during editing
  const [activeTab, setActiveTab] = useState<'upload' | 'adjust' | 'presets'>('upload');
  const [tempSrc, setTempSrc] = useState<string>('');
  const [tempFilters, setTempFilters] = useState<ImageFilters>(DEFAULT_FILTERS);
  const [customUrl, setCustomUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showSavedToast, setShowSavedToast] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Sync state when slot changes
  useEffect(() => {
    if (slot) {
      setTempSrc(slot.currentSrc);
      setTempFilters({ ...slot.filters });
      setCustomUrl('');
      setShowSavedToast(false);
      setActiveTab('upload');
    }
  }, [editingSlotId, slot]);

  if (!editingSlotId || !slot) {
    return null;
  }

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido (JPG, PNG, WEBP).');
      return;
    }

    setIsProcessing(true);
    try {
      const dataUrl = await compressAndResizeImage(file);
      setTempSrc(dataUrl);
      updateSlotImage(slot.id, dataUrl, tempFilters);
      showToast();
    } catch (err) {
      console.error(err);
      alert('Não foi possível carregar a imagem. Tente uma foto de menor resolução.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyUrl = () => {
    if (!customUrl.trim()) return;
    setTempSrc(customUrl.trim());
    updateSlotImage(slot.id, customUrl.trim(), tempFilters);
    setCustomUrl('');
    showToast();
  };

  const handleSelectPreset = (url: string) => {
    setTempSrc(url);
    updateSlotImage(slot.id, url, tempFilters);
    showToast();
  };

  const handleFilterChange = (key: keyof ImageFilters, value: any) => {
    const updated = { ...tempFilters, [key]: value };
    setTempFilters(updated);
    updateSlotFilters(slot.id, { [key]: value });
  };

  const handleRotate = () => {
    const nextRotate = (tempFilters.rotate + 90) % 360;
    handleFilterChange('rotate', nextRotate);
  };

  const handleFlip = () => {
    handleFilterChange('flipH', !tempFilters.flipH);
  };

  const handleResetFilters = () => {
    setTempFilters(DEFAULT_FILTERS);
    updateSlotFilters(slot.id, DEFAULT_FILTERS);
    showToast();
  };

  const handleRestoreOriginal = () => {
    if (window.confirm(`Deseja restaurar a foto original de fábrica para "${slot.title}"?`)) {
      resetSlot(slot.id);
      setTempSrc(slot.defaultSrc);
      setTempFilters(DEFAULT_FILTERS);
      showToast();
    }
  };

  const showToast = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  // Preview CSS
  const previewFilter = `brightness(${tempFilters.brightness}%) contrast(${tempFilters.contrast}%) saturate(${tempFilters.saturate}%)`;
  const previewTransform = `scale(${tempFilters.zoom / 100}) rotate(${tempFilters.rotate}deg) scaleX(${tempFilters.flipH ? -1 : 1})`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-[#0056b3] text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10 text-[#FFD700]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-mono text-blue-200 font-bold block">
                Editor de Fotos do Site • {slot.category}
              </span>
              <h3 className="font-heading font-extrabold text-base sm:text-lg leading-tight">
                {slot.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={closeEditor}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Fechar editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left / Top: Live Preview Canvas */}
          <div className="lg:col-span-6 flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
              <span className="flex items-center gap-1.5 text-slate-800">
                <Sparkles className="w-4 h-4 text-[#0056b3]" />
                Pré-visualização em Tempo Real
              </span>
              <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Proporção: {slot.aspectRatioLabel}
              </span>
            </div>

            {/* Preview Box */}
            <div className="relative w-full aspect-[16/11] rounded-xl overflow-hidden bg-slate-900 border-2 border-slate-200 shadow-inner flex items-center justify-center">
              {isProcessing ? (
                <div className="flex flex-col items-center gap-2 text-white text-xs">
                  <RefreshCw className="w-6 h-6 animate-spin text-[#FFD700]" />
                  <span>Processando imagem...</span>
                </div>
              ) : (
                <img
                  src={tempSrc}
                  alt={slot.title}
                  style={{
                    filter: previewFilter,
                    transform: previewTransform,
                    objectFit: tempFilters.objectFit,
                    objectPosition: tempFilters.position,
                    transition: 'filter 0.15s ease, transform 0.15s ease'
                  }}
                  className="w-full h-full"
                />
              )}

              {/* Quick overlay controls */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md text-white text-xs border border-white/10">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleRotate}
                    className="p-1.5 rounded hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
                    title="Girar 90°"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleFlip}
                    className={`p-1.5 rounded hover:bg-white/20 transition-colors ${tempFilters.flipH ? 'text-[#FFD700] bg-white/10' : 'text-slate-200'}`}
                    title="Espelhar horizontalmente"
                  >
                    <FlipHorizontal className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFilterChange('objectFit', tempFilters.objectFit === 'cover' ? 'contain' : 'cover')}
                    className="p-1.5 rounded hover:bg-white/20 text-slate-200 hover:text-white transition-colors flex items-center gap-1 text-[10px]"
                    title="Alternar entre Preencher ou Conter"
                  >
                    {tempFilters.objectFit === 'cover' ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                    <span>{tempFilters.objectFit === 'cover' ? 'Preencher' : 'Conter'}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] text-[#FFD700] hover:underline font-semibold"
                >
                  Zerar Efeitos
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-tight">
              {slot.description}
            </p>
          </div>

          {/* Right / Bottom: Tools & Settings */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            
            {/* Tabs */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all ${
                  activeTab === 'upload'
                    ? 'bg-white text-[#0056b3] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Substituir Foto</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('adjust')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all ${
                  activeTab === 'adjust'
                    ? 'bg-white text-[#0056b3] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Ajustar Efeitos</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('presets')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all ${
                  activeTab === 'presets'
                    ? 'bg-white text-[#0056b3] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Galeria da Loja</span>
              </button>
            </div>

            {/* TAB 1: UPLOAD & URL */}
            {activeTab === 'upload' && (
              <div className="space-y-4">
                {/* Drag and Drop Zone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleFileUpload(e.dataTransfer.files[0]);
                    }
                  }}
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                    isDragging
                      ? 'border-[#0056b3] bg-blue-50/50'
                      : 'border-slate-300 hover:border-[#0056b3] bg-slate-50/70'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-[#0056b3] flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <strong className="text-sm font-bold text-slate-800 block mb-1">
                    Enviar Foto do Computador ou Celular
                  </strong>
                  <p className="text-xs text-slate-500 mb-3">
                    Arraste sua foto aqui ou clique para selecionar (JPG, PNG ou WebP).
                  </p>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-[#0056b3] hover:bg-[#004494] text-white text-xs font-bold shadow-sm transition-all"
                  >
                    Escolher Arquivo do Dispositivo
                  </button>
                </div>

                {/* Paste URL */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <LinkIcon className="w-3.5 h-3.5 text-slate-500" />
                    Ou cole o link direto de uma imagem na internet:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://exemplo.com/minha-foto.jpg"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0056b3] bg-white"
                    />
                    <button
                      type="button"
                      onClick={handleApplyUrl}
                      disabled={!customUrl.trim()}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ADJUST EFFECTS */}
            {activeTab === 'adjust' && (
              <div className="space-y-4 text-xs">
                {/* Zoom / Scale */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <ZoomIn className="w-3.5 h-3.5 text-[#0056b3]" />
                      Zoom / Escala
                    </span>
                    <span className="font-mono text-slate-500">{tempFilters.zoom}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="200"
                    step="5"
                    value={tempFilters.zoom}
                    onChange={(e) => handleFilterChange('zoom', Number(e.target.value))}
                    className="w-full accent-[#0056b3] cursor-pointer"
                  />
                </div>

                {/* Brightness */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-[#FFD700]" />
                      Brilho
                    </span>
                    <span className="font-mono text-slate-500">{tempFilters.brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="160"
                    step="5"
                    value={tempFilters.brightness}
                    onChange={(e) => handleFilterChange('brightness', Number(e.target.value))}
                    className="w-full accent-[#0056b3] cursor-pointer"
                  />
                </div>

                {/* Contrast */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <Contrast className="w-3.5 h-3.5 text-slate-800" />
                      Contraste
                    </span>
                    <span className="font-mono text-slate-500">{tempFilters.contrast}%</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="160"
                    step="5"
                    value={tempFilters.contrast}
                    onChange={(e) => handleFilterChange('contrast', Number(e.target.value))}
                    className="w-full accent-[#0056b3] cursor-pointer"
                  />
                </div>

                {/* Saturation */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                      Saturação das Cores
                    </span>
                    <span className="font-mono text-slate-500">{tempFilters.saturate}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="5"
                    value={tempFilters.saturate}
                    onChange={(e) => handleFilterChange('saturate', Number(e.target.value))}
                    className="w-full accent-[#0056b3] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>0% (Preto & Branco)</span>
                    <span>100% (Natural)</span>
                    <span>200% (Vibrante)</span>
                  </div>
                </div>

                {/* Focus Position */}
                <div className="pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-700 block mb-2">Alinhamento Vertical do Foco:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {(['top', 'center', 'bottom'] as const).map((pos) => (
                      <button
                        key={pos}
                        type="button"
                        onClick={() => handleFilterChange('position', pos)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-semibold capitalize border transition-all ${
                          tempFilters.position === pos
                            ? 'bg-[#0056b3] text-white border-[#0056b3]'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {pos === 'top' ? 'Topo' : pos === 'center' ? 'Centro' : 'Base'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: FACTORY PRESETS */}
            {activeTab === 'presets' && (
              <div className="space-y-3">
                <span className="text-xs text-slate-500 block">
                  Clique em uma das fotos oficiais da Só Padrões para aplicá-la neste espaço:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[260px] overflow-y-auto p-1">
                  {PRESET_GALLERY_IMAGES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectPreset(item.url)}
                      className={`group relative rounded-lg overflow-hidden border-2 text-left transition-all hover:scale-[1.02] cursor-pointer aspect-[4/3] ${
                        tempSrc === item.url
                          ? 'border-[#0056b3] ring-2 ring-blue-300'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-1 left-1.5 right-1.5 text-[10px] text-white font-bold leading-tight line-clamp-2">
                        {item.title}
                      </div>
                      {tempSrc === item.url && (
                        <div className="absolute top-1 right-1 p-1 rounded-full bg-[#0056b3] text-white">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRestoreOriginal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Restaurar Original de Fábrica
            </button>
          </div>

          <div className="flex items-center gap-3">
            {showSavedToast && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 animate-in fade-in">
                <Check className="w-4 h-4" />
                Foto aplicada no site!
              </span>
            )}
            <button
              type="button"
              onClick={closeEditor}
              className="px-5 py-2.5 rounded-xl bg-[#0056b3] hover:bg-[#004494] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Concluir e Salvar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
