import { ProductListDTO } from "@/app/data/models/product_list";
import { SearchResultV2 } from "@/app/domain/models/entities";
import {
  searchResultMapper,
  uiProductMapper,
} from "@/app/presentation/mappers/ui_product_mapper";

const items: ProductListDTO["data"]["products"]["items"] = [
  {
    id: 1,
    small_image: {
      url: "image1.jpg",
      __typename: "",
    },
    name: "Product 1",
    price_range: {
      minimum_price: {
        regular_price: {
          currency: "USD",
          value: 100,
          __typename: "",
        },
        final_price: {
          currency: "USD",
          value: 50,
          __typename: "",
        },
        discount: {
          amount_off: 50,
          percent_off: 50,
          __typename: "",
        },
        __typename: "",
      },
      __typename: "",
    },
    is_yalla: [],
    stock_status: "IN_STOCK",
    product_label: {
      active_from: "",

      active_to: "",
      background_color: "#FF0000",
      label_id: 50,
      label_text: "New",
      name: "New",
      text_color: "#FFFFFF",
      __typename: "ProductLabel",
    },
    categories: [{ name: "Category 1", __typename: "CategoryTree" }],
    brand: 0,
    brand_info: null,
    low_stock_qty: null,
    price: {
      regularPrice: {
        amount: {
          currency: "",
          value: 0,
          __typename: "",
        },
        __typename: "",
      },
      __typename: "",
    },
    base_price_range: {
      minimum_price: {
        final_price: {
          currency: "",
          value: 0,
          __typename: "",
        },
        __typename: "",
      },
      __typename: "",
    },
    usd_price_range: {
      minimum_price: {
        final_price: {
          currency: "",
          value: 0,
          __typename: "",
        },
        __typename: "",
      },
      __typename: "",
    },
    sku: "",
    type_id: "",
    uid: "",
    url_key: "",
    url_suffix: "",
    __typename: "",
  },
];

describe("UiProductMapper", () => {
  const mapper = uiProductMapper;

  it("should map items from ProductListDTO to UIProduct correctly", () => {
    const uiProducts = mapper.map(items);

    expect(uiProducts).toHaveLength(1);
    expect(uiProducts[0]).toEqual({
      id: 1,
      imageUrl: "image1.jpg",
      productTitle: "Product 1",
      finalPrice: "USD 50.00",
      basePrice: "100.00",
      discountPercent: "-50%",
      isYalla: false,
      inStock: true,
    });
  });

  it("should correctly calculate discount values for UIProduct", () => {
    const uiProducts = mapper.map(items);

    expect(uiProducts).toHaveLength(1);
    expect(uiProducts[0].discountPercent).toBe("-50%");
    expect(uiProducts[0].basePrice).toBe("100.00");
  });

  it("should map product label to UIProduct tag if active", () => {
    items[0].product_label.active_from = "2024-01-01 09:51:00";
    items[0].product_label.active_to = "2025-01-01 09:51:00";
    const uiProducts = mapper.map(items);
    expect(uiProducts).toHaveLength(1);
    expect(uiProducts[0].tag).toEqual({
      textColor: "#FFFFFF",
      textBgColor: "#FF0000",
      text: "New",
      isActive: true,
    });
  });
});

describe("SearchResultMapper", () => {
  const mapper = searchResultMapper;

  it("should map SearchResultV2 to UISearchResult correctly", () => {
    const result: SearchResultV2 = {
      brandsMatched: { "Brand 1": [1, 2], "Brand 2": [3] },
      categoryMatched: { "Category 1": [1, 3], "Category 2": [2] },
      productsMatched: { "Product 1": 1, "Product 2": 2, "Product 3": 3 },
      totalProductCount: 3,
    };

    const uiSearchResult = mapper.map(result);

    expect(uiSearchResult.brandNames).toEqual(["Brand 1", "Brand 2"]);
    expect(uiSearchResult.categoryNames).toEqual(["Category 1", "Category 2"]);
    expect(uiSearchResult.totalProducts).toBe(3);
  });

  it("should limit brands and categories to three each", () => {
    const result: SearchResultV2 = {
      brandsMatched: {
        "Brand 1": [1, 2],
        "Brand 2": [3],
        "Brand 3": [4],
        "Brand 4": [5],
      },
      categoryMatched: {
        "Category 1": [1, 3],
        "Category 2": [2],
        "Category 3": [4],
        "Category 4": [5],
      },
      productsMatched: {},
      totalProductCount: 5,
    };

    const uiSearchResult = mapper.map(result);

    expect(uiSearchResult.brandNames).toHaveLength(3);
    expect(uiSearchResult.categoryNames).toHaveLength(3);
  });
});
