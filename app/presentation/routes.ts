import { Brands } from "./ui/brands";
import { Categories } from "./ui/categories";
import { Search } from "./ui/search";
import { Language } from "./ui/language";

export const TabRoutes = {
  categories: {
    name: "Categories",
    route: Categories,
    tabIcon: {
      focused: "grid-sharp",
      unfocused: "grid-outline",
    },
  },
  search: {
    name: "Search",
    route: Search,
    tabIcon: {
      focused: "search-circle",
      unfocused: "search-circle-outline",
    },
  },
  brands: {
    name: "Brands",
    route: Brands,
    tabIcon: {
      focused: "pricetags-sharp",
      unfocused: "pricetags-outline",
    },
  },
  acount: {
    name: "Language",
    route: Language,
    tabIcon: {
      focused: "language-sharp",
      unfocused: "language-outline",
    },
  },
};

export const ScreenRoutes = {
  home: { name: "Home", route: "index" },
  searchResult: { name: "SearchResult", route: "search_result" },
  productDetail: { name: "ProductDetail", route: "product_detail" },
};
