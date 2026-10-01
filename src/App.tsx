/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Book, CartItem, FilterState, Review } from './types';
import { BOOKS, HERO_BOOK_ID, INITIAL_REVIEWS } from './data/books';
import { Header } from './components/Header';
import { CatalogView } from './components/CatalogView';
import { ProductDetailView } from './components/ProductDetailView';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { DigitalSampleModal } from './components/DigitalSampleModal';
import { WriteReviewModal } from './components/WriteReviewModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { HelpModal } from './components/HelpModal';
import { CheckoutSuccessModal } from './components/CheckoutSuccessModal';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation view state
  const [currentView, setCurrentView] = useState<'catalog' | 'product_detail'>('catalog');
  const [selectedBookId, setSelectedBookId] = useState<string>(HERO_BOOK_ID);

  // Initial cart with 2 items totaling ~R$ 138,80 as shown in the original mock
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const heroBook = BOOKS.find((b) => b.id === HERO_BOOK_ID) || BOOKS[0];
    const secondBook = BOOKS.find((b) => b.id === 'estatico-horizonte-eventos') || BOOKS[4];
    return [
      {
        book: heroBook,
        formatId: 'capa-dura',
        formatName: 'Capa Dura (Edição Especial)',
        price: 74.90,
        quantity: 1,
      },
      {
        book: secondBook,
        formatId: 'capa-dura',
        formatName: 'Capa Dura',
        price: 63.90,
        quantity: 1,
      },
    ];
  });

  // Initial wishlist with 3 items as shown in the original mock (count: 3)
  const [wishlistBookIds, setWishlistBookIds] = useState<Set<string>>(() => {
    return new Set(['arquiteto-andromeda', 'sinapse-de-silicio', 'pendulo-dos-tempos']);
  });

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  // Filter state
  const [filterState, setFilterState] = useState<FilterState>({
    subgenre: 'all',
    maxPrice: 80,
    formats: ['Capa Dura'],
    minRating: 4.0,
    availability: ['Pronta Entrega Imediata'],
    publishers: [],
    searchQuery: '',
    sortBy: 'bestsellers',
    viewMode: 'grid',
  });

  // Active subcategory in header
  const [activeCategory, setActiveCategory] = useState<string>('ficcao-fantasia');

  // Modals
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isSampleReaderOpen, setIsSampleReaderOpen] = useState<boolean>(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState<boolean>(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [isCheckoutSuccessOpen, setIsCheckoutSuccessOpen] = useState<boolean>(false);
  const [lastCheckoutTotal, setLastCheckoutTotal] = useState<number>(138.80);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedBookId]);

  // Cart calculations
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Selected book object
  const currentBook = BOOKS.find((b) => b.id === selectedBookId) || BOOKS[0];

  // Wishlist list
  const wishlistBooks = BOOKS.filter((b) => wishlistBookIds.has(b.id));

  // Cart actions
  const handleAddToCart = (book: Book, formatId?: string, qty: number = 1) => {
    const targetFormatId = formatId || (book.formats ? book.formats[0].id : 'capa-dura');
    const matchedFormat = book.formats?.find((f) => f.id === targetFormatId);
    const formatName = matchedFormat ? matchedFormat.name : book.physicalFormat;
    const price = matchedFormat ? matchedFormat.price : book.price;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.book.id === book.id && item.formatId === targetFormatId
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + qty,
        };
        return next;
      }
      return [
        ...prev,
        {
          book,
          formatId: targetFormatId,
          formatName,
          price,
          quantity: qty,
        },
      ];
    });
  };

  const handleUpdateQuantity = (bookId: string, formatId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.book.id === bookId && item.formatId === formatId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (bookId: string, formatId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.book.id === bookId && item.formatId === formatId))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleWishlist = (bookId: string) => {
    setWishlistBookIds((prev) => {
      const next = new Set(prev);
      if (next.has(bookId)) {
        next.delete(bookId);
      } else {
        next.add(bookId);
      }
      return next;
    });
  };

  const handleInstantBuy = (book: Book, formatId?: string, qty: number = 1) => {
    handleAddToCart(book, formatId, qty);
    setLastCheckoutTotal(
      book.price * qty + (book.price * qty >= 119 ? 0 : 12.9)
    );
    setIsCheckoutSuccessOpen(true);
  };

  const handleCheckout = () => {
    setLastCheckoutTotal(cartTotal);
    setIsCartOpen(false);
    setIsCheckoutSuccessOpen(true);
    setCartItems([]);
  };

  const handleSelectBook = (bookId: string) => {
    setSelectedBookId(bookId);
    setCurrentView('product_detail');
  };

  const handleCategoryNav = (catId: string) => {
    setActiveCategory(catId);
    setCurrentView('catalog');
    if (catId === 'ficcao-fantasia') {
      setFilterState((prev) => ({ ...prev, subgenre: 'all' }));
    } else if (catId === 'mais-vendidos') {
      setFilterState((prev) => ({ ...prev, sortBy: 'bestsellers' }));
    } else if (catId === 'lancamentos') {
      setFilterState((prev) => ({ ...prev, sortBy: 'newest' }));
    } else if (catId === 'ofertas') {
      setFilterState((prev) => ({ ...prev, maxPrice: 60 }));
    } else {
      setFilterState((prev) => ({ ...prev, subgenre: 'all', searchQuery: '' }));
    }
  };

  const handleSearchChange = (query: string) => {
    setFilterState((prev) => ({ ...prev, searchQuery: query }));
    if (query && currentView !== 'catalog') {
      setCurrentView('catalog');
    }
  };

  const handleUpvoteReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulVotes: r.helpfulVotes + 1 } : r))
    );
  };

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  // Recommendations exclude the current book
  const recommendations = BOOKS.filter((b) => b.id !== currentBook.id).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e]">
      {/* Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        wishlistCount={wishlistBookIds.size}
        searchQuery={filterState.searchQuery}
        onSearchChange={handleSearchChange}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onSelectCategory={handleCategoryNav}
        activeCategory={activeCategory}
        onNavigateHome={() => {
          setCurrentView('catalog');
          setFilterState((prev) => ({ ...prev, subgenre: 'all', searchQuery: '' }));
        }}
      />

      {/* Main Screen Content */}
      <main className="flex-1">
        {currentView === 'catalog' ? (
          <CatalogView
            books={BOOKS}
            filterState={filterState}
            onFilterChange={(newF) => setFilterState((prev) => ({ ...prev, ...newF }))}
            onClearFilters={() =>
              setFilterState({
                subgenre: 'all',
                maxPrice: 250,
                formats: [],
                minRating: null,
                availability: [],
                publishers: [],
                searchQuery: '',
                sortBy: 'bestsellers',
                viewMode: filterState.viewMode,
              })
            }
            onSelectBook={handleSelectBook}
            onAddToCart={(book) => handleAddToCart(book)}
            onToggleWishlist={handleToggleWishlist}
            wishlistBookIds={wishlistBookIds}
            cartTotal={cartTotal}
          />
        ) : (
          <ProductDetailView
            book={currentBook}
            onBackToCatalog={() => setCurrentView('catalog')}
            onAddToCart={handleAddToCart}
            onInstantBuy={handleInstantBuy}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistBookIds.has(currentBook.id)}
            onOpenSampleReader={() => setIsSampleReaderOpen(true)}
            onOpenWriteReview={() => setIsWriteReviewOpen(true)}
            reviews={reviews}
            onUpvoteReview={handleUpvoteReview}
            recommendations={recommendations}
            onSelectBook={handleSelectBook}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={handleCategoryNav}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistBooks={wishlistBooks}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(book) => handleAddToCart(book)}
        onSelectBook={handleSelectBook}
      />

      {/* Digital Sample Book Reader Modal */}
      <DigitalSampleModal
        isOpen={isSampleReaderOpen}
        onClose={() => setIsSampleReaderOpen(false)}
        onAddToCart={() => handleAddToCart(currentBook)}
        bookTitle={currentBook.title}
      />

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        onSubmitReview={handleAddReview}
        bookTitle={currentBook.title}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />

      {/* Help & Support Modal */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Checkout Success Confirmation Modal */}
      <CheckoutSuccessModal
        isOpen={isCheckoutSuccessOpen}
        onClose={() => setIsCheckoutSuccessOpen(false)}
        orderTotal={lastCheckoutTotal}
        onOpenTracking={() => setIsTrackingOpen(true)}
      />
    </div>
  );
}
