import React, { useState } from 'react';
import { Camera, Eye, EyeOff, Sliders, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useImageEditor, ImageSlotConfig } from '../context/ImageEditorContext';

export const PhotoEditorToolbar: React.FC = () => {
  const {
    openCentralGallery,
    isEditorModeActive,
    toggleEditorMode,
    hasCustomizations,
    slots
  } = useImageEditor();

  const [isOpen, setIsOpen] = useState(false);

  const customCount = (Object.values(slots) as ImageSlotConfig[]).filter(
    (slot) => slot.currentSrc !== slot.defaultSrc || slot.filters.brightness !== 100 || slot.filters.contrast !== 100 || slot.filters.zoom !== 100 || slot.filters.rotate !== 0
  ).length;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
      {/* Expanded Quick Controls */}
      {isOpen && (
        <div className="rounded-2xl bg-white/95 backdrop-blur-md p-3 shadow-2xl border border-slate-200 text-xs text-slate-700 w-64 space-y-2 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 font-bold text-slate-800">
            <span className="flex items-center gap-1.5 text-[#0056b3]">
              <Camera className="w-4 h-4 text-[#FFD700]" />
              Editor de Fotos
            </span>
            <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              {customCount > 0 ? `${customCount} fotos editadas` : 'Padrão original'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              openCentralGallery();
            }}
            className="w-full flex items-center justify-between p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0056b3] font-bold transition-colors cursor-pointer text-left"
          >
            <span className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Ver Todas as Fotos (7)
            </span>
            <span className="text-[10px] bg-[#0056b3] text-white px-1.5 py-0.5 rounded font-mono">Abrir</span>
          </button>

          <button
            type="button"
            onClick={toggleEditorMode}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer text-left font-medium"
          >
            <span className="flex items-center gap-2">
              {isEditorModeActive ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
              Botões "Editar" nas Fotos
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isEditorModeActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}`}>
              {isEditorModeActive ? 'Ligado' : 'Oculto'}
            </span>
          </button>

          <p className="text-[10px] text-slate-400 pt-1 leading-tight border-t border-slate-100">
            Passe o mouse ou toque sobre qualquer imagem do site para substituí-la ou aplicar efeitos.
          </p>
        </div>
      )}

      {/* Main Pill Button */}
      <div className="flex items-center gap-1.5 shadow-xl rounded-full bg-slate-900/90 hover:bg-slate-900 text-white p-1 pl-3.5 pr-2 border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95">
        <button
          type="button"
          onClick={openCentralGallery}
          className="flex items-center gap-2 text-xs font-bold py-1 cursor-pointer"
          title="Abrir Central do Editor de Fotos"
        >
          <Camera className="w-4 h-4 text-[#FFD700]" />
          <span>Editor de Fotos</span>
          {customCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
              {customCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          title="Opções do editor"
          aria-label="Opções do editor"
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
