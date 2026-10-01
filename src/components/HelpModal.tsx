import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const faqs = [
    {
      q: 'Como os livros são embalados para transporte?',
      a: 'Todos os exemplares são envoltos em papel de seda livre de ácido, acolhidos com proteção de cantoneira rígida e tripla camada de plástico bolha de alta densidade antes de serem selados na caixa postal de papelão ondulado reforçado.',
    },
    {
      q: 'Qual o prazo de entrega e como funciona o Frete Grátis?',
      a: 'O frete é gratuito em compras acima de R$ 119 para todo o território nacional através do Econômico Registrado (3 a 5 dias úteis). Para envio prioritário, oferecemos Sedex Express com entrega em até 48 horas úteis.',
    },
    {
      q: 'O que é o papel pólen natural das edições?',
      a: 'O papel pólen passa por processo de alvejamento sem cloro e possui tonalidade marfim suave. Ele não reflete luz como o papel offset comum, proporcionando extremo conforto visual em leituras prolongadas.',
    },
    {
      q: 'Como solicitar troca ou devolução?',
      a: 'Garantimos 30 dias corridos para devolução ou troca sem custos caso o volume apresente qualquer avaria gráfica ou se você não se encantar com a edição. Basta solicitar pelo canal de atendimento.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#f7f9fb]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#0051d5]">
              support_agent
            </span>
            <h3 className="font-serif text-lg font-bold text-[#000412]">
              Central de Atendimento & Dúvidas
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

        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="p-4 bg-[#dbe1ff]/40 rounded-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-[#0051d5] text-[24px]">verified</span>
            <div className="text-xs">
              <strong className="text-[#00174b] block">Suporte Editorial Personalizado</strong>
              <span className="text-[#003ea8]">
                Atendimento por livreiros de segunda a sexta, das 9h às 19h.
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-3.5 bg-[#f7f9fb] rounded-xl border border-slate-100 space-y-1">
                <h4 className="text-xs font-bold text-[#000412] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#0051d5]">
                    help
                  </span>
                  {faq.q}
                </h4>
                <p className="text-xs text-[#44474d] leading-relaxed pl-5">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center text-xs text-[#75777e] border-t border-slate-100">
            Precisa falar diretamente conosco? Envie um e-mail para{' '}
            <strong className="text-[#0051d5]">curadoria@luminalivros.com.br</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
