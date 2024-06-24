import { productLocalDataSource } from "@/app/data/datasources/products_local_data_source";
import { productRemoteDataSource } from "@/app/data/datasources/products_remote_data_source";
import { ProductListDTO } from "@/app/data/models/product_list";
import productRepository from "@/app/data/repositoryimpl/product_repository_impl";
import createIndexUseCase from "@/app/domain/usecases/create_index_usecase";
import {
  searchProductsUseCase,
  searchProductsUseCaseV2,
} from "@/app/domain/usecases/search_products_usecase";
import {
  uiProductMapper,
  searchResultMapper,
} from "@/app/presentation/mappers/ui_product_mapper";
import { ProductStore } from "@/app/presentation/stores/product_store";
import {
  productDetailMock,
  productListLargeMock,
  productListMock,
} from "./mock";
import { Success } from "@/app/utils/utils";
import { UIProduct } from "@/app/presentation/models/view_entities";
import { SearchResultV2 } from "@/app/domain/models/entities";
import { mockIndexes } from "./search_usecase.test";

describe("productStore", () => {
  let productStore: ProductStore;
  beforeEach(() => {
    productStore = new ProductStore();
  });

  describe("fetchProduct method", () => {
    it("should fetch and set product on success", async () => {
      jest
        .spyOn(productRemoteDataSource, "getProduct")
        .mockResolvedValue(new Success(productDetailMock, {}));
      jest
        .spyOn(productLocalDataSource, "getCurrentLang")
        .mockResolvedValue("en");

      await productStore.fetchProduct("mockProductId");

      expect(productStore.product).toEqual(
        expect.objectContaining({
          language: "en",
          name: "Beaba - Babycook Neo - Eucalyptus",
        })
      );
    });

    it("should handle failure to fetch product", async () => {
      jest
        .spyOn(productRemoteDataSource, "getProduct")
        .mockRejectedValue(new Error("Failed to fetch product"));

      await expect(productStore.fetchProduct("mockProductId")).rejects.toThrow(
        "Failed to fetch product"
      );

      expect(productStore.product).toBeUndefined();
    });
  });

  describe("fetchProducts method", () => {
    it("should fetch and set product list indexes", async () => {
      const mockIndexes = {
        products: {},
        byBrand: {},
        byCategory: {},
      };
      jest
        .spyOn(productRepository, "getProductListLarge")
        .mockResolvedValue(productListLargeMock);
      jest.spyOn(productRepository, "setIndexes");
      jest
        .spyOn(createIndexUseCase, "createIndexes")
        .mockReturnValue(mockIndexes);

      await productStore.fetchProducts();

      expect(productRepository.setIndexes).toHaveBeenCalledWith(mockIndexes);
    });

    it("should handle failure to fetch product list", async () => {
      jest
        .spyOn(productRepository, "getProductListLarge")
        .mockResolvedValue(null);

      await productStore.fetchProducts();

      expect(productRepository.setIndexes).toHaveBeenCalledWith({
        products: {},
        byBrand: {},
        byCategory: {},
      });
    });
  });

  describe("fetchSearchHistoryItems method", () => {
    it("should fetch and set search history items", async () => {
      const mockHistoryItems = ["item1", "item2"];
      jest
        .spyOn(productLocalDataSource, "getSearchHistoryItems")
        .mockResolvedValue(mockHistoryItems);

      await productStore.fetchSearchHistoryItems();

      expect(productStore.searchHistoryItems).toEqual(mockHistoryItems);
    });
  });

  describe("updateSearchHistoryItem method", () => {
    it("should update and set search history items", async () => {
      const mockUpdatedHistory = ["newSearchText", "item1", "item2"];
      jest.spyOn(productLocalDataSource, "updateSearchHistoryItems");
      jest
        .spyOn(productLocalDataSource, "getSearchHistoryItems")
        .mockResolvedValue(["item1", "item2"]);
      await productStore.fetchSearchHistoryItems();
      await productStore.updateSearchHistoryItem("newSearchText");

      expect(productStore.searchHistoryItems).toEqual(mockUpdatedHistory);
    });
  });

  describe("clearSearchHistoryItem method", () => {
    it("should clear search history items", async () => {
      jest.spyOn(productLocalDataSource, "updateSearchHistoryItems");

      await productStore.clearSearchHistoryItem();

      expect(productStore.searchHistoryItems).toEqual([]);
    });
  });

  describe("performKeywordSearch method", () => {
    it("should perform keyword search and set products to show", async () => {
      const mockSearchResult = [productListMock.data.products.items[0]];
      const mockMappedProducts: UIProduct[] = [
        {
          id: 0,
          imageUrl: "",
          productTitle: "",
          finalPrice: "",
          isYalla: false,
          inStock: false,
        },
      ];
      jest
        .spyOn(searchProductsUseCase, "searchProducts")
        .mockReturnValue(mockSearchResult);
      jest.spyOn(uiProductMapper, "map").mockReturnValue(mockMappedProducts);

      await productStore.performKeywordSearch("keyword");

      expect(productStore.products).toEqual(mockMappedProducts);
    });
  });

  describe("performKeywordSearchV2 method", () => {
    it("should perform keyword search V2 and set search result V2", async () => {
      const mockSearchResult: SearchResultV2 = {
        brandsMatched: {},
        categoryMatched: {},
        productsMatched: {},
        totalProductCount: 0,
      };
      const mockMappedSearchResult = {
        brandNames: ["MappedBrand1", "MappedBrand2"],
        categoryNames: ["MappedCategory1", "MappedCategory2"],
        totalProducts: 10,
      };
      jest
        .spyOn(searchProductsUseCaseV2, "searchProducts")
        .mockReturnValue(mockSearchResult);
      jest
        .spyOn(searchResultMapper, "map")
        .mockReturnValue(mockMappedSearchResult);

      await productStore.performKeywordSearchV2("keyword");

      expect(productStore.searchResultV2).toEqual(mockMappedSearchResult);
    });
  });

  describe("clearSearch method", () => {
    it("should clear products to show and search result V2", () => {
      productStore.clearSearch();

      expect(productStore.products).toEqual([]);
      expect(productStore.searchResultV2).toEqual({
        brandNames: [],
        categoryNames: [],
        totalProducts: 0,
      });
    });
  });
});
