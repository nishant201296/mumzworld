import { observer } from "mobx-react-lite";
import React from "react";
import { ProductStore } from "../stores/product_store";
import { CategoryBrandListComponent } from "./components/category_brand_list";

export const Brands = () => {
  const store = new ProductStore();
  store.fetchBrandList();
  return <BrandsComponent store={store} />;
};

const BrandsComponent: React.FC<{ store: ProductStore }> = observer(
  ({ store }) => {
    return <CategoryBrandListComponent data={store.brands} />;
  }
);
