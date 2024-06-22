import { ProductStore } from "../stores/product_store";
import React from "react";
import { CategoryBrandListComponent } from "./components/category_brand_list";
import { observer } from "mobx-react-lite";

export const Categories = () => {
  const store = new ProductStore();
  store.fetchCategoryList();
  return <CategoriesComponent store={store} title="Search by Categories" />;
};

const CategoriesComponent: React.FC<{ store: ProductStore; title: string }> =
  observer(({ store, title }) => {
    return <CategoryBrandListComponent data={store.categories} title={title} />;
  });
