import React, { useState, useRef } from 'react';
import { Book, Review, BookFormat } from '../types';

interface ProductDetailViewProps {
  book: Book;
  onBackToCatalog: () => void;
  onAddToCart: (book: Book, formatId?: string, qty?: number) => void;
  onInstantBuy: (book: Book, formatId?: string, qty?: number) => void;
  onToggleWishlist: (bookId: string) => void;
  isWishlisted: boolean;
  onOpenSampleReader: () => void;
  onOpenWriteReview: () => void;
  reviews: Review[];
  onUpvoteReview: (reviewId: string) => void;
  recommendations: Book[];
  onSelectBook: (bookId: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  book,
  onBackToCatalog,
  onAddToCart,
  onInstantBuy,
  onToggleWishlist,
  isWishlisted,
  onOpenSampleReader,
  onOpenWriteReview,
  reviews,
  onUpvoteReview,
  recommendations,
  onSelectBook,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedFormatId, setSelectedFormatId] = useState<string>(
    book.formats ? book.formats[0].id : 'capa-dura'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'sinopse' | 'ficha' | 'curadoria'>('sinopse');
  const [cepInput, setCepInput] = useState<string>('01310-100');
  const [isCalculatingShipping, setIsCalculatingShipping] = useState<boolean>(false);
  const [shippingCalculated, setShippingCalculated] = useState<boolean>(true);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  // Gallery images fallback to book cover
  const gallery = book.gallery && book.gallery.length > 0
    ? book.gallery
    : [{ title: 'Capa Frontal', url: book.coverImage }];

  const currentCoverUrl = gallery[selectedImageIndex]?.url || book.coverImage;

  // Formats fallback
  const currentFormat: BookFormat = book.formats?.find((f) => f.id === selectedFormatId) || {
    id: 'capa-dura',
    name: 'Capa Dura',
    price: book.price,
    strikePrice: book.strikePrice,
    pixPrice: book.pixPrice,
    discount: book.discount || '20% OFF',
    details: 'Fitilho & Verniz',
    stock: book.stock,
  };

  const handleFormatChange = (fmt: BookFormat) => {
    setSelectedFormatId(fmt.id);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > 10) return 10;
      return next;
    });
  };

  const handleAddToCart = () => {
    onAddToCart(book, selectedFormatId, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 1800);
  };

  const handleSimulateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cepInput) return;
    setIsCalculatingShipping(true);
    setTimeout(() => {
      setIsCalculatingShipping(false);
      setShippingCalculated(true);
    }, 350);
  };

  const scrollCarousel = (direction: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: direction * 320, behavior: 'smooth' });
    }
  };

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full pt-36 md:pt-40 bg-gradient-to-b from-[#f2f4f6]/60 via-[#f7f9fb] to-[#f7f9fb] pb-16">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Navegação Estrutural"
          className="py-4 flex items-center justify-between text-xs text-[#44474d] overflow-x-auto whitespace-nowrap"
        >
          <div className="flex items-center gap-1.5">
            <button
              onClick={onBackToCatalog}
              className="hover:text-[#0051d5] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Início</span>
            </button>
            <span className="text-[#c5c6ce] text-[14px]">/</span>
            <button
              onClick={onBackToCatalog}
              className="hover:text-[#0051d5] transition-colors cursor-pointer"
            >
              {book.subgenre || 'Ficção Científica'}
            </button>
            <span className="text-[#c5c6ce] text-[14px]">/</span>
            <span className="text-[#191c1e] font-semibold truncate max-w-xs md:max-w-md">
              {book.title} — {book.subtitle || 'Edição Especial'}
            </span>
          </div>

          <button
            onClick={onBackToCatalog}
            className="hidden sm:flex items-center gap-1 text-[#0051d5] hover:text-[#003ea8] font-bold text-xs cursor-pointer ml-4"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Voltar ao Catálogo</span>
          </button>
        </nav>

        {/* Main Product Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2">
          {/* Left Column: Gallery & Tactile Artifact Preview */}
          <div className="lg:col-span-6 flex flex-col gap-6 lg:sticky lg:top-36">
            {/* Primary Book Showcase Frame with Physical Realism Shadows */}
            <div className="relative bg-white rounded-xl p-6 lg:p-10 flex flex-col items-center justify-center shadow-sm overflow-hidden group">
              {/* Background Ambience Ambient Light */}
              <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#dbe1ff]/35 blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#d8e2ff]/35 blur-3xl pointer-events-none"></div>

              {/* Tactile 3D Book Display */}
              <div className="relative w-64 sm:w-80 md:w-88 aspect-[2/3] my-2 flex items-center justify-center transition-transform duration-500 ease-out group-hover:-translate-y-2">
                {/* Physical Crease & Book Drop Shadow Emulation */}
                <div className="absolute inset-0 rounded-r-lg shadow-[-16px_24px_48px_-8px_rgba(15,30,54,0.28),-4px_8px_16px_-2px_rgba(15,30,54,0.14)] pointer-events-none z-10"></div>

                {/* Hardcover Hinge and Spine Overlay Effect */}
                <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-[#000412]/35 via-[#000412]/10 to-transparent z-20 pointer-events-none rounded-l-sm"></div>
                <div className="absolute left-1.5 top-0 bottom-0 w-[1px] bg-white/40 z-20 pointer-events-none"></div>

                {/* Main Cover Image */}
                <img
                  src={currentCoverUrl}
                  alt={`Capa de livro ${book.title}`}
                  className="w-full h-full object-cover rounded-r-md rounded-l-sm select-none"
                />

                {/* Satin Ribbon Bookmark Simulation (Fitilho Azul) */}
                <div className="absolute -bottom-7 right-14 w-3.5 h-16 bg-gradient-to-b from-[#0051d5] to-[#0f1e36] shadow-md z-30 transform rotate-3 origin-top rounded-b-sm pointer-events-none">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
              </div>

              {/* Zoom & Inspect Tip */}
              <div className="w-full flex items-center justify-between text-xs text-[#75777e] pt-4 border-t border-slate-100">
                <span className="flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase text-[#000412]">
                  <span className="material-symbols-outlined text-[15px] text-[#0051d5]">verified</span>
                  Encadernação artesanal em tecido & papel pólen
                </span>
                <span className="flex items-center gap-1 text-[11px] text-[#44474d]">
                  <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                  Passe o mouse para ampliar
                </span>
              </div>
            </div>

            {/* Thumbnails Strip */}
            <div className="grid grid-cols-4 gap-3">
              {gallery.map((thumb, index) => {
                const isActive = selectedImageIndex === index;
                return (
                  <button
                    key={thumb.title}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-[2/3] rounded-lg overflow-hidden bg-[#eceef0] transition-all cursor-pointer ${
                      isActive
                        ? 'ring-2 ring-[#0051d5] ring-offset-2 opacity-100 shadow-md'
                        : 'opacity-80 hover:opacity-100 hover:shadow'
                    }`}
                  >
                    <img
                      src={thumb.url}
                      alt={thumb.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 inset-x-1 text-[9px] font-bold text-center uppercase tracking-wider bg-[#000412]/80 text-white py-0.5 rounded">
                      {thumb.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Digital Sample Callout (Degustação Digital) */}
            <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#dbe1ff] flex items-center justify-center shrink-0 text-[#0051d5]">
                  <span className="material-symbols-outlined text-[28px]">menu_book</span>
                </div>
                <div className="text-left">
                  <h4 className="font-serif text-base font-semibold text-[#000412]">
                    Degustação Digital Gratuita
                  </h4>
                  <p className="text-xs text-[#44474d]">
                    Leia agora o prólogo e os 2 primeiros capítulos (20 páginas) em PDF interativo.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenSampleReader}
                className="w-full sm:w-auto shrink-0 bg-[#f2f4f6] hover:bg-[#eceef0] text-[#000412] text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px] text-[#0051d5]">
                  visibility
                </span>
                <span>Espiar Amostra</span>
              </button>
            </div>
          </div>

          {/* Right Column: Commercial Information, Purchasing Engine & Badges */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            {/* Badges & Accreditations */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#0f1e36] text-white text-[11px] font-bold uppercase px-3 py-1 rounded tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-[#d8e2ff]">
                  award_star
                </span>
                Livro do Mês • Curadoria Lumina
              </span>
              <span className="bg-[#dbe1ff] text-[#00174b] text-[11px] font-bold uppercase px-3 py-1 rounded tracking-wider">
                Edição Especial de Luxo
              </span>
              <span className="bg-[#e0e3e5] text-[#44474d] text-[11px] font-bold uppercase px-3 py-1 rounded tracking-wider">
                Tiragem Limitada
              </span>
            </div>

            {/* Main Title and Attribution Hierarchy */}
            <div className="space-y-1">
              <h1 className="font-serif text-3xl sm:text-4xl text-[#000412] font-medium tracking-tight leading-tight">
                {book.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#44474d]">
                <span>
                  Por{' '}
                  <button
                    onClick={onBackToCatalog}
                    className="text-[#0051d5] font-semibold hover:underline cursor-pointer"
                  >
                    {book.author}
                  </button>
                </span>
                <span className="text-[#c5c6ce]">•</span>
                <span>
                  Editora:{' '}
                  <strong className="text-[#191c1e] font-semibold">{book.publisher}</strong>
                </span>
                <span className="text-[#c5c6ce]">•</span>
                <button
                  onClick={onBackToCatalog}
                  className="text-[#0051d5] text-[11px] font-bold uppercase tracking-wider hover:underline cursor-pointer"
                >
                  Ver +4 obras do autor
                </button>
              </div>
            </div>

            {/* Reader Rating Summary Line */}
            <div className="flex items-center gap-2 py-1">
              <div className="flex items-center text-amber-500">
                <span className="material-symbols-outlined text-[20px]">star</span>
                <span className="material-symbols-outlined text-[20px]">star</span>
                <span className="material-symbols-outlined text-[20px]">star</span>
                <span className="material-symbols-outlined text-[20px]">star</span>
                <span className="material-symbols-outlined text-[20px]">star</span>
              </div>
              <span className="text-base font-bold text-[#000412]">{book.rating.toFixed(1)}</span>
              <span className="text-xs text-[#44474d]">
                ({book.reviewsCount} resenhas de compradores verificados)
              </span>
              <span className="text-[#c5c6ce]">•</span>
              <button
                type="button"
                onClick={scrollToReviews}
                className="text-[#0051d5] text-xs font-semibold hover:underline uppercase tracking-wider cursor-pointer"
              >
                Ver avaliações
              </button>
            </div>

            {/* Pricing & Instant Savings Card */}
            <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm space-y-3 border border-slate-100">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl text-[#000412] font-semibold tracking-tight">
                  R$ {currentFormat.price.toFixed(2).replace('.', ',')}
                </span>
                {currentFormat.strikePrice > currentFormat.price && (
                  <span className="line-through text-sm text-[#75777e] font-medium">
                    R$ {currentFormat.strikePrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
                <span className="bg-[#dbe1ff] text-[#0051d5] text-xs px-2 py-0.5 rounded uppercase font-bold">
                  {currentFormat.discount}
                </span>
              </div>

              {/* Pix Highlight & Installment Breakdown */}
              <div className="flex flex-col gap-1 text-xs">
                <div className="flex items-center gap-1.5 text-[#191c1e] font-semibold">
                  <span className="material-symbols-outlined text-[18px] text-[#0051d5]">
                    qr_code_2
                  </span>
                  <span>
                    ou{' '}
                    <strong className="text-[#0051d5] text-sm font-bold">
                      R$ {currentFormat.pixPrice.toFixed(2).replace('.', ',')}
                    </strong>{' '}
                    à vista no Pix (5% de desconto extra)
                  </span>
                </div>
                <p className="text-[#44474d] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">credit_card</span>
                  ou em até{' '}
                  <strong className="text-[#191c1e]">
                    3x de R$ {(currentFormat.price / 3).toFixed(2).replace('.', ',')}
                  </strong>{' '}
                  sem juros nos cartões de crédito
                </p>
              </div>
            </div>

            {/* Format Selector: Segmented Editorial Blocks */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#44474d] uppercase tracking-wider block">
                Selecione o Formato / Edição:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {book.formats &&
                  book.formats.map((fmt) => {
                    const isSelected = selectedFormatId === fmt.id;
                    return (
                      <button
                        key={fmt.id}
                        type="button"
                        onClick={() => handleFormatChange(fmt)}
                        className={`text-left p-3 rounded-lg shadow-sm flex flex-col justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#f2f4f6] ring-2 ring-[#0051d5]'
                            : 'bg-white hover:bg-slate-50 border border-slate-100'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <span className="text-xs text-[#000412] font-bold">{fmt.name}</span>
                          <span
                            className={`material-symbols-outlined text-[18px] ${
                              isSelected ? 'text-[#0051d5]' : 'text-[#c5c6ce]'
                            }`}
                          >
                            {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                        </div>
                        <div className="mt-2">
                          <span
                            className={`text-sm font-bold block ${
                              isSelected ? 'text-[#0051d5]' : 'text-[#000412]'
                            }`}
                          >
                            R$ {fmt.price.toFixed(2).replace('.', ',')}
                          </span>
                          <span className="text-[11px] text-[#75777e] block">{fmt.details}</span>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Stock Urgency Alert Pill */}
            <div className="bg-[#e0e3e5]/60 rounded-lg p-3 flex items-center gap-2 border border-slate-200">
              <span className="material-symbols-outlined text-red-600 text-[20px] animate-pulse">
                inventory_2
              </span>
              <p className="text-xs text-[#191c1e]">
                <strong className="text-[#000412] font-bold">
                  Apenas {currentFormat.stock} exemplares
                </strong>{' '}
                em estoque no centro de distribuição de São Paulo.
              </p>
            </div>

            {/* Quantity Selector & Action Controls */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-3">
                {/* Modern Stepper Counter */}
                <div className="flex items-center bg-white rounded-lg shadow-sm p-1 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    className="w-8 h-8 rounded flex items-center justify-center text-[#44474d] hover:bg-[#eceef0] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">remove</span>
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-[#000412]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                    className="w-8 h-8 rounded flex items-center justify-center text-[#44474d] hover:bg-[#eceef0] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-4 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer border ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white hover:bg-slate-50 text-[#000412] border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      addedSuccess ? 'text-white' : 'text-[#0051d5]'
                    }`}
                  >
                    {addedSuccess ? 'check' : 'shopping_bag'}
                  </span>
                  <span>{addedSuccess ? 'Adicionado com Sucesso!' : 'Adicionar à Sacola'}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => onToggleWishlist(book.id)}
                  title={isWishlisted ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                  className={`w-12 h-12 rounded-lg bg-white hover:bg-slate-50 flex items-center justify-center shadow-sm border border-slate-200 transition-colors cursor-pointer ${
                    isWishlisted ? 'text-red-600 bg-red-50' : 'text-[#44474d] hover:text-red-500'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {isWishlisted ? 'favorite' : 'favorite_border'}
                  </span>
                </button>
              </div>

              {/* 1-Click Express Buy CTA */}
              <button
                type="button"
                onClick={() => onInstantBuy(book, selectedFormatId, quantity)}
                className="w-full bg-[#0051d5] hover:bg-[#003ea8] text-white text-sm font-bold py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">bolt</span>
                <span>Comprar Agora (1-Click Express)</span>
              </button>
            </div>

            {/* Freight and Delivery Calculator */}
            <div className="bg-white p-4 rounded-xl shadow-sm space-y-3 border border-slate-100">
              <div className="flex items-center gap-2 text-[#191c1e] text-xs font-semibold">
                <span className="material-symbols-outlined text-[18px] text-[#0051d5]">
                  local_shipping
                </span>
                <span>Calcular Frete e Prazos de Entrega</span>
              </div>
              <form onSubmit={handleSimulateShipping} className="flex gap-2">
                <input
                  type="text"
                  value={cepInput}
                  onChange={(e) => setCepInput(e.target.value)}
                  maxLength={9}
                  placeholder="00000-000"
                  className="w-full px-3 py-2 bg-[#f2f4f6] rounded-lg text-xs text-[#191c1e] outline-none focus:ring-2 focus:ring-[#0051d5] placeholder:text-[#75777e]"
                />
                <button
                  type="submit"
                  disabled={isCalculatingShipping}
                  className="bg-[#000412] text-white hover:bg-[#0f1e36] text-xs font-semibold px-4 py-2 rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  {isCalculatingShipping ? 'Calculando...' : 'Calcular'}
                </button>
              </form>

              {/* Shipping results */}
              {shippingCalculated && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between p-2.5 bg-[#f2f4f6] rounded-lg text-xs">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#0051d5]">
                        flash_on
                      </span>
                      <div>
                        <strong className="text-[#191c1e] block">Sedex Express</strong>
                        <span className="text-[#44474d] text-[11px]">
                          Entrega em até 2 dias úteis
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-[#191c1e]">R$ 12,90</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-[#f2f4f6] rounded-lg text-xs">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#000412]">
                        eco
                      </span>
                      <div>
                        <strong className="text-[#191c1e] block">Econômico Registrado</strong>
                        <span className="text-[#44474d] text-[11px]">
                          Entrega em até 5 dias úteis
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#0051d5] font-bold uppercase tracking-wider">
                      Frete Grátis
                    </span>
                  </div>
                </div>
              )}

              {/* Guarantee badges */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-[#44474d] border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#0051d5]">
                    verified_user
                  </span>
                  <span>Embalagem protetora</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#0051d5]">
                    autorenew
                  </span>
                  <span>Devolução em 30 dias</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Deep Content Architecture */}
        <div className="mt-12 bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-100">
          {/* Tab Navigation */}
          <div className="flex items-center gap-6 border-b border-[#e0e3e5] overflow-x-auto pb-2">
            <button
              type="button"
              onClick={() => setActiveTab('sinopse')}
              className={`pb-2 font-serif text-lg transition-colors cursor-pointer shrink-0 ${
                activeTab === 'sinopse'
                  ? 'text-[#000412] border-b-2 border-[#000412] font-semibold'
                  : 'text-[#44474d] hover:text-[#000412]'
              }`}
            >
              Sinopse & Enredo
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ficha')}
              className={`pb-2 font-serif text-lg transition-colors cursor-pointer shrink-0 ${
                activeTab === 'ficha'
                  ? 'text-[#000412] border-b-2 border-[#000412] font-semibold'
                  : 'text-[#44474d] hover:text-[#000412]'
              }`}
            >
              Ficha Técnica & Especificações
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('curadoria')}
              className={`pb-2 font-serif text-lg transition-colors cursor-pointer shrink-0 ${
                activeTab === 'curadoria'
                  ? 'text-[#000412] border-b-2 border-[#000412] font-semibold'
                  : 'text-[#44474d] hover:text-[#000412]'
              }`}
            >
              Sobre Esta Edição Especial
            </button>
          </div>

          {/* Tab 1: Sinopse */}
          {activeTab === 'sinopse' && (
            <div className="pt-6 space-y-4 max-w-4xl text-left">
              <p className="text-base text-[#191c1e] leading-relaxed">
                {book.synopsis ||
                  'No limiar do século XXIV, nos confins esquecidos da Estação de Observação Helion-9, repousa um monumental relicário de dados astronômicos chamado simplesmente de O Arquivo.'}
              </p>

              {/* Pull quote */}
              <div className="bg-[#f2f4f6] p-6 rounded-xl my-4 relative overflow-hidden">
                <span className="material-symbols-outlined text-[64px] text-[#000412]/10 absolute -right-2 -bottom-2 pointer-events-none select-none">
                  format_quote
                </span>
                <p className="font-serif italic text-lg sm:text-xl text-[#000412] mb-1">
                  {book.quote ||
                    '“Nenhuma estrela desaparece verdadeiramente sem antes deixar seu eco gravado no tecido do tempo; nós é que nos esquecemos de como ouvir o silêncio.”'}
                </p>
                <span className="text-[11px] font-bold text-[#44474d] uppercase tracking-widest block">
                  {book.quoteAuthor || '— Trecho do Capítulo IV, Pág. 87'}
                </span>
              </div>

              <p className="text-sm text-[#44474d] leading-relaxed">
                {book.extendedText ||
                  'Entre perseguições silenciosas pelo vácuo espacial, conspirações diplomáticas interestelares e reflexões profundas sobre solidão, legado e a finitude cósmica, tece-se uma tapeçaria magistral de ficção científica especulativa contemporânea.'}
              </p>
            </div>
          )}

          {/* Tab 2: Ficha Técnica */}
          {activeTab === 'ficha' && (
            <div className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-[#f2f4f6] rounded-lg text-xs">
                    <span className="text-[#44474d]">Título Original</span>
                    <span className="text-[#000412] font-semibold">
                      {book.specs?.originalTitle || book.title}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg text-xs">
                    <span className="text-[#44474d]">ISBN-13</span>
                    <span className="text-[#000412] font-mono font-medium">
                      {book.specs?.isbn || '978-85-98765-43-2'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#f2f4f6] rounded-lg text-xs">
                    <span className="text-[#44474d]">Número de Páginas</span>
                    <span className="text-[#000412] font-semibold">
                      {book.specs?.pages || '464 páginas'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg text-xs">
                    <span className="text-[#44474d]">Idioma</span>
                    <span className="text-[#000412] font-semibold">
                      {book.specs?.language || 'Português Brasileiro'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#f2f4f6] rounded-lg text-xs">
                    <span className="text-[#44474d]">Tradução</span>
                    <span className="text-[#000412] font-semibold">
                      {book.specs?.translation || 'Ana Lúcia Ribeiro'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-[#f2f4f6] rounded-lg text-xs">
                    <span className="text-[#44474d]">Acabamento Gráfico</span>
                    <span className="text-[#000412] font-semibold">
                      {book.specs?.finish || 'Capa dura com verniz localizado & hot stamping'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg text-xs">
                    <span className="text-[#44474d]">Papel do Miolo</span>
                    <span className="text-[#000412] font-semibold">
                      {book.specs?.paper || 'Pólen Natural 80 g/m²'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#f2f4f6] rounded-lg text-xs">
                    <span className="text-[#44474d]">Dimensões Físicas</span>
                    <span className="text-[#000412] font-semibold">
                      {book.specs?.dimensions || '16,0 x 23,0 x 3,2 cm'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg text-xs">
                    <span className="text-[#44474d]">Peso do Volume</span>
                    <span className="text-[#000412] font-semibold">
                      {book.specs?.weight || '680 gramas'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#f2f4f6] rounded-lg text-xs">
                    <span className="text-[#44474d]">Ano de Lançamento</span>
                    <span className="text-[#000412] font-semibold">
                      {book.specs?.year || '2024 (1ª Edição Especial)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Curadoria */}
          {activeTab === 'curadoria' && (
            <div className="pt-6 space-y-4 max-w-4xl text-left">
              <p className="text-sm text-[#44474d] leading-relaxed">
                Produzida em tiragem comemorativa pela Lumina Livros, esta edição foi manufaturada com
                estrita reverência ao ofício livreiro secular. Cada exemplar conta com encadernação em
                capa dura revestida de percalina azul-noite, fitilho de cetim índigo importado e
                folhas de guarda ilustradas com a cartografia estelar da constelação de Órion em
                traços de cobre. O papel pólen natural proporciona uma leitura sem reflexos e toque
                aveludado único.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-[#f2f4f6] rounded-lg">
                  <span className="material-symbols-outlined text-[24px] text-[#0051d5] mb-1">
                    auto_stories
                  </span>
                  <h5 className="font-serif text-base font-semibold text-[#000412]">
                    Papel Pólen Natural
                  </h5>
                  <p className="text-xs text-[#44474d] mt-1">
                    Gramatura nobre de 80g com tonalidade suave que acolhe a vista durante horas
                    contínuas de leitura.
                  </p>
                </div>
                <div className="p-4 bg-[#f2f4f6] rounded-lg">
                  <span className="material-symbols-outlined text-[24px] text-[#0051d5] mb-1">
                    bookmark
                  </span>
                  <h5 className="font-serif text-base font-semibold text-[#000412]">
                    Fitilho de Cetim Azul
                  </h5>
                  <p className="text-xs text-[#44474d] mt-1">
                    Marcador têxtil encorpado integrado à própria encadernação para preservar suas
                    páginas com elegância.
                  </p>
                </div>
                <div className="p-4 bg-[#f2f4f6] rounded-lg">
                  <span className="material-symbols-outlined text-[24px] text-[#0051d5] mb-1">
                    brush
                  </span>
                  <h5 className="font-serif text-base font-semibold text-[#000412]">
                    Ilustrações Exclusivas
                  </h5>
                  <p className="text-xs text-[#44474d] mt-1">
                    Caderno central de 16 páginas com mapas conceituais e diagramas celestes da
                    navegação espacial.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reader Reviews & Community Feedback Section */}
        <section ref={reviewsRef} className="mt-12 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1 text-left">
              <span className="text-[11px] font-bold text-[#0051d5] uppercase tracking-widest block">
                Voz dos Leitores
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#000412] font-semibold">
                Avaliações & Resenhas Críticas
              </h2>
              <p className="text-sm text-[#44474d]">
                Comentários espontâneos e autenticados de quem já tem o livro na estante.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenWriteReview}
              className="self-start md:self-auto bg-[#000412] hover:bg-[#0f1e36] text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">rate_review</span>
              <span>Escrever Avaliação</span>
            </button>
          </div>

          {/* Rating Summary Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-white p-6 lg:p-8 rounded-xl shadow-sm border border-slate-100">
            {/* Macro Score */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-[#f2f4f6] rounded-xl text-center">
              <span className="font-serif text-5xl font-semibold text-[#000412] tracking-tight">
                {book.rating.toFixed(1)}
              </span>
              <div className="flex items-center text-amber-500 my-1">
                <span className="material-symbols-outlined text-[24px]">star</span>
                <span className="material-symbols-outlined text-[24px]">star</span>
                <span className="material-symbols-outlined text-[24px]">star</span>
                <span className="material-symbols-outlined text-[24px]">star</span>
                <span className="material-symbols-outlined text-[24px]">star</span>
              </div>
              <span className="text-xs text-[#44474d] mt-1">
                Classificação baseada em {book.reviewsCount} avaliações
              </span>
              <span className="text-[11px] font-bold text-[#0051d5] uppercase tracking-wider mt-2">
                98% dos leitores recomendam
              </span>
            </div>

            {/* Rating Distribution Bars */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-2 py-2">
              <div className="flex items-center gap-3 text-xs">
                <span className="w-12 text-[#191c1e] font-semibold shrink-0 flex items-center gap-1">
                  5 <span className="material-symbols-outlined text-[14px] text-amber-500">star</span>
                </span>
                <div className="flex-1 h-2.5 bg-[#e0e3e5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0051d5] rounded-full" style={{ width: '92%' }}></div>
                </div>
                <span className="w-10 text-right text-[#44474d] text-[11px] font-medium">92%</span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="w-12 text-[#191c1e] font-semibold shrink-0 flex items-center gap-1">
                  4 <span className="material-symbols-outlined text-[14px] text-amber-500">star</span>
                </span>
                <div className="flex-1 h-2.5 bg-[#e0e3e5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0051d5] rounded-full" style={{ width: '6%' }}></div>
                </div>
                <span className="w-10 text-right text-[#44474d] text-[11px] font-medium">6%</span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="w-12 text-[#191c1e] font-semibold shrink-0 flex items-center gap-1">
                  3 <span className="material-symbols-outlined text-[14px] text-amber-500">star</span>
                </span>
                <div className="flex-1 h-2.5 bg-[#e0e3e5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0051d5] rounded-full" style={{ width: '2%' }}></div>
                </div>
                <span className="w-10 text-right text-[#44474d] text-[11px] font-medium">2%</span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="w-12 text-[#191c1e] font-semibold shrink-0 flex items-center gap-1">
                  2 <span className="material-symbols-outlined text-[14px] text-amber-500">star</span>
                </span>
                <div className="flex-1 h-2.5 bg-[#e0e3e5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0051d5] rounded-full" style={{ width: '0%' }}></div>
                </div>
                <span className="w-10 text-right text-[#44474d] text-[11px] font-medium">0%</span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="w-12 text-[#191c1e] font-semibold shrink-0 flex items-center gap-1">
                  1 <span className="material-symbols-outlined text-[14px] text-amber-500">star</span>
                </span>
                <div className="flex-1 h-2.5 bg-[#e0e3e5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0051d5] rounded-full" style={{ width: '0%' }}></div>
                </div>
                <span className="w-10 text-right text-[#44474d] text-[11px] font-medium">0%</span>
              </div>
            </div>

            {/* Community Sentiment Badges */}
            <div className="lg:col-span-3 flex flex-col justify-center gap-2 border-t lg:border-t-0 lg:border-l border-[#e0e3e5] lg:pl-6 pt-4 lg:pt-0">
              <span className="text-[11px] font-bold text-[#44474d] uppercase tracking-wider">
                Destaques da Comunidade
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-full bg-[#dbe1ff] text-[#00174b] text-[11px] font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">psychology</span>
                  Enredo Envolvente (184)
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#eceef0] text-[#191c1e] text-[11px] font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">diamond</span>
                  Acabamento Impecável (152)
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#eceef0] text-[#191c1e] text-[11px] font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">electric_bolt</span>
                  Plot Twist Inovador (139)
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#eceef0] text-[#191c1e] text-[11px] font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">translate</span>
                  Tradução Fluida (98)
                </span>
              </div>
            </div>
          </div>

          {/* Reader Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2 text-left">
                  <div className="flex items-center justify-between">
                    {/* Typographic Initials Avatar (No human face) */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg text-white flex items-center justify-center font-serif font-bold text-sm tracking-wider shadow-sm"
                        style={{ backgroundColor: rev.avatarBg }}
                      >
                        {rev.initials}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#000412]">{rev.author}</h4>
                        <span className="text-[11px] text-[#75777e]">
                          {rev.location} • {rev.date}
                        </span>
                      </div>
                    </div>
                    {rev.isVerified && (
                      <span
                        className="material-symbols-outlined text-[#0051d5] text-[18px]"
                        title="Comprador Verificado"
                      >
                        verified
                      </span>
                    )}
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center text-amber-500 pt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`material-symbols-outlined text-[16px] ${
                          i < rev.rating ? 'text-amber-500' : 'text-[#c5c6ce]'
                        }`}
                      >
                        star
                      </span>
                    ))}
                  </div>

                  <h5 className="font-serif text-sm font-semibold text-[#191c1e] pt-1">
                    {rev.title}
                  </h5>
                  <p className="text-xs text-[#44474d] leading-relaxed">{rev.text}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-[#75777e]">
                  <span className="text-[#0051d5] text-[10px] font-bold uppercase tracking-wider">
                    Comprou: {rev.formatBought}
                  </span>
                  <button
                    type="button"
                    onClick={() => onUpvoteReview(rev.id)}
                    className="hover:text-[#000412] transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">thumb_up</span>
                    <span>Útil ({rev.helpfulVotes})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-Sell Recommendation Carousel */}
        <section className="mt-12 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <span className="text-[11px] font-bold text-[#0051d5] uppercase tracking-widest block">
                Curadoria Complementar
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#000412] font-semibold">
                Quem comprou este livro também comprou
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollCarousel(-1)}
                className="w-9 h-9 rounded-lg bg-white hover:bg-[#eceef0] text-[#000412] flex items-center justify-center shadow-sm border border-slate-200 transition-colors cursor-pointer"
                aria-label="Anterior"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel(1)}
                className="w-9 h-9 rounded-lg bg-white hover:bg-[#eceef0] text-[#000412] flex items-center justify-center shadow-sm border border-slate-200 transition-colors cursor-pointer"
                aria-label="Próximo"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Carousel Track */}
          <div
            ref={carouselRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-x-auto pb-2 scroll-smooth"
          >
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                onClick={() => onSelectBook(rec.id)}
                className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                <div className="space-y-2 text-left">
                  <div className="relative aspect-[2/3] w-full rounded-md overflow-hidden bg-[#eceef0] shadow-sm">
                    <img
                      src={rec.coverImage}
                      alt={rec.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {rec.badge && (
                      <span className="absolute top-2 left-2 bg-[#000412] text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded tracking-wider">
                        {rec.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#0051d5] uppercase tracking-wider block">
                      {rec.subgenre}
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-[#000412] line-clamp-1 mt-0.5 group-hover:text-[#0051d5] transition-colors">
                      {rec.title}
                    </h4>
                    <p className="text-xs text-[#75777e]">{rec.author}</p>
                  </div>
                  <div className="flex items-center text-amber-500 text-xs">
                    <span className="material-symbols-outlined text-[15px]">star</span>
                    <span className="text-[#191c1e] text-[11px] ml-1 font-bold">
                      {rec.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-slate-100 mt-2">
                  <div>
                    <span className="text-sm font-bold text-[#000412]">
                      R$ {rec.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="block text-[10px] text-[#75777e]">
                      {rec.physicalFormat}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(rec);
                    }}
                    className="w-9 h-9 rounded-lg bg-[#f2f4f6] hover:bg-[#0051d5] hover:text-white text-[#000412] transition-colors flex items-center justify-center shadow-sm cursor-pointer"
                    title="Adicionar à Sacola"
                  >
                    <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
