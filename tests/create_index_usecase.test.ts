import { Item, ProductListDTO } from "@/app/data/models/product_list";
import { Index } from "@/app/domain/models/entities";
import { productListLargeMock, productListMock } from "./mock";
import createIndexUseCase from "@/app/domain/usecases/create_index_usecase";

const expectedIndex: Index = {
  products: {
    239463: productListMock.data.products.items[0],
    155173: productListMock.data.products.items[1],
  },
  byBrand: {
    "ibi-irn": [239463],
    huanger: [155173],
  },
  byCategory: {
    gear: [239463, 155173],
    "infant activity": [239463, 155173],
    "activity gyms & playmats": [155173],
    toys: [239463, 155173],
    "baby & preschool": [239463, 155173],
    "gyms & playmats": [155173],
    gyms: [155173],
    walkers: [239463],
    "walker toys": [239463],
  },
};

describe("CreateIndexUseCase", () => {
  it("should create indexes correctly from valid ProductListDTO", () => {
    const result = createIndexUseCase.createIndexes(productListMock);
    expect(result).toEqual(expectedIndex);
  });

  it("should handle empty product items gracefully", () => {
    const emptyDTO: ProductListDTO = {
      data: {
        products: {
          items: [],
          total_count: 0,
          yalla_total_count: 0,
          page_info: {
            total_pages: 0,
            __typename: "",
          },
          __typename: "",
          item: [],
        },
      },
    };
    const result = createIndexUseCase.createIndexes(emptyDTO);
    expect(result).toEqual({
      products: {},
      byBrand: {},
      byCategory: {},
    });
  });

  it("should handle empty product items gracefully", () => {
    const emptyDTO: ProductListDTO = {
      data: {
        products: {
          items: [],
          total_count: 0,
          yalla_total_count: 0,
          page_info: {
            total_pages: 0,
            __typename: "",
          },
          __typename: "",
          item: [],
        },
      },
    };
    const result = createIndexUseCase.createIndexes(emptyDTO);
    expect(result).toEqual({
      products: {},
      byBrand: {},
      byCategory: {},
    });
  });
  it("should handle empty product items gracefully", () => {
    const emptyDTO: ProductListDTO = {
      data: {
        products: {
          items: [],
          total_count: 0,
          yalla_total_count: 0,
          page_info: {
            total_pages: 0,
            __typename: "",
          },
          __typename: "",
          item: [],
        },
      },
    };
    const result = createIndexUseCase.createIndexes(emptyDTO);
    expect(result).toEqual({
      products: {},
      byBrand: {},
      byCategory: {},
    });
  });

  it("should handle items with missing brand_info or categories", () => {
    const incompleteDTO: ProductListDTO = {
      data: {
        products: {
          items: [
            {
              id: 239463,
              categories: [] as Item["categories"],
              brand: 0,
              brand_info: {
                title: "",
                __typename: "",
              },
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
                url: "",
                __typename: "",
              },
              stock_status: "",
              type_id: "",
              uid: "",
              url_key: "",
              url_suffix: "",
              __typename: "",
            },
            {
              id: 155173,
              brand_info: {} as Item["brand_info"],
              categories: [] as Item["categories"],
              brand: 0,
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
                url: "",
                __typename: "",
              },
              stock_status: "",
              type_id: "",
              uid: "",
              url_key: "",
              url_suffix: "",
              __typename: "",
            },
          ],
          total_count: 2,
          yalla_total_count: 2,
          page_info: {
            total_pages: 0,
            __typename: "",
          },
          __typename: "",
          item: [],
        },
      },
    };
    const result = createIndexUseCase.createIndexes(incompleteDTO);
    expect(result).toEqual({
      products: {
        239463: incompleteDTO.data.products.items[0],
        155173: incompleteDTO.data.products.items[1],
      },
      byBrand: {},
      byCategory: {},
    });
  });
  it("should create indexes efficiently for a large dataset", () => {
    const largeDTO: ProductListDTO = productListLargeMock;
    const startTime = performance.now();
    const result = createIndexUseCase.createIndexes(largeDTO);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    expect(executionTime).toBeLessThan(100);
  });
});
