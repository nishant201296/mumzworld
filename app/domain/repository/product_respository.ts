import { ProductListDTO } from "@/app/data/models/product_list";

export interface IProductRepository {
  getProductListLarge(): Promise<ProductListDTO | null>;
  getProductListSmall(): Promise<ProductListDTO | null>;
}
