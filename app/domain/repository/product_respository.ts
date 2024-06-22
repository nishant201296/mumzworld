import { ProductListDTO } from "@/app/data/models/product_list";
import { Index } from "../models/entities";

export interface IProductRepository {
  setIndexes(indexes: Index): void;
  getIndexes(): Index;
  getProductListLarge(): Promise<ProductListDTO | null>;
  getProductListSmall(): Promise<ProductListDTO | null>;
  getCurrentLang(): Promise<string>;
  setCurrentLang(lang: string): Promise<void>;
}
