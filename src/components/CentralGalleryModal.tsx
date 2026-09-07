import React from 'react';
import { X, Camera, RefreshCw, Eye, EyeOff, Sparkles, Check } from 'lucide-react';
import { useImageEditor, ImageSlotConfig } from '../context/ImageEditorContext';

export const CentralGalleryModal: React.FC = () => {
  const {
    slots,
    isCentralGalleryOpen,
    closeCentralGallery,
    openEditor,
    resetAllSlots,
    hasCustomizations,
    isEditorModeActive,
    toggleEditorMode
  } = useImageEditor();

  if (!isCentralGalleryOpen) {
    return null;
  }

  const slotList = Object.values(slots) as ImageSlotConfig[];

  const handleResetAll = () => {
    if (window.confirm('Tem certeza de que deseja restaurar TODAS as fotos e efeitos para o padrão original da fábrica?')) {
      resetAllSlots();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#0056b3] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 text-[#FFD700]">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-mono text-blue-200 font-bold block">
                Painel de Controle Visual
              </span>
              <h3 className="font-heading font-extrabold text-lg sm:text-xl">
                Editor de Fotos em Todo o Site
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={closeCentralGallery}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Fechar painel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Top Bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-600 font-semibold">
              Gerencie e personalize todas as {slotList.length} fotos do site em um só lugar:
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleEditorMode}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                isEditorModeActive
                  ? 'bg-blue-50 border-blue-200 text-[#0056b3]'
                  : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {isEditorModeActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>Botões nas Fotos: {isEditorModeActive ? 'Ativados' : 'Ocultos'}</span>
            </button>

            {hasCustomizations && (
              <button
                type="button"
                onClick={handleResetAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 font-semibold transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Restaurar Todas
              </button>
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {slotList.map((slot) => {
              const isCustom = slot.currentSrc !== slot.defaultSrc || slot.filters.brightness !== 100 || slot.filters.contrast !== 100 || slot.filters.zoom !== 100 || slot.filters.rotate !== 0;
              const filterStyle = `brightness(${slot.filters.brightness}%) contrast(${slot.filters.contrast}%) saturate(${slot.filters.saturate}%)`;
              const transformStyle = `scale(${slot.filters.zoom / 100}) rotate(${slot.filters.rotate}deg) scaleX(${slot.filters.flipH ? -1 : 1})`;

              return (
                <div
                  key={slot.id}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                      <img
                        src={slot.currentSrc}
                        alt={slot.title}
                        style={{
                          filter: filterStyle,
                          transform: transformStyle,
                          objectFit: slot.filters.objectFit,
                          objectPosition: slot.filters.position
                        }}
                        className="w-full h-full transition-transform"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-xs">
                          {slot.category}
                        </span>
                      </div>
                      {isCustom && (
                        <div className="absolute top-2 right-2">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow">
                            <Check className="w-2.5 h-2.5" />
                            Personalizada
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-1">
                      <h4 className="font-heading font-bold text-sm text-slate-800">
                        {slot.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {slot.description}
                      </p>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="p-4 pt-0">
                    <button
                      type="button"
                      onClick={() => openEditor(slot.id)}
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#0056b3] hover:bg-[#004494] text-white text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-98"
                    >
                      <Camera className="w-3.5 h-3.5 text-[#FFD700]" />
                      <span>Editar ou Trocar Foto</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
          <span>
            💡 Dica: Você também pode clicar no botão <strong>"Editar Foto"</strong> que aparece diretamente sobre qualquer imagem no site.
          </span>
          <button
            type="button"
            onClick={closeCentralGallery}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold transition-colors cursor-pointer"
          >
            Fechar Painel
          </button>
        </div>

      </div>
    </div>
  );
};
