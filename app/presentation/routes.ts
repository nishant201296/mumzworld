import ProductDetail from "../product_detail";
import { Brands } from "./ui/brands";
import { Categories } from "./ui/categories";
import { Search } from "./ui/search";

export const TabRoutes = {
  categories: { name: "Categories", route: Categories },
  search: { name: "Search", route: Search },
  brands: { name: "Brands", route: Brands },
};

export const ScreenRoutes = {
  products: { name: "Products", route: "index" },
  ProductDetail: { name: "Detail", route: "product_detail" },
};
