import React from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { useImageEditor } from '../context/ImageEditorContext';

export const PhotoEditorToolbar: React.FC = () => {
  const { openGalleryModal } = useImageEditor();

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        type="button"
        onClick={openGalleryModal}
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#1E293B] hover:bg-[#0056b3] text-white text-xs font-bold shadow-xl hover:shadow-2xl border border-slate-700 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 active:scale-95 group cursor-pointer"
        title="Abrir Gerenciador de Fotos do Site"
      >
        <div className="p-1 rounded-full bg-[#FFD700] text-slate-950 group-hover:rotate-12 transition-transform">
          <Camera className="w-3.5 h-3.5" />
        </div>
        <span className="hidden sm:inline font-heading font-extrabold text-white">
          Editor de Fotos
        </span>
        <span className="sm:hidden font-heading font-bold text-white">
          Fotos
        </span>
      </button>
    </div>
  );
};
