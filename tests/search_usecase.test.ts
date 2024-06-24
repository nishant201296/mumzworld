import { Item } from "@/app/data/models/product_list";
import productRepository from "@/app/data/repositoryimpl/product_repository_impl";
import { Index } from "@/app/domain/models/entities";
import {
  searchProductsUseCase,
  searchProductsUseCaseV2,
} from "../app/domain/usecases/search_products_usecase";

const mockItem: Item = {
  brand: 0,
  brand_info: null,
  categories: [],
  id: 0,
  is_yalla: [],
  low_stock_qty: null,
  name: "",
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
  price_range: {
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
  product_label: {
    active_from: "",
    active_to: "",
    background_color: "",
    label_id: null,
    label_text: "",
    name: "",
    text_color: "",
    __typename: "",
  },
  sku: "",
  small_image: {
    url: "image_uri",
    __typename: "",
  },
  stock_status: "",
  type_id: "",
  uid: "",
  url_key: "",
  url_suffix: "",
  __typename: "",
};

export const mockIndexes: Index = {
  products: {
    "239463": {
      ...mockItem,
      base_price_range: mockItem.base_price_range,
      brand_info: mockItem.brand_info,
      name: "ibi-irn - baby walker - red",
      brand: 19921,
      categories: [
        { name: "gear", __typename: "" },
        { name: "infant activity", __typename: "" },
        { name: "walkers", __typename: "" },
        { name: "toys", __typename: "" },
        { name: "baby & preschool", __typename: "" },
        { name: "walker toys", __typename: "" },
      ],
    },
    "155173": {
      ...mockItem,
      name: "huanger - baby toys piano fitness rack for 0+ months - blue",
      brand: 17831,
      categories: [
        {
          name: "gear",
          __typename: "",
        },
        { name: "infant activity", __typename: "" },
        { name: "activity gyms & playmats", __typename: "" },
        { name: "toys", __typename: "" },
        { name: "baby & preschool", __typename: "" },
        { name: "gyms & playmats", __typename: "" },
        { name: "gyms", __typename: "" },
      ],
    },
  },
  byBrand: {
    "ibi-irn": [239463],
    huanger: [155173],
  },
  byCategory: {
    gear: [239463, 155173],
    "infant activity": [239463, 155173],
    walkers: [239463],
    toys: [239463, 155173],
    "baby & preschool": [239463, 155173],
    "walker toys": [239463],
    "activity gyms & playmats": [155173],
    "gyms & playmats": [155173],
    Gyms: [155173],
  },
};

describe("SearchProductsUseCase", () => {
  it("should return unique results when searching by product name", () => {
    jest.spyOn(productRepository, "getIndexes").mockReturnValue(mockIndexes);

    const results = searchProductsUseCase.searchProducts("Baby");
    expect(results).toHaveLength(2);
    expect(results[1].name).toBe("ibi-irn - baby walker - red");
  });

  it("should return unique results when searching by brand name", () => {
    jest.spyOn(productRepository, "getIndexes").mockReturnValue(mockIndexes);

    const results = searchProductsUseCase.searchProducts("huanger");
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe(
      "huanger - baby toys piano fitness rack for 0+ months - blue"
    );
  });

  it("should return unique results when searching by category name", () => {
    jest.spyOn(productRepository, "getIndexes").mockReturnValue(mockIndexes);

    const results = searchProductsUseCase.searchProducts("gear");
    expect(results).toHaveLength(2);
    expect(results[0].name).toBe("ibi-irn - baby walker - red");
  });

  it("should return unique results when searching by mixed query", () => {
    jest.spyOn(productRepository, "getIndexes").mockReturnValue(mockIndexes);

    const results = searchProductsUseCase.searchProducts("huanger baby");
    expect(results).toHaveLength(2);
    expect(results[0].name).toBe(
      "huanger - baby toys piano fitness rack for 0+ months - blue"
    );
  });

  it("should return empty array for non-matching query", () => {
    jest.spyOn(productRepository, "getIndexes").mockReturnValue(mockIndexes);

    const results = searchProductsUseCase.searchProducts("Nonexistent Product");
    expect(results).toHaveLength(0);
  });

  it("should handle empty query and not return any products", () => {
    jest.spyOn(productRepository, "getIndexes").mockReturnValue(mockIndexes);

    const results = searchProductsUseCase.searchProducts("");
    expect(results).toHaveLength(0);
  });

  it("should handle case-insensitive queries", () => {
    jest.spyOn(productRepository, "getIndexes").mockReturnValue(mockIndexes);

    const results = searchProductsUseCase.searchProducts("hUanGeR");
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe(
      "huanger - baby toys piano fitness rack for 0+ months - blue"
    );
  });

  it("should handle queries with multiple words in different order", () => {
    jest.spyOn(productRepository, "getIndexes").mockReturnValue(mockIndexes);

    const results1 = searchProductsUseCase.searchProducts("huanger baby");
    const results2 = searchProductsUseCase.searchProducts("baby huanger");
    expect(results1).toHaveLength(2);
    expect(results2).toHaveLength(2);
  });

  it("should handle queries with non-alphanumeric characters", () => {
    jest.spyOn(productRepository, "getIndexes").mockReturnValue(mockIndexes);

    const results = searchProductsUseCase.searchProducts("- 0 +");
    expect(results).toHaveLength(2);
  });

  it("should handle queries with empty productRepository response", () => {
    jest.spyOn(productRepository, "getIndexes").mockReturnValue({
      products: {},
      byBrand: {},
      byCategory: {},
    });

    const results = searchProductsUseCase.searchProducts("hunager");
    expect(results).toHaveLength(0);
  });
});

describe("SearchProductsUseCaseV2", () => {
  beforeEach(() => {
    jest.spyOn(productRepository, "getIndexes").mockReturnValue(mockIndexes);
  });

  it("should return SearchResultV2 with products matched and total product count", () => {
    const results = searchProductsUseCaseV2.searchProducts("ibi-irn");
    expect(Object.keys(results.productsMatched)).toContain(
      "ibi-irn - baby walker - red"
    );
    expect(results.productsMatched["ibi-irn - baby walker - red"]).toBe(239463);
    expect(results.totalProductCount).toBe(1);
  });

  it("should return SearchResultV2 with multiple brands and categories matched", () => {
    const results = searchProductsUseCaseV2.searchProducts(
      "gear infant activity"
    );
    expect(Object.keys(results.brandsMatched)).toHaveLength(0);
    expect(results.categoryMatched["gear"]).toEqual([239463, 155173]);
    expect(results.categoryMatched["infant activity"]).toEqual([
      239463, 155173,
    ]);
    expect(results.totalProductCount).toBe(2);
  });

  it("should return SearchResultV2 with empty results for non-matching query", () => {
    const results = searchProductsUseCaseV2.searchProducts(
      "Nonexistent Product"
    );
    expect(Object.keys(results.brandsMatched)).toHaveLength(0);
    expect(Object.keys(results.categoryMatched)).toHaveLength(0);
    expect(Object.keys(results.productsMatched)).toHaveLength(0);
    expect(results.totalProductCount).toBe(0);
  });

  it("should return SearchResultV2 with NO products when query is empty", () => {
    const results = searchProductsUseCaseV2.searchProducts("");
    expect(Object.keys(results.brandsMatched)).toHaveLength(0);
    expect(Object.keys(results.categoryMatched)).toHaveLength(0);
    expect(Object.keys(results.productsMatched)).toHaveLength(0);
    expect(results.totalProductCount).toBe(0);
  });

  it("should handle case-insensitive queries", () => {
    const results = searchProductsUseCaseV2.searchProducts("HuAnGeR");
    expect(Object.keys(results.productsMatched)).toContain(
      "huanger - baby toys piano fitness rack for 0+ months - blue"
    );
    expect(
      results.productsMatched[
        "huanger - baby toys piano fitness rack for 0+ months - blue"
      ]
    ).toBe(155173);
    expect(results.totalProductCount).toBe(1);
  });

  it("should handle queries with multiple words in different order", () => {
    const results1 = searchProductsUseCaseV2.searchProducts("gear huanger");
    const results2 = searchProductsUseCaseV2.searchProducts("huanger gear");
    expect(Object.keys(results1.brandsMatched)).toHaveLength(1);
    expect(results1.categoryMatched["gear"]).toEqual([239463, 155173]);
    expect(Object.keys(results2.brandsMatched)).toHaveLength(1);
    expect(results2.categoryMatched["gear"]).toEqual([239463, 155173]);
    expect(results1.totalProductCount).toBe(2);
    expect(results2.totalProductCount).toBe(2);
  });

  it("should handle queries with non-alphanumeric characters", () => {
    const results = searchProductsUseCaseV2.searchProducts("huanger #123");
    expect(Object.keys(results.productsMatched)).toContain(
      "huanger - baby toys piano fitness rack for 0+ months - blue"
    );
    expect(
      results.productsMatched[
        "huanger - baby toys piano fitness rack for 0+ months - blue"
      ]
    ).toBe(155173);
    expect(results.totalProductCount).toBe(1);
  });

  it("should handle queries with empty productRepository response", () => {
    jest.spyOn(productRepository, "getIndexes").mockReturnValue({
      products: {},
      byBrand: {},
      byCategory: {},
    });

    const results = searchProductsUseCaseV2.searchProducts("Product A");
    expect(Object.keys(results.brandsMatched)).toHaveLength(0);
    expect(Object.keys(results.categoryMatched)).toHaveLength(0);
    expect(Object.keys(results.productsMatched)).toHaveLength(0);
    expect(results.totalProductCount).toBe(0);
  });

  it("should handle queries with partial brand match", () => {
    const results = searchProductsUseCaseV2.searchProducts("ibi");
    expect(Object.keys(results.brandsMatched)).toContain("ibi-irn");
    expect(results.brandsMatched["ibi-irn"]).toEqual([239463]);
    expect(results.totalProductCount).toBe(1);
  });

  it("should handle queries with partial category match", () => {
    const results = searchProductsUseCaseV2.searchProducts("baby");
    expect(results.categoryMatched["baby & preschool"]).toEqual([
      239463, 155173,
    ]);
    expect(results.totalProductCount).toBe(2);
  });

  it("should handle queries with no results found", () => {
    const results = searchProductsUseCaseV2.searchProducts("xyz");
    expect(Object.keys(results.brandsMatched)).toHaveLength(0);
    expect(Object.keys(results.categoryMatched)).toHaveLength(0);
    expect(Object.keys(results.productsMatched)).toHaveLength(0);
    expect(results.totalProductCount).toBe(0);
  });

  it("should handle queries with special characters", () => {
    const results = searchProductsUseCaseV2.searchProducts("ibi-irn #123");
    expect(results.productsMatched["ibi-irn - baby walker - red"]).toBe(239463);
    expect(results.totalProductCount).toBe(1);
  });

  it("should handle queries with different case sensitivity", () => {
    const results1 = searchProductsUseCaseV2.searchProducts("HuAnGeR");
    const results2 = searchProductsUseCaseV2.searchProducts("HUANGER");
    expect(
      results1.productsMatched[
        "huanger - baby toys piano fitness rack for 0+ months - blue"
      ]
    ).toBe(155173);
    expect(results1.totalProductCount).toBe(1);
    expect(
      results2.productsMatched[
        "huanger - baby toys piano fitness rack for 0+ months - blue"
      ]
    ).toBe(155173);
    expect(results2.totalProductCount).toBe(1);
  });

  it("should handle queries with multiple spaces", () => {
    const results = searchProductsUseCaseV2.searchProducts(
      "ibi-irn  baby walker"
    );
    expect(results.productsMatched["ibi-irn - baby walker - red"]).toBe(239463);
    expect(results.totalProductCount).toBe(2);
  });

  it("should handle queries with leading and trailing spaces", () => {
    const results = searchProductsUseCaseV2.searchProducts(
      "   huanger - baby toys piano fitness rack for 0+ months - blue   "
    );
    expect(
      results.productsMatched[
        "huanger - baby toys piano fitness rack for 0+ months - blue"
      ]
    ).toBe(155173);
    expect(results.totalProductCount).toBe(2);
  });
});
