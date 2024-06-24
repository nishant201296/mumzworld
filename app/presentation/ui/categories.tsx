import { observer } from "mobx-react-lite";
import React from "react";
import { ProductStore } from "../stores/product_store";
import { CategoryBrandListComponent } from "./components/category_brand_list";

export const Categories = () => {
  const store = new ProductStore();
  store.fetchCategoryList();
  return <CategoriesComponent store={store} />;
};

const CategoriesComponent: React.FC<{ store: ProductStore }> = observer(
  ({ store }) => {
    return (
      <CategoryBrandListComponent data={store.categories} type="categories" />
    );
  }
);
