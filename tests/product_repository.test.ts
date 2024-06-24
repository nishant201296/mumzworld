import { Index } from "@/app/domain/models/entities";
import { IProductRepository } from "@/app/domain/repository/product_respository";
import { ApiResult, Success, Failure } from "@/app/utils/utils";
import {
  LARGE_LIST_KEY,
  SMALL_LIST_KEY,
  productLocalDataSource,
} from "../app/data/datasources/products_local_data_source";
import { productRemoteDataSource } from "../app/data/datasources/products_remote_data_source";
import { ProductListDTO } from "../app/data/models/product_list";
import productRepository, {
  ProductRepository,
} from "@/app/data/repositoryimpl/product_repository_impl";
import { productListMock } from "./mock";

describe("ProductRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getCurrentLang", () => {
    it("should return the current language from local data source if set and is supported", async () => {
      jest
        .spyOn(productLocalDataSource, "getCurrentLang")
        .mockResolvedValue("en");

      const lang = await productRepository.getCurrentLang();
      expect(lang).toBe("en");
    });

    it("should return the default language from local data source if set and is NOT supported", async () => {
      jest
        .spyOn(productLocalDataSource, "getCurrentLang")
        .mockResolvedValue("id");

      jest.spyOn(productLocalDataSource, "setCurrentLang").mockResolvedValue();

      const lang = await productRepository.getCurrentLang();
      expect(productLocalDataSource.setCurrentLang).toHaveBeenCalledWith("en");
      expect(lang).toBe("en");
    });

    it("should return the default language if current language is not set", async () => {
      jest
        .spyOn(productLocalDataSource, "getCurrentLang")
        .mockResolvedValue(null);
      jest.spyOn(productLocalDataSource, "setCurrentLang").mockResolvedValue();

      const lang = await productRepository.getCurrentLang();
      expect(productLocalDataSource.setCurrentLang).toHaveBeenCalledWith("en");

      expect(lang).toBe("en");
    });
  });

  describe("setCurrentLang", () => {
    it("should set the current language in the local data source", async () => {
      const lang = "ar";
      jest.spyOn(productLocalDataSource, "setCurrentLang").mockResolvedValue();

      await productRepository.setCurrentLang(lang);
      expect(productLocalDataSource.setCurrentLang).toHaveBeenCalledWith(lang);
    });
  });

  describe("getProductListSmall", () => {
    it("should return local data if etags match", async () => {
      jest
        .spyOn(productRemoteDataSource, "getProductListSmallHead")
        .mockResolvedValue(new Success(undefined, { etag: '"123"' }));
      jest
        .spyOn(productLocalDataSource, "getCurrentEtag")
        .mockResolvedValue("123");
      jest
        .spyOn(productLocalDataSource, "getProductListSmall")
        .mockResolvedValue(productListMock);

      const result = await productRepository.getProductListSmall();
      expect(result).toEqual(productListMock);
    });

    it("should return remote data and save locally if etags do not match", async () => {
      jest
        .spyOn(productRemoteDataSource, "getProductListSmallHead")
        .mockResolvedValue(new Success(undefined, { etag: '"123"' }));
      jest
        .spyOn(productLocalDataSource, "getCurrentEtag")
        .mockResolvedValue("456");
      jest
        .spyOn(productRemoteDataSource, "getProductListSmallSet")
        .mockResolvedValue(new Success(productListMock, { etag: '"123"' }));
      jest
        .spyOn(productLocalDataSource, "setProductListSmall")
        .mockResolvedValue(true);
      jest.spyOn(productLocalDataSource, "setCurrentEtag").mockResolvedValue();

      const result = await productRepository.getProductListSmall();
      expect(result).toEqual(productListMock);
      expect(productLocalDataSource.setProductListSmall).toHaveBeenCalled();
      expect(productLocalDataSource.setCurrentEtag).toHaveBeenCalledWith(
        SMALL_LIST_KEY,
        "123"
      );
    });

    it("should return null if remote head request fails", async () => {
      jest
        .spyOn(productRemoteDataSource, "getProductListSmallHead")
        .mockResolvedValue(new Failure("Error"));

      const result = await productRepository.getProductListSmall();
      expect(result).toBeNull();
    });
  });

  describe("getProductListLarge", () => {
    it("should return local data if etags match", async () => {
      jest
        .spyOn(productRemoteDataSource, "getProductListLargeHead")
        .mockResolvedValue(new Success(undefined, { etag: '"123"' }));
      jest
        .spyOn(productLocalDataSource, "getCurrentEtag")
        .mockResolvedValue("123");
      jest
        .spyOn(productLocalDataSource, "getProductListLarge")
        .mockResolvedValue(productListMock);

      const result = await productRepository.getProductListLarge();
      expect(result).toEqual(productListMock);
    });

    it("should return remote data and save locally if etags do not match", async () => {
      jest
        .spyOn(productRemoteDataSource, "getProductListLargeHead")
        .mockResolvedValue(new Success(undefined, { etag: '"123"' }));
      jest
        .spyOn(productLocalDataSource, "getCurrentEtag")
        .mockResolvedValue("456");
      jest
        .spyOn(productRemoteDataSource, "getProductListLargeSet")
        .mockResolvedValue(new Success(productListMock, { etag: '"123"' }));
      jest
        .spyOn(productLocalDataSource, "setProductListLarge")
        .mockResolvedValue(true);
      jest.spyOn(productLocalDataSource, "setCurrentEtag").mockResolvedValue();

      const result = await productRepository.getProductListLarge();
      expect(result).toEqual(productListMock);
      expect(productLocalDataSource.setProductListLarge).toHaveBeenCalled();
      expect(productLocalDataSource.setCurrentEtag).toHaveBeenCalledWith(
        LARGE_LIST_KEY,
        "123"
      );
    });

    it("should return null if remote head request fails", async () => {
      jest
        .spyOn(productRemoteDataSource, "getProductListLargeHead")
        .mockResolvedValue(new Failure("Error"));

      const result = await productRepository.getProductListLarge();
      expect(result).toBeNull();
    });
  });

  describe("getRemoteSmallAndSaveLocal", () => {
    it("should return remote data and save locally", async () => {
      jest
        .spyOn(productRemoteDataSource, "getProductListSmallSet")
        .mockResolvedValue(new Success(productListMock, { etag: '"123"' }));
      jest
        .spyOn(productLocalDataSource, "setProductListSmall")
        .mockResolvedValue(true);
      jest.spyOn(productLocalDataSource, "setCurrentEtag").mockResolvedValue();

      const result = await (
        productRepository as ProductRepository
      ).getRemoteSmallAndSaveLocal();
      expect(result).toEqual(productListMock);
      expect(productLocalDataSource.setProductListSmall).toHaveBeenCalled();
      expect(productLocalDataSource.setCurrentEtag).toHaveBeenCalledWith(
        SMALL_LIST_KEY,
        "123"
      );
    });

    it("should return null if remote data fetch fails", async () => {
      jest
        .spyOn(productRemoteDataSource, "getProductListSmallSet")
        .mockResolvedValue(new Failure("Error"));

      const result = await (
        productRepository as ProductRepository
      ).getRemoteSmallAndSaveLocal();
      expect(result).toBeNull();
    });
  });

  describe("getRemoteLargeAndSaveLocal", () => {
    it("should return remote data and save locally", async () => {
      jest
        .spyOn(productRemoteDataSource, "getProductListLargeSet")
        .mockResolvedValue(new Success(productListMock, { etag: '"123"' }));
      jest
        .spyOn(productLocalDataSource, "setProductListLarge")
        .mockResolvedValue(true);
      jest.spyOn(productLocalDataSource, "setCurrentEtag").mockResolvedValue();

      const result = await (
        productRepository as ProductRepository
      ).getRemoteLargeAndSaveLocal();
      expect(result).toEqual(productListMock);
      expect(productLocalDataSource.setProductListLarge).toHaveBeenCalled();
      expect(productLocalDataSource.setCurrentEtag).toHaveBeenCalledWith(
        LARGE_LIST_KEY,
        "123"
      );
    });

    it("should return null if remote data fetch fails", async () => {
      jest
        .spyOn(productRemoteDataSource, "getProductListLargeSet")
        .mockResolvedValue(new Failure("Error"));

      const result = await (
        productRepository as ProductRepository
      ).getRemoteLargeAndSaveLocal();
      expect(result).toBeNull();
    });
  });

  describe("indexes", () => {
    it("should set and get indexes correctly", () => {
      const indexes: Index = {
        products: { 1: {} as any },
        byBrand: { brand1: [1] },
        byCategory: { category1: [1] },
      };

      productRepository.setIndexes(indexes);
      const result = productRepository.getIndexes();
      expect(result).toEqual(indexes);
    });
  });
});
