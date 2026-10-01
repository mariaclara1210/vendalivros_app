import React, { useState } from 'react';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenTracking: () => void;
  onOpenHelp: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenTracking,
  onOpenHelp,
}) => {
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="w-full bg-[#0f1e36] text-[#b8c7e6] pt-16 pb-12 shadow-[0_-1px_12px_rgba(0,0,0,0.06)]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Newsletter Callout Banner */}
        <div className="bg-[#001c46]/60 rounded-xl p-6 sm:p-10 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/5">
          <div className="max-w-xl text-left">
            <span className="text-[11px] font-bold text-[#3b82f6] uppercase tracking-widest block mb-1">
              Curadoria Literária
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2 font-medium">
              Assine nossa correspondência de leitura
            </h3>
            <p className="text-sm text-[#b8c7e6]">
              Resenhas críticas, análises de edições raras e capítulos inéditos entregues
              quinzenalmente no seu e-mail.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full lg:w-auto items-center gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail acadêmico ou pessoal"
              className="w-full sm:w-80 px-4 py-3 rounded-lg bg-white text-[#191c1e] text-xs outline-none placeholder:text-[#75777e] focus:ring-2 focus:ring-[#0051d5]"
            />
            <button
              type="submit"
              className="bg-[#0051d5] hover:bg-[#003ea8] text-white text-xs font-bold px-6 py-3 rounded-lg transition-colors shrink-0 cursor-pointer shadow-sm"
            >
              {subscribed ? 'Inscrito!' : 'Cadastrar'}
            </button>
          </form>
        </div>

        {/* 4 Columns Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[28px] text-white">auto_stories</span>
              <span className="font-serif text-xl font-bold text-white">Lumina Livros</span>
            </div>
            <p className="text-xs text-[#b8c7e6] leading-relaxed">
              Dedicada à preservação do objeto físico e ao estímulo do intelecto. Curadorias
              refinadas de edições em capa dura, traduções premiadas e volumes colecionáveis.
            </p>
            <div className="flex items-center gap-2 text-[#b8c7e6]">
              <span className="material-symbols-outlined text-[18px] text-[#0051d5]">verified</span>
              <span className="text-xs">Livraria Certificada • Desde 2018</span>
            </div>
          </div>

          {/* Col 2: Departamentos */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Departamentos
            </h4>
            <ul className="space-y-2 text-xs text-[#b8c7e6]">
              <li className="hover:text-white transition-colors">
                <button
                  type="button"
                  onClick={() => onSelectCategory('ficcao-fantasia')}
                  className="cursor-pointer text-left"
                >
                  Ficção Especulativa
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button
                  type="button"
                  onClick={() => onSelectCategory('classicos')}
                  className="cursor-pointer text-left"
                >
                  Coleções Clássicas
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button
                  type="button"
                  onClick={() => onSelectCategory('nao-ficcao')}
                  className="cursor-pointer text-left"
                >
                  Economia & Sociedade
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button
                  type="button"
                  onClick={() => onSelectCategory('desenvolvimento')}
                  className="cursor-pointer text-left"
                >
                  Filosofia & Psicanálise
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button
                  type="button"
                  onClick={() => onSelectCategory('ofertas')}
                  className="cursor-pointer text-left"
                >
                  Edições Limitadas em Promoção
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Atendimento & Apoio */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Atendimento & Apoio
            </h4>
            <ul className="space-y-2 text-xs text-[#b8c7e6]">
              <li className="hover:text-white transition-colors">
                <button type="button" onClick={onOpenHelp} className="cursor-pointer text-left">
                  Central de Atendimento
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button type="button" onClick={onOpenTracking} className="cursor-pointer text-left">
                  Localizar Encomenda
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button type="button" onClick={onOpenHelp} className="cursor-pointer text-left">
                  Política de Devolução e Reembolso
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button type="button" onClick={onOpenHelp} className="cursor-pointer text-left">
                  Privacidade e Termos de Uso
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button type="button" onClick={onOpenHelp} className="cursor-pointer text-left">
                  Perguntas Frequentes (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Segurança & Pagamentos */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Segurança & Pagamentos
            </h4>
            <div className="space-y-3">
              <div className="bg-[#001c46]/40 p-3 rounded-lg border border-white/5">
                <p className="text-xs text-white font-bold mb-1">Pagamentos com Selo Ágil</p>
                <p className="text-[11px] text-[#b8c7e6]">
                  Pix com 5% de desconto • Cartões de crédito até 10x sem juros • Boleto bancário
                  registrado.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0051d5] text-[24px]">lock</span>
                <div>
                  <p className="text-[10px] font-bold text-white uppercase tracking-wider">
                    Criptografia SSL de 256 Bits
                  </p>
                  <p className="text-[11px] text-[#b8c7e6]">Ambiente 100% Protegido</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#b8c7e6]">
          <p>© 2025 Lumina Livros Ltda. Todos os direitos reservados. CNPJ 38.910.422/0001-90.</p>
          <div className="flex items-center gap-6">
            <button type="button" onClick={onOpenHelp} className="hover:text-white transition-colors">
              Privacidade
            </button>
            <button type="button" onClick={onOpenHelp} className="hover:text-white transition-colors">
              Termos Contratuais
            </button>
            <button type="button" onClick={onOpenHelp} className="hover:text-white transition-colors">
              Contatar Suporte
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
