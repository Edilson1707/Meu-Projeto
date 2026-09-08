import React from 'react';
import { Camera, X, Edit3, Image as ImageIcon } from 'lucide-react';
import { useImageEditor, ImageSlotConfig } from '../context/ImageEditorContext';

export const CentralGalleryModal: React.FC = () => {
  const { slots, galleryModalOpen, closeGalleryModal, openEditor } = useImageEditor();

  if (!galleryModalOpen) {
    return null;
  }

  const slotList: ImageSlotConfig[] = Object.values(slots);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#0056b3] text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10 text-[#FFD700]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-mono text-blue-200 font-bold block">
                Painel de Controle Visual
              </span>
              <h3 className="font-heading font-extrabold text-base sm:text-lg leading-tight">
                Editor de Fotos do Site (Só Padrões)
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={closeGalleryModal}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Fechar galeria"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info bar */}
        <div className="bg-blue-50 border-b border-blue-100 px-5 py-2.5 text-xs text-[#0056b3] flex items-center justify-between">
          <span>Selecione qualquer foto abaixo para substituir, aplicar filtros, zoom ou girar:</span>
          <span className="font-bold">{slotList.length} Fotos Editáveis</span>
        </div>

        {/* Body grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {slotList.map((slot) => (
            <div
              key={slot.id}
              className="group rounded-xl border border-slate-200 hover:border-[#0056b3] bg-white overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                  <img
                    src={slot.currentSrc}
                    alt={slot.title}
                    style={{
                      filter: `brightness(${slot.filters.brightness}%) contrast(${slot.filters.contrast}%) saturate(${slot.filters.saturate}%)`,
                      transform: `scale(${slot.filters.zoom / 100}) rotate(${slot.filters.rotate}deg) scaleX(${slot.filters.flipH ? -1 : 1})`,
                      objectFit: slot.filters.objectFit,
                      objectPosition: slot.filters.position
                    }}
                    className="w-full h-full"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-xs text-[10px] font-bold text-white">
                    {slot.category}
                  </div>
                </div>

                <div className="p-3">
                  <h4 className="font-bold text-xs text-slate-800 line-clamp-1 mb-1">
                    {slot.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {slot.description}
                  </p>
                </div>
              </div>

              <div className="p-3 pt-0">
                <button
                  type="button"
                  onClick={() => openEditor(slot.id)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-900 hover:bg-[#0056b3] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>Editar Esta Foto</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex justify-end">
          <button
            type="button"
            onClick={closeGalleryModal}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Fechar Painel
          </button>
        </div>

      </div>
    </div>
  );
};
