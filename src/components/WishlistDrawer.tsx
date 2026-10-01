import React from 'react';
import { Book } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistBooks: Book[];
  onRemoveFromWishlist: (bookId: string) => void;
  onAddToCart: (book: Book) => void;
  onSelectBook: (bookId: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistBooks,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectBook,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#f7f9fb]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px] text-red-500">favorite</span>
              <h3 className="font-serif text-xl font-semibold text-[#000412]">
                Lista de Desejos ({wishlistBooks.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-[#75777e] hover:text-[#000412] p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistBooks.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <span className="material-symbols-outlined text-[54px] text-slate-300">
                  favorite_border
                </span>
                <h4 className="font-serif text-lg text-[#000412]">
                  Nenhum livro salvo ainda
                </h4>
                <p className="text-xs text-[#75777e] max-w-xs mx-auto">
                  Clique no ícone de coração em qualquer livro do catálogo para guardá-lo aqui.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#0051d5] hover:bg-[#003ea8] text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer inline-block mt-2"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              wishlistBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex gap-3 p-3 rounded-lg bg-[#f7f9fb] border border-slate-100"
                >
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-16 h-24 object-cover rounded shadow-xs shrink-0 cursor-pointer"
                    onClick={() => {
                      onSelectBook(book.id);
                      onClose();
                    }}
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4
                          onClick={() => {
                            onSelectBook(book.id);
                            onClose();
                          }}
                          className="text-xs font-bold text-[#000412] line-clamp-1 hover:text-[#0051d5] cursor-pointer"
                        >
                          {book.title}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveFromWishlist(book.id)}
                          className="text-[#75777e] hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                          title="Remover dos favoritos"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                      <span className="text-[11px] text-[#0051d5] font-medium block">
                        {book.author}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/50">
                      <span className="text-xs font-bold text-[#000412]">
                        R$ {book.price.toFixed(2).replace('.', ',')}
                      </span>
                      <button
                        type="button"
                        onClick={() => onAddToCart(book)}
                        className="bg-[#0051d5] hover:bg-[#003ea8] text-white text-[11px] font-semibold px-3 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">shopping_bag</span>
                        <span>Mover p/ Sacola</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 bg-[#f7f9fb] text-center">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-[#0051d5] font-semibold hover:underline"
            >
              Continuar Navegando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
