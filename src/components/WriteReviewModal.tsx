import React, { useState } from 'react';
import { Review } from '../types';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Review) => void;
  bookTitle: string;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
  bookTitle,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('Rio de Janeiro, RJ');
  const [formatBought, setFormatBought] = useState<string>('Capa Dura');
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !title.trim() || !text.trim()) return;

    const initials = name
      .trim()
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: name.trim(),
      initials: initials || 'LE',
      avatarBg: '#0f1e36',
      location: location.trim() || 'Brasil',
      date: 'Hoje',
      rating,
      title: `“${title.trim().replace(/^["“]|["”]$/g, '')}”`,
      text: text.trim(),
      formatBought,
      helpfulVotes: 1,
      isVerified: true,
    };

    onSubmitReview(newReview);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#f7f9fb]">
          <div>
            <span className="text-[11px] font-bold text-[#0051d5] uppercase tracking-wider block">
              Voz dos Leitores
            </span>
            <h3 className="font-serif text-lg font-bold text-[#000412]">
              Avaliar "{bookTitle}"
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#75777e] hover:text-[#000412] p-1.5 rounded-lg hover:bg-slate-200/50 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Star selector */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#000412] uppercase tracking-wider block">
              Sua Classificação Geral:
            </label>
            <div className="flex items-center gap-1 text-amber-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="cursor-pointer p-0.5 hover:scale-110 transition-transform"
                >
                  <span
                    className={`material-symbols-outlined text-[28px] ${
                      star <= (hoverRating || rating) ? 'text-amber-500' : 'text-[#c5c6ce]'
                    }`}
                  >
                    star
                  </span>
                </button>
              ))}
              <span className="text-xs font-bold text-[#000412] ml-2">
                {rating === 5 && 'Obra-prima / Excelente'}
                {rating === 4 && 'Muito Bom'}
                {rating === 3 && 'Bom'}
                {rating === 2 && 'Regular'}
                {rating === 1 && 'Insatisfatório'}
              </span>
            </div>
          </div>

          {/* Name & Location */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#44474d] block">
                Seu Nome ou Pseudônimo *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Beatriz M."
                className="w-full px-3 py-2 text-xs bg-[#f2f4f6] rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-[#0051d5]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#44474d] block">
                Cidade / Estado
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: Porto Alegre, RS"
                className="w-full px-3 py-2 text-xs bg-[#f2f4f6] rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-[#0051d5]"
              />
            </div>
          </div>

          {/* Format bought */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#44474d] block">
              Formato que Você Adquiriu:
            </label>
            <select
              value={formatBought}
              onChange={(e) => setFormatBought(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#f2f4f6] rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-[#0051d5]"
            >
              <option value="Capa Dura">Capa Dura (Edição Especial)</option>
              <option value="Brochura">Brochura Clássica</option>
              <option value="E-book Kindle">E-book Digital Kindle</option>
            </select>
          </div>

          {/* Review Title */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#44474d] block">
              Título da Resenha *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Uma viagem espacial inesquecível e humana"
              className="w-full px-3 py-2 text-xs bg-[#f2f4f6] rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-[#0051d5]"
            />
          </div>

          {/* Review text */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#44474d] block">
              Comentário Detalhado sobre a Leitura & Objeto Físico *
            </label>
            <textarea
              required
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Conte o que achou da prosa, dos personagens, da encadernação, do papel pólen e do acabamento..."
              className="w-full px-3 py-2 text-xs bg-[#f2f4f6] rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-[#0051d5]"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#44474d] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#0051d5] hover:bg-[#003ea8] text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Publicar Avaliação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
