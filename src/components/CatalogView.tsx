import React, { useState } from 'react';
import { Book, FilterState } from '../types';

interface CatalogViewProps {
  books: Book[];
  filterState: FilterState;
  onFilterChange: (newFilter: Partial<FilterState>) => void;
  onClearFilters: () => void;
  onSelectBook: (bookId: string) => void;
  onAddToCart: (book: Book, formatId?: string) => void;
  onToggleWishlist: (bookId: string) => void;
  wishlistBookIds: Set<string>;
  cartTotal: number;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  books,
  filterState,
  onFilterChange,
  onClearFilters,
  onSelectBook,
  onAddToCart,
  onToggleWishlist,
  wishlistBookIds,
  cartTotal,
}) => {
  const [sliderPrice, setSliderPrice] = useState<number>(filterState.maxPrice || 120);
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Subgenres list
  const subgenres = [
    { label: 'Ficção Científica', count: 42 },
    { label: 'Fantasia Épica', count: 38 },
    { label: 'Distopia & Utopias', count: 24 },
    { label: 'Cyberpunk & Solaris', count: 14 },
    { label: 'Space Opera', count: 10 },
  ];

  // Physical formats
  const formatsList = [
    { id: 'Capa Dura', label: 'Capa Dura (Hardcover)', count: 32 },
    { id: 'Brochura', label: 'Brochura Clássica', count: 85 },
    { id: 'Edição Especial', label: 'Edição Especial de Luxo', count: 11 },
    { id: 'E-book', label: 'E-book Digital Kindle/ePub', count: 40 },
  ];

  // Publishers
  const publishersList = [
    { id: 'Aleph Livros', label: 'Aleph Livros', count: 34 },
    { id: 'Companhia das Letras', label: 'Companhia das Letras', count: 29 },
    { id: 'DarkSide Books', label: 'DarkSide Books', count: 21 },
    { id: 'Morro Branco', label: 'Morro Branco', count: 18 },
    { id: 'HarperCollins Brasil', label: 'HarperCollins Brasil', count: 15 },
  ];

  // Free shipping progress (Goal: R$ 119)
  const freeShippingThreshold = 119.0;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const shippingProgressPercent = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));

  // Toggle format filter
  const toggleFormat = (formatId: string) => {
    const current = filterState.formats;
    const next = current.includes(formatId)
      ? current.filter((f) => f !== formatId)
      : [...current, formatId];
    onFilterChange({ formats: next });
  };

  // Toggle publisher filter
  const togglePublisher = (pubId: string) => {
    const current = filterState.publishers;
    const next = current.includes(pubId)
      ? current.filter((p) => p !== pubId)
      : [...current, pubId];
    onFilterChange({ publishers: next });
  };

  const handleAddClick = (book: Book, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(book);
    setAddedAnimationId(book.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  const handleSliderRelease = () => {
    onFilterChange({ maxPrice: sliderPrice });
  };

  // Filter books
  const filteredBooks = books.filter((book) => {
    // Search query
    if (filterState.searchQuery) {
      const q = filterState.searchQuery.toLowerCase();
      const match =
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.subgenre.toLowerCase().includes(q) ||
        book.publisher.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Subgenre
    if (filterState.subgenre && filterState.subgenre !== 'all') {
      if (book.subgenre.toLowerCase() !== filterState.subgenre.toLowerCase()) return false;
    }

    // Price
    if (book.price > filterState.maxPrice) return false;

    // Formats
    if (filterState.formats.length > 0) {
      const matchesFormat = filterState.formats.some((fmt) =>
        book.physicalFormat.toLowerCase().includes(fmt.toLowerCase())
      );
      if (!matchesFormat) return false;
    }

    // Rating
    if (filterState.minRating !== null) {
      if (book.rating < filterState.minRating) return false;
    }

    // Publisher
    if (filterState.publishers.length > 0) {
      if (!filterState.publishers.includes(book.publisher)) return false;
    }

    return true;
  });

  // Sort
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (filterState.sortBy === 'price-asc') return a.price - b.price;
    if (filterState.sortBy === 'price-desc') return b.price - a.price;
    if (filterState.sortBy === 'rating') return b.rating - a.rating;
    if (filterState.sortBy === 'newest') return b.stock - a.stock;
    // bestsellers default
    return b.reviewsCount - a.reviewsCount;
  });

  const displayedBooks = sortedBooks.slice(0, visibleCount);

  return (
    <div className="w-full pt-36 md:pt-40 bg-[#f7f9fb] min-h-[calc(100vh-28rem)]">
      <div className="max-w-[1360px] w-full mx-auto px-4 sm:px-8 pb-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-[#44474d] py-4">
          <button
            onClick={() => onFilterChange({ subgenre: 'all' })}
            className="hover:text-[#0051d5] transition-colors"
          >
            Início
          </button>
          <span className="material-symbols-outlined text-[14px] text-[#75777e]">chevron_right</span>
          <button
            onClick={() => onFilterChange({ subgenre: 'all' })}
            className="hover:text-[#0051d5] transition-colors"
          >
            Catálogo Geral
          </button>
          <span className="material-symbols-outlined text-[14px] text-[#75777e]">chevron_right</span>
          <span className="text-[#000412] font-semibold">
            {filterState.subgenre && filterState.subgenre !== 'all'
              ? filterState.subgenre
              : 'Ficção & Fantasia'}
          </span>
        </nav>

        {/* Editorial Header Banner */}
        <header className="relative bg-[#f2f4f6] rounded-xl p-6 sm:p-10 mb-6 overflow-hidden shadow-sm">
          <div className="absolute -right-16 -top-16 w-96 h-96 rounded-full bg-[#dbe1ff]/40 blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full bg-[#0051d5] text-white text-[11px] font-bold uppercase tracking-wider">
                Curadoria Editorial
              </span>
              <span className="text-xs text-[#44474d]">Ciclo Outono/Inverno</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#000412] font-medium tracking-tight mb-2">
              Ficção & Fantasia
            </h1>
            <p className="text-[15px] text-[#44474d] leading-relaxed">
              Navegue por universos construídos com maestria literária. De tomos arcanos e especulações
              cósmicas a futuros distópicos de precisão cirúrgica. Edições integrais com papel pólen,
              diagramador premiado e acabamento de arquivo.
            </p>
            <div className="mt-4 flex items-center gap-6 text-xs">
              <div className="flex items-center gap-1.5 text-[#000412] font-medium">
                <span className="material-symbols-outlined text-[18px] text-[#0051d5]">menu_book</span>
                <span>
                  Exibindo <strong>{sortedBooks.length} títulos</strong> encontrados
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-[#44474d]">
                <span className="material-symbols-outlined text-[18px] text-[#0051d5]">verified</span>
                <span>100% Edições Autenticadas</span>
              </div>
            </div>
          </div>
        </header>

        {/* Filters Toolbar */}
        <section className="bg-white rounded-xl p-4 mb-8 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Active Filter Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-[#75777e] uppercase tracking-wider mr-1">
              Filtros Ativos:
            </span>

            {/* Filter Pill 1 */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dbe1ff] text-[#00174b] text-xs font-semibold">
              <span>Em Estoque</span>
            </span>

            {/* Subgenre filter tag if active */}
            {filterState.subgenre && filterState.subgenre !== 'all' && (
              <button
                onClick={() => onFilterChange({ subgenre: 'all' })}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dbe1ff] text-[#00174b] text-xs font-semibold hover:bg-[#b4c5ff] transition-colors group cursor-pointer"
              >
                <span>{filterState.subgenre}</span>
                <span className="material-symbols-outlined text-[16px] text-[#003ea8] group-hover:text-red-600 transition-colors">
                  close
                </span>
              </button>
            )}

            {/* Price Pill */}
            {filterState.maxPrice < 250 && (
              <button
                onClick={() => {
                  setSliderPrice(250);
                  onFilterChange({ maxPrice: 250 });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dbe1ff] text-[#00174b] text-xs font-semibold hover:bg-[#b4c5ff] transition-colors group cursor-pointer"
              >
                <span>Até R$ {filterState.maxPrice.toFixed(2).replace('.', ',')}</span>
                <span className="material-symbols-outlined text-[16px] text-[#003ea8] group-hover:text-red-600 transition-colors">
                  close
                </span>
              </button>
            )}

            {/* Formats Pills */}
            {filterState.formats.map((fmt) => (
              <button
                key={fmt}
                onClick={() => toggleFormat(fmt)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dbe1ff] text-[#00174b] text-xs font-semibold hover:bg-[#b4c5ff] transition-colors group cursor-pointer"
              >
                <span>{fmt}</span>
                <span className="material-symbols-outlined text-[16px] text-[#003ea8] group-hover:text-red-600 transition-colors">
                  close
                </span>
              </button>
            ))}

            {/* Publishers Pills */}
            {filterState.publishers.map((pub) => (
              <button
                key={pub}
                onClick={() => togglePublisher(pub)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dbe1ff] text-[#00174b] text-xs font-semibold hover:bg-[#b4c5ff] transition-colors group cursor-pointer"
              >
                <span>{pub}</span>
                <span className="material-symbols-outlined text-[16px] text-[#003ea8] group-hover:text-red-600 transition-colors">
                  close
                </span>
              </button>
            ))}

            {/* Rating pill */}
            {filterState.minRating !== null && (
              <button
                onClick={() => onFilterChange({ minRating: null })}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dbe1ff] text-[#00174b] text-xs font-semibold hover:bg-[#b4c5ff] transition-colors group cursor-pointer"
              >
                <span>★ {filterState.minRating}+</span>
                <span className="material-symbols-outlined text-[16px] text-[#003ea8] group-hover:text-red-600 transition-colors">
                  close
                </span>
              </button>
            )}

            {/* Search query tag */}
            {filterState.searchQuery && (
              <button
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dbe1ff] text-[#00174b] text-xs font-semibold hover:bg-[#b4c5ff] transition-colors group cursor-pointer"
              >
                <span>Busca: "{filterState.searchQuery}"</span>
                <span className="material-symbols-outlined text-[16px] text-[#003ea8] group-hover:text-red-600 transition-colors">
                  close
                </span>
              </button>
            )}

            <button
              onClick={() => {
                setSliderPrice(250);
                onClearFilters();
              }}
              className="text-[11px] font-bold text-[#0051d5] hover:text-[#003ea8] uppercase tracking-wider ml-1 underline underline-offset-2 cursor-pointer"
            >
              Limpar Tudo
            </button>
          </div>

          {/* Sort & Grid/List Toggle */}
          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs text-[#44474d] hidden sm:inline">
                Ordenar por:
              </label>
              <div className="relative">
                <select
                  id="sort-select"
                  value={filterState.sortBy}
                  onChange={(e) =>
                    onFilterChange({
                      sortBy: e.target.value as FilterState['sortBy'],
                    })
                  }
                  className="appearance-none bg-[#f2f4f6] text-[#191c1e] text-xs font-semibold pl-3 pr-8 py-2 rounded-lg outline-none cursor-pointer focus:bg-white focus:shadow-sm transition-all"
                >
                  <option value="bestsellers">Mais Vendidos</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="newest">Mais Recentes</option>
                  <option value="rating">Melhor Avaliados</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-2 text-[18px] text-[#75777e] pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            {/* Grid / List switch buttons */}
            <div className="flex items-center bg-[#f2f4f6] p-1 rounded-lg">
              <button
                type="button"
                onClick={() => onFilterChange({ viewMode: 'grid' })}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  filterState.viewMode === 'grid'
                    ? 'bg-white text-[#0051d5] shadow-sm'
                    : 'text-[#75777e] hover:text-[#191c1e]'
                }`}
                title="Visualização em Grade"
              >
                <span className="material-symbols-outlined text-[20px] block">grid_view</span>
              </button>
              <button
                type="button"
                onClick={() => onFilterChange({ viewMode: 'list' })}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  filterState.viewMode === 'list'
                    ? 'bg-white text-[#0051d5] shadow-sm'
                    : 'text-[#75777e] hover:text-[#191c1e]'
                }`}
                title="Visualização em Lista"
              >
                <span className="material-symbols-outlined text-[20px] block">view_list</span>
              </button>
            </div>
          </div>
        </section>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Subgenres Facet */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-semibold text-[#000412]">Subgêneros</h3>
                <span className="material-symbols-outlined text-[#75777e] text-[20px]">
                  auto_stories
                </span>
              </div>
              <ul className="space-y-1 text-xs">
                <li>
                  <button
                    onClick={() => onFilterChange({ subgenre: 'all' })}
                    className={`w-full flex items-center justify-between py-1.5 transition-colors cursor-pointer ${
                      !filterState.subgenre || filterState.subgenre === 'all'
                        ? 'text-[#0051d5] font-semibold'
                        : 'text-[#44474d] hover:text-[#191c1e]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          !filterState.subgenre || filterState.subgenre === 'all'
                            ? 'bg-[#0051d5]'
                            : 'bg-transparent'
                        }`}
                      ></span>
                      Todos os Subgêneros
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#eceef0] text-[#75777e]">
                      {books.length}
                    </span>
                  </button>
                </li>
                {subgenres.map((sg) => {
                  const isSelected =
                    filterState.subgenre.toLowerCase() === sg.label.toLowerCase();
                  return (
                    <li key={sg.label}>
                      <button
                        onClick={() => onFilterChange({ subgenre: sg.label })}
                        className={`w-full flex items-center justify-between py-1.5 transition-colors cursor-pointer ${
                          isSelected
                            ? 'text-[#0051d5] font-bold'
                            : 'text-[#44474d] hover:text-[#191c1e]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSelected ? 'bg-[#0051d5]' : 'bg-transparent'
                            }`}
                          ></span>
                          {sg.label}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-[#dbe1ff] text-[#00174b]'
                              : 'bg-[#eceef0] text-[#75777e]'
                          }`}
                        >
                          {sg.count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Price Range Slider */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-semibold text-[#000412]">Faixa de Preço</h3>
                <span className="material-symbols-outlined text-[#75777e] text-[20px]">
                  payments
                </span>
              </div>
              <div className="space-y-4">
                <div className="relative pt-2">
                  <input
                    type="range"
                    min="20"
                    max="250"
                    value={sliderPrice}
                    onChange={(e) => setSliderPrice(Number(e.target.value))}
                    onMouseUp={handleSliderRelease}
                    onTouchEnd={handleSliderRelease}
                    className="w-full h-1.5 bg-[#e0e3e5] rounded-lg appearance-none cursor-pointer accent-[#0051d5]"
                  />
                  <div className="flex justify-between text-[11px] font-bold text-[#75777e] mt-2">
                    <span>R$ 20</span>
                    <span>R$ 250</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#f2f4f6] rounded-lg p-2 flex flex-col">
                    <span className="text-[10px] text-[#75777e] font-bold uppercase">Mínimo</span>
                    <span className="text-sm font-bold text-[#000412]">R$ 20,00</span>
                  </div>
                  <div className="bg-[#f2f4f6] rounded-lg p-2 flex flex-col">
                    <span className="text-[10px] text-[#75777e] font-bold uppercase">Máximo</span>
                    <span className="text-sm font-bold text-[#000412]">
                      R$ {sliderPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSliderRelease}
                  className="w-full bg-[#000412] hover:bg-[#0f1e36] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  Filtrar Preço
                </button>
              </div>
            </div>

            {/* Physical Format Facet */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-serif text-lg font-semibold text-[#000412] mb-4">
                Formato Físico
              </h3>
              <div className="space-y-2 text-xs">
                {formatsList.map((fmt) => {
                  const isChecked = filterState.formats.includes(fmt.id);
                  return (
                    <label
                      key={fmt.id}
                      className="flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleFormat(fmt.id)}
                          className="w-4 h-4 rounded text-[#0051d5] accent-[#0051d5] cursor-pointer"
                        />
                        <span
                          className={`transition-colors ${
                            isChecked
                              ? 'text-[#000412] font-semibold'
                              : 'text-[#44474d] group-hover:text-[#0051d5]'
                          }`}
                        >
                          {fmt.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[#75777e]">{fmt.count}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Critical Rating Facet */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-serif text-lg font-semibold text-[#000412] mb-4">
                Avaliação Crítica
              </h3>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => onFilterChange({ minRating: 4.5 })}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors text-left cursor-pointer ${
                    filterState.minRating === 4.5
                      ? 'bg-[#dbe1ff] text-[#00174b] font-bold'
                      : 'hover:bg-[#f2f4f6]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-500">
                      <span className="material-symbols-outlined text-[16px] text-amber-500">star</span>
                      <span className="material-symbols-outlined text-[16px] text-amber-500">star</span>
                      <span className="material-symbols-outlined text-[16px] text-amber-500">star</span>
                      <span className="material-symbols-outlined text-[16px] text-amber-500">star</span>
                      <span className="material-symbols-outlined text-[16px] text-amber-500">star_half</span>
                    </div>
                    <span className="text-xs font-medium">4.5 & acima</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#75777e]">47</span>
                </button>

                <button
                  onClick={() => onFilterChange({ minRating: 4.0 })}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors text-left cursor-pointer ${
                    filterState.minRating === 4.0
                      ? 'bg-[#dbe1ff] text-[#00174b] font-bold'
                      : 'bg-[#f2f4f6]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-500">
                      <span className="material-symbols-outlined text-[16px] text-amber-500">star</span>
                      <span className="material-symbols-outlined text-[16px] text-amber-500">star</span>
                      <span className="material-symbols-outlined text-[16px] text-amber-500">star</span>
                      <span className="material-symbols-outlined text-[16px] text-amber-500">star</span>
                      <span className="material-symbols-outlined text-[16px] text-[#c5c6ce]">star</span>
                    </div>
                    <span className="text-xs font-bold text-[#0051d5]">4.0 & acima</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#003ea8]">89</span>
                </button>

                <button
                  onClick={() => onFilterChange({ minRating: 3.0 })}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors text-left cursor-pointer ${
                    filterState.minRating === 3.0
                      ? 'bg-[#dbe1ff] text-[#00174b] font-bold'
                      : 'hover:bg-[#f2f4f6]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-500">
                      <span className="material-symbols-outlined text-[16px] text-amber-500">star</span>
                      <span className="material-symbols-outlined text-[16px] text-amber-500">star</span>
                      <span className="material-symbols-outlined text-[16px] text-amber-500">star</span>
                      <span className="material-symbols-outlined text-[16px] text-[#c5c6ce]">star</span>
                      <span className="material-symbols-outlined text-[16px] text-[#c5c6ce]">star</span>
                    </div>
                    <span className="text-xs text-[#44474d]">3.0 & acima</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#75777e]">115</span>
                </button>
              </div>
            </div>

            {/* Availability Facet */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-serif text-lg font-semibold text-[#000412] mb-4">
                Disponibilidade
              </h3>
              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded text-[#0051d5] accent-[#0051d5] cursor-pointer"
                    />
                    <span className="text-[#000412] font-semibold group-hover:text-[#0051d5] transition-colors">
                      Pronta Entrega Imediata
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#75777e]">102</span>
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded text-[#0051d5] accent-[#0051d5] cursor-pointer"
                    />
                    <span className="text-[#44474d] group-hover:text-[#0051d5] transition-colors">
                      Pré-venda com Brinde
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#75777e]">26</span>
                </label>
              </div>
            </div>

            {/* Publishers Facet */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-serif text-lg font-semibold text-[#000412] mb-4">
                Editora & Selos
              </h3>
              <div className="space-y-2 text-xs">
                {publishersList.map((pub) => {
                  const isChecked = filterState.publishers.includes(pub.id);
                  return (
                    <label
                      key={pub.id}
                      className="flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => togglePublisher(pub.id)}
                          className="w-4 h-4 rounded text-[#0051d5] accent-[#0051d5] cursor-pointer"
                        />
                        <span
                          className={`transition-colors ${
                            isChecked
                              ? 'text-[#000412] font-semibold'
                              : 'text-[#44474d] group-hover:text-[#0051d5]'
                          }`}
                        >
                          {pub.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[#75777e]">{pub.count}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Free Shipping Progress Card */}
            <div className="bg-[#0f1e36] text-white rounded-xl p-5 shadow-md">
              <div className="flex items-center gap-2 text-[#dbe1ff] mb-1">
                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Benefício do Leitor
                </span>
              </div>
              <h4 className="font-serif text-lg text-white mb-1">Frete Grátis Brasil</h4>
              <p className="text-xs text-[#b8c7e6] mb-4 leading-relaxed">
                Em compras a partir de R$ 119. Seus livros viajam embalados com tripla camada e
                proteção de cantoneira.
              </p>
              <div className="w-full bg-[#001c46] rounded-full h-2 mb-2 overflow-hidden">
                <div
                  className="bg-[#0051d5] h-full rounded-full transition-all duration-500"
                  style={{ width: `${shippingProgressPercent}%` }}
                ></div>
              </div>
              <span className="text-[11px] text-[#d8e2ff]">
                {remainingForFreeShipping > 0
                  ? `Faltam R$ ${remainingForFreeShipping.toFixed(2).replace('.', ',')} na sacola para frete cortesia`
                  : '✨ Parabéns! Você atingiu o benefício de Frete Grátis!'}
              </span>
            </div>
          </aside>

          {/* Book Catalog List / Grid */}
          <main className="lg:col-span-9 flex flex-col">
            {displayedBooks.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                <span className="material-symbols-outlined text-[48px] text-[#75777e] mb-3">
                  search_off
                </span>
                <h3 className="font-serif text-2xl text-[#000412] mb-2">Nenhum livro encontrado</h3>
                <p className="text-sm text-[#44474d] mb-6">
                  Tente ajustar ou limpar seus filtros ativos para ver mais opções do catálogo.
                </p>
                <button
                  type="button"
                  onClick={onClearFilters}
                  className="bg-[#0051d5] hover:bg-[#003ea8] text-white text-xs font-semibold px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Limpar Todos os Filtros
                </button>
              </div>
            ) : filterState.viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedBooks.map((book) => {
                  const isWishlisted = wishlistBookIds.has(book.id);
                  const isAddedJustNow = addedAnimationId === book.id;

                  return (
                    <article
                      key={book.id}
                      onClick={() => onSelectBook(book.id)}
                      className="bg-white rounded-xl p-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
                    >
                      <div>
                        {/* Book Cover Frame */}
                        <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden bg-[#eceef0] mb-3 shadow-[inset_4px_0_6px_-1px_rgba(15,30,54,0.25)]">
                          <img
                            src={book.coverImage}
                            alt={`Capa do livro ${book.title}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />

                          {/* Badge */}
                          {book.badge && (
                            <span className="absolute top-2 left-2 bg-[#000412] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow tracking-wider uppercase">
                              {book.badge.includes('•') ? book.badge.split('•')[0].trim() : book.badge}
                            </span>
                          )}
                          {!book.badge && book.discount && (
                            <span className="absolute top-2 left-2 bg-[#0051d5] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow tracking-wider uppercase">
                              {book.discount}
                            </span>
                          )}

                          {/* Wishlist Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleWishlist(book.id);
                            }}
                            className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow cursor-pointer ${
                              isWishlisted ? 'text-red-600' : 'text-[#75777e] hover:text-red-500'
                            }`}
                            title={isWishlisted ? 'Remover dos Desejos' : 'Adicionar aos Desejos'}
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {isWishlisted ? 'favorite' : 'favorite_border'}
                            </span>
                          </button>
                        </div>

                        {/* Subgenre Tag */}
                        <span className="text-[11px] font-bold text-[#0051d5] uppercase tracking-wider block">
                          {book.subgenre}
                        </span>

                        {/* Title */}
                        <h2 className="font-serif text-[17px] font-semibold text-[#000412] line-clamp-1 mt-1 group-hover:text-[#0051d5] transition-colors leading-tight">
                          {book.title}
                        </h2>

                        {/* Author */}
                        <p className="text-xs text-[#0051d5] font-medium mt-0.5">{book.author}</p>

                        {/* Rating */}
                        <div className="flex items-center gap-1 my-1.5 text-xs">
                          <span className="material-symbols-outlined text-[16px] text-amber-500">
                            star
                          </span>
                          <span className="font-bold text-[#191c1e]">{book.rating.toFixed(1)}</span>
                          <span className="text-[#75777e] text-[11px]">({book.reviewsCount})</span>
                        </div>

                        {/* Physical Format */}
                        <p className="text-[11px] font-semibold text-[#75777e] uppercase tracking-wider mb-2">
                          {book.physicalFormat}
                        </p>
                      </div>

                      {/* Pricing and Action Button */}
                      <div className="pt-2 border-t border-slate-100">
                        <div className="flex items-baseline gap-2">
                          {book.strikePrice > book.price && (
                            <span className="text-[11px] font-semibold text-[#75777e] line-through">
                              R$ {book.strikePrice.toFixed(2).replace('.', ',')}
                            </span>
                          )}
                          <span className="text-base font-bold text-[#000412]">
                            R$ {book.price.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#0051d5] font-bold block mb-3">
                          R$ {book.pixPrice.toFixed(2).replace('.', ',')} no Pix (5% OFF)
                        </span>

                        <button
                          type="button"
                          onClick={(e) => handleAddClick(book, e)}
                          className={`w-full py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm text-xs font-semibold cursor-pointer ${
                            isAddedJustNow
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#0051d5] hover:bg-[#003ea8] text-white'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {isAddedJustNow ? 'check' : 'keyboard_double_arrow_left'}
                          </span>
                          <span>{isAddedJustNow ? 'Adicionado!' : 'Adicionar'}</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* List View Mode */
              <div className="space-y-4">
                {displayedBooks.map((book) => {
                  const isWishlisted = wishlistBookIds.has(book.id);
                  const isAddedJustNow = addedAnimationId === book.id;

                  return (
                    <article
                      key={book.id}
                      onClick={() => onSelectBook(book.id)}
                      className="bg-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="w-20 sm:w-24 aspect-[2/3] shrink-0 rounded-lg overflow-hidden bg-[#eceef0] shadow-sm">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="space-y-1 text-left">
                          <span className="text-[10px] font-bold text-[#0051d5] uppercase tracking-wider">
                            {book.subgenre}
                          </span>
                          <h2 className="font-serif text-lg font-semibold text-[#000412] group-hover:text-[#0051d5] transition-colors">
                            {book.title}
                          </h2>
                          <p className="text-xs text-[#0051d5] font-medium">{book.author}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <div className="flex items-center text-amber-500">
                              <span className="material-symbols-outlined text-[15px]">star</span>
                              <span className="font-bold text-[#191c1e] ml-0.5">{book.rating}</span>
                            </div>
                            <span className="text-[#75777e]">•</span>
                            <span className="text-[#75777e] text-[11px]">{book.physicalFormat}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <div className="text-left sm:text-right">
                          {book.strikePrice > book.price && (
                            <span className="text-[11px] font-semibold text-[#75777e] line-through block">
                              R$ {book.strikePrice.toFixed(2).replace('.', ',')}
                            </span>
                          )}
                          <span className="text-lg font-bold text-[#000412] block">
                            R$ {book.price.toFixed(2).replace('.', ',')}
                          </span>
                          <span className="text-[11px] text-[#0051d5] font-bold block">
                            R$ {book.pixPrice.toFixed(2).replace('.', ',')} no Pix
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleWishlist(book.id);
                            }}
                            className={`p-2 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer ${
                              isWishlisted ? 'text-red-600 bg-red-50' : 'text-[#75777e]'
                            }`}
                            title="Desejos"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {isWishlisted ? 'favorite' : 'favorite_border'}
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleAddClick(book, e)}
                            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer ${
                              isAddedJustNow
                                ? 'bg-emerald-600 text-white'
                                : 'bg-[#0051d5] hover:bg-[#003ea8] text-white'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {isAddedJustNow ? 'check' : 'shopping_bag'}
                            </span>
                            <span>{isAddedJustNow ? 'Adicionado' : 'Adicionar'}</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Pagination & Load More */}
            <div className="mt-12 pt-8 flex flex-col items-center gap-6">
              {visibleCount < sortedBooks.length && (
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => Math.min(prev + 12, sortedBooks.length))}
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#eceef0] text-[#000412] text-xs font-semibold px-8 py-3 rounded-lg shadow-sm transition-all hover:shadow cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] text-[#0051d5]">sync</span>
                  <span>
                    Carregar mais 12 títulos (restam {sortedBooks.length - visibleCount})
                  </span>
                </button>
              )}

              {/* Page Number Buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-10 h-10 rounded-lg bg-[#f2f4f6] text-[#75777e] hover:text-[#000412] flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  className={`w-10 h-10 rounded-lg text-xs font-semibold shadow-sm cursor-pointer ${
                    currentPage === 1
                      ? 'bg-[#0051d5] text-white'
                      : 'bg-white hover:bg-[#eceef0] text-[#191c1e]'
                  }`}
                >
                  1
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(2)}
                  className={`w-10 h-10 rounded-lg text-xs font-semibold shadow-sm cursor-pointer ${
                    currentPage === 2
                      ? 'bg-[#0051d5] text-white'
                      : 'bg-white hover:bg-[#eceef0] text-[#191c1e]'
                  }`}
                >
                  2
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(3)}
                  className={`w-10 h-10 rounded-lg text-xs font-semibold shadow-sm cursor-pointer ${
                    currentPage === 3
                      ? 'bg-[#0051d5] text-white'
                      : 'bg-white hover:bg-[#eceef0] text-[#191c1e]'
                  }`}
                >
                  3
                </button>
                <span className="w-8 text-center text-[#75777e] text-xs font-semibold">...</span>
                <button
                  type="button"
                  onClick={() => setCurrentPage(11)}
                  className={`w-10 h-10 rounded-lg text-xs font-semibold shadow-sm cursor-pointer ${
                    currentPage === 11
                      ? 'bg-[#0051d5] text-white'
                      : 'bg-white hover:bg-[#eceef0] text-[#191c1e]'
                  }`}
                >
                  11
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="w-10 h-10 rounded-lg bg-[#f2f4f6] text-[#75777e] hover:text-[#000412] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
