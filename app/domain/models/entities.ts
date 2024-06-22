import { Item } from "@/app/data/models/product_list";

export interface Index {
  products: Record<number, Item>;
  byBrand: Record<string, number[]>;
  byCategory: Record<string, number[]>;
}
