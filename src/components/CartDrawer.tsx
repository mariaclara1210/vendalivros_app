import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (bookId: string, formatId: string, delta: number) => void;
  onRemoveItem: (bookId: string, formatId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}) => {
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountMultiplier = appliedCoupon === 'BEMVINDO10' ? 0.1 : 0;
  const discountAmount = subtotal * discountMultiplier;
  const finalSubtotal = subtotal - discountAmount;
  const isFreeShipping = finalSubtotal >= 119;
  const shippingCost = isFreeShipping ? 0 : 12.9;
  const total = finalSubtotal + shippingCost;
  const pixTotal = total * 0.95; // 5% Pix discount

  const freeShippingThreshold = 119;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - finalSubtotal);
  const progressPercent = Math.min(100, Math.round((finalSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponCode.trim()) return;

    if (couponCode.trim().toUpperCase() === 'BEMVINDO10') {
      setAppliedCoupon('BEMVINDO10');
      setCouponCode('');
    } else {
      setCouponError('Cupom inválido. Tente BEMVINDO10.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#f7f9fb]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px] text-[#0051d5]">
                shopping_bag
              </span>
              <h3 className="font-serif text-xl font-semibold text-[#000412]">
                Sua Sacola ({items.reduce((sum, item) => sum + item.quantity, 0)})
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

          {/* Free Shipping Tracker */}
          <div className="bg-[#0f1e36] text-white px-5 py-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1 font-semibold text-[#dbe1ff]">
                <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                {isFreeShipping ? 'Você ganhou Frete Grátis!' : 'Frete Grátis acima de R$ 119'}
              </span>
              <span className="text-[11px] font-bold">
                {isFreeShipping
                  ? 'Cortesia'
                  : `Faltam R$ ${remainingForFreeShipping.toFixed(2).replace('.', ',')}`}
              </span>
            </div>
            <div className="w-full bg-[#001c46] rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#0051d5] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <span className="material-symbols-outlined text-[54px] text-slate-300">
                  shopping_basket
                </span>
                <h4 className="font-serif text-lg text-[#000412]">Sua sacola está vazia</h4>
                <p className="text-xs text-[#75777e] max-w-xs mx-auto">
                  Adicione livros extraordinários do nosso catálogo e aproveite nosso frete cortesia.
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
              items.map((item) => (
                <div
                  key={`${item.book.id}-${item.formatId}`}
                  className="flex gap-3 p-3 rounded-lg bg-[#f7f9fb] border border-slate-100 relative group"
                >
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="w-16 h-24 object-cover rounded shadow-xs shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-[#000412] line-clamp-1">
                          {item.book.title}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.book.id, item.formatId)}
                          className="text-[#75777e] hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                          title="Remover"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                      <span className="text-[10px] text-[#0051d5] font-semibold block mt-0.5">
                        {item.formatName}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/50">
                      {/* Stepper */}
                      <div className="flex items-center bg-white rounded border border-slate-200">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.book.id, item.formatId, -1)}
                          className="w-6 h-6 flex items-center justify-center text-[#75777e] hover:text-black cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[14px]">remove</span>
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#000412]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.book.id, item.formatId, 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#75777e] hover:text-black cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[14px]">add</span>
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-[#000412]">
                          R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                        {item.quantity > 1 && (
                          <span className="block text-[10px] text-[#75777e]">
                            R$ {item.price.toFixed(2).replace('.', ',')} un.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-[#f7f9fb] space-y-3">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Cupom (ex: BEMVINDO10)"
                    className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs uppercase font-medium outline-none focus:ring-1 focus:ring-[#0051d5]"
                  />
                  <button
                    type="submit"
                    className="bg-[#000412] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#0f1e36] transition-colors cursor-pointer"
                  >
                    Aplicar
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="flex items-center justify-between text-[11px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                    <span>Cupom <strong>{appliedCoupon}</strong> ativo (10% OFF)</span>
                    <button
                      type="button"
                      onClick={() => setAppliedCoupon(null)}
                      className="text-red-600 hover:underline font-bold text-[10px]"
                    >
                      Remover
                    </button>
                  </div>
                )}
                {couponError && (
                  <span className="text-[11px] text-red-600 block">{couponError}</span>
                )}
              </form>

              {/* Price Calculation breakdown */}
              <div className="space-y-1 text-xs text-[#44474d] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Desconto do Cupom (10%)</span>
                    <span>- R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span>{isFreeShipping ? 'Grátis' : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#000412] pt-2 border-t border-slate-200">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#0051d5] font-bold">
                  <span>No Pix com 5% extra</span>
                  <span>R$ {pixTotal.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                type="button"
                onClick={onCheckout}
                className="w-full bg-[#0051d5] hover:bg-[#003ea8] text-white text-xs font-bold py-3.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span>Finalizar Pedido Seguro</span>
              </button>

              <button
                type="button"
                onClick={onClearCart}
                className="w-full text-center text-[11px] text-[#75777e] hover:text-red-600 transition-colors py-1 cursor-pointer"
              >
                Esvaziar Sacola
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
