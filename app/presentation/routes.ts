import { Brands } from "./ui/brands";
import { Categories } from "./ui/categories";
import { Language } from "./ui/language";
import { Search } from "./ui/search";

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
};

export const ScreenRoutes = {
  home: { name: "Home", route: "index" },
  searchResult: { name: "Result", route: "search_result" },
  productDetail: { name: "Detail", route: "product_detail" },
  gallery: { name: "Gallery", route: "gallery" },
};
