import React from 'react';
import { Camera, Check } from 'lucide-react';
import { useImageEditor } from '../context/ImageEditorContext';

interface EditableImageProps {
  slotId: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: 'lazy' | 'eager';
  showBadge?: boolean;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  slotId,
  alt,
  className = '',
  imgClassName = '',
  loading = 'lazy',
  showBadge = true
}) => {
  const { getSlot, openEditor } = useImageEditor();
  const slot = getSlot(slotId);

  if (!slot) {
    return null;
  }

  const { currentSrc, defaultSrc, filters } = slot;
  const isCustomized =
    currentSrc !== defaultSrc ||
    filters.brightness !== 100 ||
    filters.contrast !== 100 ||
    filters.saturate !== 100 ||
    filters.zoom !== 100 ||
    filters.rotate !== 0 ||
    filters.flipH;

  const filterStyle = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturate}%)`;
  const transformStyle = `scale(${filters.zoom / 100}) rotate(${filters.rotate}deg) scaleX(${filters.flipH ? -1 : 1})`;

  return (
    <div className={`relative group overflow-hidden ${className}`}>
      {/* Image Element */}
      <img
        src={currentSrc}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        style={{
          filter: filterStyle,
          transform: transformStyle,
          objectFit: filters.objectFit,
          objectPosition: filters.position,
          transition: 'filter 0.2s ease, transform 0.2s ease'
        }}
        className={`w-full h-full ${imgClassName}`}
      />

      {/* Customized badge if altered */}
      {isCustomized && showBadge && (
        <div className="absolute top-2 left-2 z-20 pointer-events-none">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-600/90 text-white text-[10px] font-bold shadow-md backdrop-blur-xs">
            <Check className="w-2.5 h-2.5" />
            Editada
          </span>
        </div>
      )}

      {/* Direct Photo Editor Button on Every Photo */}
      <div className="absolute top-2.5 right-2.5 z-30 opacity-95 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openEditor(slotId);
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-[#0056b3] text-white text-xs font-semibold shadow-lg hover:shadow-xl border border-white/25 backdrop-blur-md transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          title={`Editar ou trocar foto: ${slot.title}`}
          aria-label={`Editar ou trocar foto: ${slot.title}`}
        >
          <Camera className="w-3.5 h-3.5 text-[#FFD700]" />
          <span className="text-[11px] font-bold">Editar Foto</span>
        </button>
      </div>

      {/* Clickable overlay to edit */}
      <div
        onClick={() => openEditor(slotId)}
        className="absolute inset-0 bg-slate-950/0 hover:bg-slate-950/15 transition-colors pointer-events-none group-hover:pointer-events-auto cursor-pointer"
        title="Clique para editar ou substituir esta foto"
      />
    </div>
  );
};
