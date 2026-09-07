import React from 'react';
import { Camera, Sliders, Check } from 'lucide-react';
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
  const { getSlot, openEditor, isEditorModeActive } = useImageEditor();
  const slot = getSlot(slotId);

  if (!slot) {
    return null;
  }

  const { currentSrc, defaultSrc, filters } = slot;
  const isCustomized = currentSrc !== defaultSrc || filters.brightness !== 100 || filters.contrast !== 100 || filters.zoom !== 100 || filters.rotate !== 0 || filters.flipH;

  // Compute CSS filter string
  const filterStyle = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturate}%)`;
  
  // Compute transform
  const transformStyle = `scale(${filters.zoom / 100}) rotate(${filters.rotate}deg) scaleX(${filters.flipH ? -1 : 1})`;

  return (
    <div className={`relative group overflow-hidden ${className}`}>
      {/* Visual Image */}
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

      {/* Edit Trigger Button */}
      {isEditorModeActive && (
        <div className="absolute top-2 right-2 z-30 transition-all duration-200">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openEditor(slotId);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-[#0056b3] text-white text-xs font-semibold shadow-lg hover:shadow-xl border border-white/30 backdrop-blur-md transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            title={`Editar ou trocar foto: ${slot.title}`}
            aria-label={`Editar ou trocar foto: ${slot.title}`}
          >
            <Camera className="w-3.5 h-3.5 text-[#FFD700]" />
            <span className="hidden sm:inline">Editar Foto</span>
          </button>
        </div>
      )}

      {/* Subtle hover overlay in editor mode */}
      {isEditorModeActive && (
        <div
          onClick={(e) => {
            // Optional click on image to edit when in editor mode
            if (e.target === e.currentTarget) {
              openEditor(slotId);
            }
          }}
          className="absolute inset-0 bg-slate-950/0 hover:bg-slate-950/20 transition-colors pointer-events-none group-hover:pointer-events-auto cursor-pointer"
        />
      )}
    </div>
  );
};
