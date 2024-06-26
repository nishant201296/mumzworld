export interface UIProduct {
  id: number;
  imageUrl: string;
  productTitle: string;
  discountPercent?: string;
  basePrice?: string;
  finalPrice: string;
  isYalla: boolean;
  tag?: ProductTag;
  inStock: boolean;
}

export interface ProductTag {
  textColor: string;
  textBgColor: string;
  text: string;
  isActive: Boolean;
}

export interface Brand {
  name: string;
  imgUrl: string;
}

export interface Category {
  name: string;
  imgUrl: string;
}

export interface UISearchResult {
  brandNames: string[];
  categoryNames: string[];
  totalProducts: number;
}
