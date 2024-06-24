import { productRemoteDataSource } from "../app/data/datasources/products_remote_data_source";
import { ProductDetailDTO } from "../app/data/models/product_detail";
import { ProductListDTO } from "../app/data/models/product_list";
import { ApiResult, Success, Failure } from "../app/utils/utils";
import { productApi } from "../app/domain/services/api_service";
import { productDetailMock, productListMock } from "./mock";

describe("ProductRemoteDataSource", () => {
  const mockProductListDTO: ProductListDTO = productListMock;

  const mockProductDetailDTO: ProductDetailDTO = productDetailMock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return ProductListDTO for getProductListSmallSet when API call is successful", async () => {
    jest
      .spyOn(productApi, "get")
      .mockResolvedValue({ data: mockProductListDTO, headers: {} });
    const result = await productRemoteDataSource.getProductListSmallSet();
    expect(result).toEqual(new Success(mockProductListDTO, {}));
  });

  it("should return Failure for getProductListSmallSet when API call fails", async () => {
    const errorMessage = "Network Error";
    jest.spyOn(productApi, "get").mockRejectedValue(new Error(errorMessage));
    const result = await productRemoteDataSource.getProductListSmallSet();
    expect(result).toEqual(new Failure(errorMessage));
  });

  it("should return ProductListDTO for getProductListLargeSet when API call is successful", async () => {
    jest
      .spyOn(productApi, "get")
      .mockResolvedValue({ data: mockProductListDTO, headers: {} });
    const result = await productRemoteDataSource.getProductListLargeSet();
    expect(result).toEqual(new Success(mockProductListDTO, {}));
  });

  it("should return Failure for getProductListLargeSet when API call fails", async () => {
    const errorMessage = "Network Error";
    jest.spyOn(productApi, "get").mockRejectedValue(new Error(errorMessage));
    const result = await productRemoteDataSource.getProductListLargeSet();
    expect(result).toEqual(new Failure(errorMessage));
  });

  it("should return ProductDetailDTO for getProduct when API call is successful", async () => {
    jest
      .spyOn(productApi, "get")
      .mockResolvedValue({ data: mockProductDetailDTO, headers: {} });
    const result = await productRemoteDataSource.getProduct();
    expect(result).toEqual(new Success(mockProductDetailDTO, {}));
  });

  it("should return Failure for getProduct when API call fails", async () => {
    const errorMessage = "Network Error";
    jest.spyOn(productApi, "get").mockRejectedValue(new Error(errorMessage));
    const result = await productRemoteDataSource.getProduct();
    expect(result).toEqual(new Failure(errorMessage));
  });

  it("should return Success for getProductListSmallHead when API call is successful", async () => {
    jest.spyOn(productApi, "head").mockResolvedValue({ headers: {} });
    const result = await productRemoteDataSource.getProductListSmallHead();
    expect(result).toEqual(new Success(undefined, {}));
  });

  it("should return Failure for getProductListSmallHead when API call fails", async () => {
    const errorMessage = "Network Error";
    jest.spyOn(productApi, "head").mockRejectedValue(new Error(errorMessage));
    const result = await productRemoteDataSource.getProductListSmallHead();
    expect(result).toEqual(new Failure(errorMessage));
  });

  it("should return Success for getProductListLargeHead when API call is successful", async () => {
    jest.spyOn(productApi, "head").mockResolvedValue({ headers: {} });
    const result = await productRemoteDataSource.getProductListLargeHead();
    expect(result).toEqual(new Success(undefined, {}));
  });

  it("should return Failure for getProductListLargeHead when API call fails", async () => {
    const errorMessage = "Network Error";
    jest.spyOn(productApi, "head").mockRejectedValue(new Error(errorMessage));
    const result = await productRemoteDataSource.getProductListLargeHead();
    expect(result).toEqual(new Failure(errorMessage));
  });
});
