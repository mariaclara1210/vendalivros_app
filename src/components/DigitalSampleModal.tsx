import React, { useState } from 'react';
import { SAMPLE_CHAPTER_CONTENT } from '../data/books';

interface DigitalSampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
  bookTitle: string;
}

export const DigitalSampleModal: React.FC<DigitalSampleModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  bookTitle,
}) => {
  const [currentChapter, setCurrentChapter] = useState<'prologue' | 'chapter1'>('prologue');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [themeMode, setThemeMode] = useState<'sepia' | 'light' | 'dark'>('sepia');

  if (!isOpen) return null;

  const content = SAMPLE_CHAPTER_CONTENT[currentChapter];

  const themeClasses = {
    sepia: 'bg-[#faf6ee] text-[#2c2621] border-[#e8dfcb]',
    light: 'bg-white text-[#191c1e] border-slate-200',
    dark: 'bg-[#12161f] text-[#d8dadc] border-slate-800',
  }[themeMode];

  const fontSizeClasses = {
    sm: 'text-sm leading-relaxed',
    md: 'text-base leading-relaxed sm:leading-loose',
    lg: 'text-lg leading-loose',
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div
        className={`w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border transition-colors ${themeClasses}`}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b flex items-center justify-between shrink-0 opacity-90">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#0051d5]">
              auto_stories
            </span>
            <div>
              <h3 className="font-serif text-sm sm:text-base font-bold truncate max-w-xs sm:max-w-md">
                Degustação Digital • {bookTitle}
              </h3>
              <span className="text-[11px] opacity-70 block">Amostra oficial autorizada</span>
            </div>
          </div>

          {/* Reader controls */}
          <div className="flex items-center gap-2">
            {/* Font size toggles */}
            <div className="hidden sm:flex items-center rounded-lg border border-current/20 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setFontSize('sm')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  fontSize === 'sm' ? 'bg-current/15 font-bold' : ''
                }`}
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSize('md')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  fontSize === 'md' ? 'bg-current/15 font-bold' : ''
                }`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize('lg')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  fontSize === 'lg' ? 'bg-current/15 font-bold' : ''
                }`}
              >
                A+
              </button>
            </div>

            {/* Paper Theme toggles */}
            <div className="flex items-center rounded-lg border border-current/20 p-0.5">
              <button
                type="button"
                title="Pólen / Sépia"
                onClick={() => setThemeMode('sepia')}
                className={`w-6 h-6 rounded-md bg-[#faf6ee] border border-black/10 cursor-pointer ${
                  themeMode === 'sepia' ? 'ring-2 ring-[#0051d5]' : ''
                }`}
              />
              <button
                type="button"
                title="Branco"
                onClick={() => setThemeMode('light')}
                className={`w-6 h-6 rounded-md bg-white border border-black/10 cursor-pointer ml-1 ${
                  themeMode === 'light' ? 'ring-2 ring-[#0051d5]' : ''
                }`}
              />
              <button
                type="button"
                title="Noite"
                onClick={() => setThemeMode('dark')}
                className={`w-6 h-6 rounded-md bg-[#12161f] border border-white/20 cursor-pointer ml-1 ${
                  themeMode === 'dark' ? 'ring-2 ring-[#0051d5]' : ''
                }`}
              />
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-current/10 transition-colors ml-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>
        </div>

        {/* Chapter Selection Segmented tabs */}
        <div className="px-6 py-2 border-b flex gap-3 shrink-0 text-xs">
          <button
            type="button"
            onClick={() => setCurrentChapter('prologue')}
            className={`pb-1 font-semibold transition-colors cursor-pointer ${
              currentChapter === 'prologue'
                ? 'text-[#0051d5] border-b-2 border-[#0051d5]'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            Prólogo: O Farol de Helion
          </button>
          <button
            type="button"
            onClick={() => setCurrentChapter('chapter1')}
            className={`pb-1 font-semibold transition-colors cursor-pointer ${
              currentChapter === 'chapter1'
                ? 'text-[#0051d5] border-b-2 border-[#0051d5]'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            Capítulo I: O Relicário dos Homens Esquecidos
          </button>
        </div>

        {/* Reading Page Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 font-serif">
          <div className="max-w-xl mx-auto space-y-6">
            <div className="text-center py-4 border-b border-current/15 mb-6">
              <span className="text-[11px] uppercase tracking-widest font-sans font-bold opacity-60 block mb-1">
                Lumina Edições Raras
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {content.title}
              </h2>
            </div>

            <div className={`space-y-5 text-justify ${fontSizeClasses}`}>
              {content.content.split('\n\n').map((paragraph, index) => {
                if (index === 0) {
                  // Drop cap on first paragraph
                  const firstChar = paragraph.charAt(0);
                  const rest = paragraph.slice(1);
                  return (
                    <p key={index} className="indent-0">
                      <span className="float-left text-5xl font-bold font-serif leading-none pr-3 pt-1 text-[#0051d5]">
                        {firstChar}
                      </span>
                      {rest}
                    </p>
                  );
                }
                return (
                  <p key={index} className="indent-6">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* End of sample marker */}
            <div className="pt-10 text-center space-y-3">
              <div className="w-12 h-[1px] bg-current/30 mx-auto"></div>
              <p className="font-sans text-xs opacity-75">
                Você chegou ao fim desta amostra gratuita.
              </p>
              <p className="font-sans text-xs font-semibold">
                Para desvendar os mistérios restantes de Helion-9, adquira a edição especial física.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 bg-current/5">
          <span className="text-xs opacity-80 font-sans">
            Edição em Capa Dura com fitilho de cetim e corte lapidado
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-sans font-semibold border border-current/20 hover:bg-current/10 transition-colors cursor-pointer"
            >
              Fechar Leitor
            </button>
            <button
              type="button"
              onClick={() => {
                onAddToCart();
                onClose();
              }}
              className="flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-sans font-bold bg-[#0051d5] hover:bg-[#003ea8] text-white shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              <span>Garantir Meu Exemplar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
