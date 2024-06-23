import { ProductListDTO } from "@/app/data/models/product_list";
import { Index } from "../models/entities";

class CreateIndexUseCase {
  createIndexes = (data: ProductListDTO) => {
    const index: Index = {
      products: {},
      byBrand: {},
      byCategory: {},
    };

    data.data.products.items.forEach((item) => {
      index.products[item.id] = item;

      const brandNameKey = item?.brand_info?.title.toLowerCase();
      if (!index.byBrand[brandNameKey]) {
        index.byBrand[brandNameKey] = [];
      }
      index.byBrand[brandNameKey].push(item.id);

      item.categories.forEach((category) => {
        const categoryNameKey = category.name.toLowerCase();
        if (!index.byCategory[categoryNameKey]) {
          index.byCategory[categoryNameKey] = [];
        }
        index.byCategory[categoryNameKey].push(item.id);
      });
    });

    return index;
  };
}

const createIndexUseCase = new CreateIndexUseCase();
export default createIndexUseCase;
