import { ProductStore } from "../stores/product_store";
import React from "react";
import { CategoryBrandListComponent } from "./components/category_brand_list";
import { observer } from "mobx-react-lite";

export const Brands = () => {
  const store = new ProductStore();
  store.fetchBrandList();
  return <BrandsComponent store={store} title={"Search by Brands"} />;
};

const BrandsComponent: React.FC<{ store: ProductStore; title: string }> =
  observer(({ store, title }) => {
    return <CategoryBrandListComponent data={store.brands} title={title} />;
  });
