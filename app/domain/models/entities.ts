import { Item } from "@/app/data/models/product_list";

export interface Index {
  products: Record<number, Item>;
  byBrand: Record<string, number[]>;
  byCategory: Record<string, number[]>;
}

export interface SearchResultV2 {
  //brand name and products in that brand
  brandsMatched: Record<string, number[]>;

  //category name and products in that category
  categoryMatched: Record<string, number[]>;

  // products names matched - their id
  productsMatched: Record<string, number>;

  // total number of product who got qualified
  totalProductCount: number;
}
