import { Brands } from "./ui/brands";
import { Categories } from "./ui/categories";
import { Search } from "./ui/search";
import { Account } from "./ui/account";

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
    name: "Account",
    route: Account,
    tabIcon: {
      focused: "person-sharp",
      unfocused: "person-outline",
    },
  },
};

export const ScreenRoutes = {
  products: { name: "Products", route: "index" },
  ProductDetail: { name: "Detail", route: "product_detail" },
};
