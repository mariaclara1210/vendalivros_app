import React, { useState } from 'react';

interface CheckoutSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderTotal: number;
  onOpenTracking: () => void;
}

export const CheckoutSuccessModal: React.FC<CheckoutSuccessModalProps> = ({
  isOpen,
  onClose,
  orderTotal,
  onOpenTracking,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const pixKey = '00020126580014br.gov.bcb.pix0136lumina-livros-pagamentos@lumina.com.br520400005303986540571.155802BR5913Lumina Livros6009Sao Paulo62070503***6304E8A2';

  if (!isOpen) return null;

  const handleCopyPix = () => {
    navigator.clipboard?.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 text-center p-6 sm:p-8 space-y-4">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-[36px]">check_circle</span>
        </div>

        <div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Pedido #LUM-89421BR Registrado
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#000412] mt-2">
            Agradecemos sua leitura!
          </h3>
          <p className="text-xs text-[#44474d] mt-1">
            Seus volumes já foram reservados e entraram na fila de empacotamento com proteção de cantoneira.
          </p>
        </div>

        {/* Pix Box */}
        <div className="p-4 bg-[#f2f4f6] rounded-xl text-left space-y-2 border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#000412] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#0051d5] text-[18px]">qr_code_2</span>
              Pagamento via Pix (5% OFF aplicado)
            </span>
            <span className="text-sm font-bold text-[#0051d5]">
              R$ {(orderTotal * 0.95).toFixed(2).replace('.', ',')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={pixKey}
              className="w-full text-[11px] bg-white px-2 py-1.5 rounded border border-slate-200 font-mono text-[#44474d] outline-none"
            />
            <button
              type="button"
              onClick={handleCopyPix}
              className="shrink-0 bg-[#0051d5] hover:bg-[#003ea8] text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors cursor-pointer"
            >
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
          <span className="text-[10px] text-[#75777e] block">
            QR Code com validade de 30 minutos. O envio será liberado assim que o pagamento for detectado.
          </span>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenTracking();
            }}
            className="w-full bg-[#000412] hover:bg-[#0f1e36] text-white text-xs font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span>Acompanhar Status da Encomenda</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full text-xs text-[#0051d5] font-semibold hover:underline py-2 cursor-pointer"
          >
            Continuar Explorando a Livraria
          </button>
        </div>
      </div>
    </div>
  );
};
