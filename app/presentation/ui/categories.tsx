import { observer } from "mobx-react-lite";
import React from "react";
import { ProductStore } from "../stores/product_store";
import { CategoryBrandListComponent } from "./components/category_brand_list";

export const Categories = () => {
  const store = new ProductStore();
  store.fetchCategoryList();
  return <CategoriesComponent store={store} title="Search by Categories" />;
};

const CategoriesComponent: React.FC<{ store: ProductStore; title: string }> =
  observer(({ store, title }) => {
    return <CategoryBrandListComponent data={store.categories} title={title} />;
  });
