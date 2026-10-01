import React, { useState } from 'react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ isOpen, onClose }) => {
  const [trackingCode, setTrackingCode] = useState<string>('LUM-89421BR');
  const [searched, setSearched] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#f7f9fb]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#0051d5]">
              schedule
            </span>
            <h3 className="font-serif text-lg font-bold text-[#000412]">
              Rastreamento de Encomenda
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

        <div className="p-6 space-y-5">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
              placeholder="Digite o código (ex: LUM-89421BR)"
              className="flex-1 px-3.5 py-2 text-xs font-mono uppercase bg-[#f2f4f6] rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-[#0051d5]"
            />
            <button
              type="submit"
              className="bg-[#000412] hover:bg-[#0f1e36] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Rastrear
            </button>
          </form>

          {searched && (
            <div className="space-y-4 pt-2">
              <div className="p-3 bg-[#f2f4f6] rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-[#75777e] uppercase font-bold block">
                    Remessa Sedex Express
                  </span>
                  <span className="font-mono font-bold text-[#000412]">{trackingCode}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#75777e] uppercase font-bold block">
                    Previsão de Entrega
                  </span>
                  <span className="font-bold text-[#0051d5]">Em 2 dias úteis</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative pl-6 space-y-5 border-l-2 border-[#dbe1ff] ml-3 text-xs">
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#0051d5] ring-4 ring-[#dbe1ff]"></div>
                  <strong className="text-[#000412] block">Objeto em trânsito para a unidade local</strong>
                  <span className="text-[#75777e] text-[11px]">
                    Centro de Distribuição Integrado • Hoje às 10:14
                  </span>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#0051d5]"></div>
                  <strong className="text-[#000412] block">Despachado com proteção de cantoneira</strong>
                  <span className="text-[#75777e] text-[11px]">
                    CD São Paulo, SP • Ontem às 18:30
                  </span>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-600"></div>
                  <strong className="text-[#000412] block">Pagamento Confirmado no Pix (5% OFF)</strong>
                  <span className="text-[#75777e] text-[11px]">
                    Lumina Livros • Ontem às 14:02
                  </span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-lg flex items-center gap-2 border border-emerald-200">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Seus livros viajam embalados com tripla camada e plástico bolha de alta densidade.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
