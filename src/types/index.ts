export interface BookFormat {
  id: string;
  name: string;
  price: number;
  strikePrice: number;
  pixPrice: number;
  discount: string;
  details: string;
  stock: number;
}

export interface BookSpec {
  originalTitle: string;
  isbn: string;
  pages: string;
  language: string;
  translation: string;
  finish: string;
  paper: string;
  dimensions: string;
  weight: string;
  year: string;
}

export interface BookGalleryImage {
  title: string;
  url: string;
  caption?: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  publisher: string;
  category: string;
  subgenre: string;
  rating: number;
  reviewsCount: number;
  physicalFormat: string;
  price: number;
  strikePrice: number;
  pixPrice: number;
  discount?: string;
  badge?: string;
  tag?: string;
  coverImage: string;
  gallery?: BookGalleryImage[];
  formats?: BookFormat[];
  stock: number;
  isPreOrder?: boolean;
  synopsis?: string;
  quote?: string;
  quoteAuthor?: string;
  extendedText?: string;
  specs?: BookSpec;
}

export interface CartItem {
  book: Book;
  formatId: string;
  formatName: string;
  price: number;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  initials: string;
  avatarBg: string;
  location: string;
  date: string;
  rating: number;
  title: string;
  text: string;
  formatBought: string;
  helpfulVotes: number;
  isVerified: boolean;
}

export interface FilterState {
  subgenre: string;
  maxPrice: number;
  formats: string[];
  minRating: number | null;
  availability: string[];
  publishers: string[];
  searchQuery: string;
  sortBy: 'bestsellers' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
  viewMode: 'grid' | 'list';
}
