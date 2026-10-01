import React from 'react';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenTracking: () => void;
  onOpenHelp: () => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  wishlistCount,
  searchQuery,
  onSearchChange,
  onOpenCart,
  onOpenWishlist,
  onOpenTracking,
  onOpenHelp,
  onSelectCategory,
  activeCategory,
  onNavigateHome,
}) => {
  const categories = [
    { id: 'todos', label: 'Todos os Livros' },
    { id: 'ficcao-fantasia', label: 'Ficção & Fantasia' },
    { id: 'nao-ficcao', label: 'Não-Ficção & Negócios' },
    { id: 'desenvolvimento', label: 'Desenvolvimento Pessoal' },
    { id: 'romance-suspense', label: 'Romance & Suspense' },
    { id: 'classicos', label: 'Clássicos' },
    { id: 'infantojuvenil', label: 'Infantojuvenil' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Top Announcement Bar */}
      <div className="bg-[#0f1e36] text-white text-xs font-normal">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 h-10 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="material-symbols-outlined text-[16px] text-[#d8e2ff]">local_shipping</span>
            <span className="truncate">
              Frete Grátis acima de R$ 119 para todo o Brasil | Cupom{' '}
              <strong className="text-[#dbe1ff] font-bold tracking-wide">BEMVINDO10</strong> para 10% OFF
            </span>
          </div>

          <div className="flex items-center gap-6 shrink-0 text-xs">
            <button
              onClick={onOpenTracking}
              type="button"
              className="text-[#b8c7e6] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">schedule</span>
              <span>Rastrear Pedido</span>
            </button>
            <button
              onClick={onOpenHelp}
              type="button"
              className="text-[#b8c7e6] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">support_agent</span>
              <span>Ajuda</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="h-20 max-w-[1360px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-4 sm:gap-6">
        {/* Logo */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-3 shrink-0 cursor-pointer text-left focus:outline-none"
        >
          <img
            alt="Lumina Livraria Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1UZnCTRbpKVb1w_MlMC06pE0HV8GFrnzu-YZ7pY6Vktb83Oy1_vv24mvWNocETXyB6pfq3qrkjDfwhIXjU1DopGWSMtoRw-EIdUP1CFlxS5VIPGQJnHtcAr-AwRUY1IPRziRVPPdXsyMm3xSFe86m3XfJcqq7zuUnuYFBELdilQDHV7wsEUqoD9SCaNg5VKhp_fCLyTlgctCWHxXm8GSCFOYkRbdli89E5ScW2pLIUmyRUJ9z0XWMOC"
            onError={(e) => {
              // Graceful fallback if external link is inaccessible
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="font-serif text-2xl font-medium tracking-tight text-[#000412]">
            Lumina <span className="text-[#0051d5] italic">Livros</span>
          </span>
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative flex items-center">
            <span className="absolute left-4 material-symbols-outlined text-[#75777e] text-[20px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por título, autor, gênero ou ISBN..."
              className="w-full pl-11 pr-10 py-2.5 rounded-lg bg-[#f2f4f6] text-[15px] text-[#191c1e] placeholder:text-[#75777e] outline-none focus:bg-white focus:ring-2 focus:ring-[#0051d5] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-[#75777e] hover:text-[#191c1e] p-1"
                title="Limpar busca"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Actions (Wishlist, Cart, Account) */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            type="button"
            className="flex items-center gap-1.5 text-[#44474d] hover:text-[#191c1e] transition-colors cursor-pointer group"
          >
            <div className="relative">
              <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
                favorite
              </span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#0051d5] text-white rounded-full px-1.5 py-0.2 text-[10px] font-bold leading-tight">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="hidden xl:inline text-sm font-semibold">Desejos</span>
          </button>

          {/* Cart / Sacola */}
          <button
            onClick={onOpenCart}
            type="button"
            className="flex items-center gap-2 text-[#44474d] hover:text-[#191c1e] transition-colors cursor-pointer group"
          >
            <div className="relative">
              <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
                shopping_bag
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#000412] text-white rounded-full px-1.5 py-0.2 text-[10px] font-bold leading-tight">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-bold tracking-wider text-[#75777e] uppercase">
                Sacola
              </span>
              <span className="text-sm font-bold text-[#000412] tabular-nums">
                R$ {cartTotal.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </button>

          {/* Account */}
          <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-[#000412] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
            <div className="hidden xl:block text-left">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#75777e]">
                Bem-vindo
              </span>
              <span className="block text-sm font-bold text-[#000412]">
                Minha Conta
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar if screen is small */}
      <div className="px-4 pb-2 md:hidden">
        <div className="relative flex items-center">
          <span className="absolute left-3 material-symbols-outlined text-[#75777e] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por título, autor ou ISBN..."
            className="w-full pl-9 pr-8 py-2 rounded-lg bg-[#f2f4f6] text-sm text-[#191c1e] placeholder:text-[#75777e] outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2 text-[#75777e]"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Subnav Categories Bar */}
      <nav className="bg-white border-t border-slate-100 shadow-[0_1px_4px_rgba(15,30,54,0.03)]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-4 overflow-x-auto h-12 scrollbar-none">
          <div className="flex items-center gap-6 shrink-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`text-sm py-3 transition-colors shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-[#0051d5] border-b-2 border-[#0051d5] font-bold'
                      : 'text-[#44474d] hover:text-[#191c1e] font-medium'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => onSelectCategory('mais-vendidos')}
              className={`text-sm py-3 transition-colors shrink-0 font-medium ${
                activeCategory === 'mais-vendidos' ? 'text-[#0051d5] font-bold' : 'text-[#44474d] hover:text-[#191c1e]'
              }`}
            >
              Mais Vendidos
            </button>
            <button
              onClick={() => onSelectCategory('lancamentos')}
              className={`text-sm py-3 transition-colors shrink-0 font-medium ${
                activeCategory === 'lancamentos' ? 'text-[#0051d5] font-bold' : 'text-[#44474d] hover:text-[#191c1e]'
              }`}
            >
              Lançamentos
            </button>
            <button
              onClick={() => onSelectCategory('ofertas')}
              className="inline-flex items-center px-3 py-1 rounded-full bg-[#0051d5] hover:bg-[#003ea8] text-white text-[11px] font-bold tracking-wider uppercase shrink-0 transition-colors"
            >
              Até 40% OFF
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
