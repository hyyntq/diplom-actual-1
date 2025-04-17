export interface SubmitButtonProps {
  text: string,
  className: string
}

export interface Comment {
  id: number,
  user: string,
  rating: number,
  comment: string,
  date: string
}

export interface ProductProps {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  images: string[];
  category: string;
  brand: string;
  discountPercentage: number;
  stock: number;
  rating: number;
  quantity: number;
  description: string;
  sku: string;
  reviews: Comment[];
}

  export interface ProductSectionProps {
    initialCategory?: string;
  }

export interface ProductBannerProps {
  img: string,
  title: string,
  description: string,
  bgColor: string
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export interface CartItem extends ProductProps {
  quantity: number;
}

export interface SetCart {
  (newCart: CartItem[]): void;
  (callback: (prevCart: CartItem[]) => CartItem[]): void;
}

export interface CartContextType {
  cart: CartItem[];
  setCart: SetCart;
  addToCart: (product: ProductProps) => void;
  removeFromCart: (product: ProductProps) => void;
  updateQuantity: (product: ProductProps, quantity: number) => void;
  getTotal: () => number;
  clearCart: () => void;
}

export interface CartListProps {
  removeFromCart: (product: ProductProps) => void;
  updateQuantity: (product: ProductProps, quantity: number) => void;
}

export interface ProductCardProps extends CartListProps{
  product: ProductProps & { quantity: number };
}

export interface addressProps {
  id: string;
  label: string;
  name: string;
  address: string,
  city: string,
  phone: string,
}

export interface ProductPageProps {
  params: Promise<{ category: string; brand: string; title: string }>;
}

export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface userProps {
  ok: boolean;
  data: null | {
    username: string;
    email: string;
    id: number;
    blocked: boolean;
    confirmed: boolean;
  };
  error: null | string;
}
export interface SearchState  {
  ZodError?: Record<string, string[]> | null;
  results: ProductProps[];
};


export interface ZodErrors {
  [key: string]: string[] | undefined;
}

export interface PrevStateRegister {
  ZodError: ZodErrors | null;
  strapiError: string | null;
  message: string | null;
}

export interface PrevStateLogin {
  ZodError: ZodErrors | null;
  strapiError: string | null;
  message: string | null;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  identifier: string;
  password: string;
}

export interface StrapiAuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
  error?: {
    message: string;
    status?: number; 
  };
}

export interface FavoriteContextType {
  favorites: ProductProps[]; // Обновлено: теперь массив ProductProps
  addToFavorites: (product: ProductProps) => void; // Принимает полный объект
  removeFromFavorites: (productId: number) => void;
}

export interface User {
  ok: boolean;
  id: number;
  username: string;
  email: string;
  jwt: string | null;
}

export interface UserContextType {
  user: User | null;
}

export interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}