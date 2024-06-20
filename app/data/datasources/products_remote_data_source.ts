import { ApiResultType, Failure, Success } from "../../utils/utils";
import { productApi } from "../services/api_service";
import { ProductListDTO } from "../models/product_list";
import { ProductDetailDTO } from "../models/product_detail";

export interface IProductRemoteDataSource {
  getProductListSmallSet(): Promise<ApiResultType<ProductListDTO>>;
  getProductListSmallHead(): Promise<ApiResultType<void>>;
  getProductListLargeSet(): Promise<ApiResultType<ProductListDTO>>;
  getProductListLargeHead(): Promise<ApiResultType<void>>;
  getProduct(): Promise<ApiResultType<ProductDetailDTO>>;
  getProductHead(): Promise<ApiResultType<void>>;
}

class ProductRemoteDataSource implements IProductRemoteDataSource {
  async getProductListSmallHead(): Promise<ApiResultType<void>> {
    try {
      const response = await productApi.head("product-list-lite");
      return new Success(undefined, response.headers);
    } catch (error: any) {
      return new Failure(error.message);
    }
  }
  async getProductListLargeHead(): Promise<ApiResultType<void>> {
    try {
      const response = await productApi.head("product-list-large");
      return new Success(undefined, response.headers);
    } catch (error: any) {
      return new Failure(error.message);
    }
  }
  async getProductHead(): Promise<ApiResultType<void>> {
    try {
      const response = await productApi.head("product");
      return new Success(undefined, response.headers);
    } catch (error: any) {
      return new Failure(error.message);
    }
  }
  async getProduct(): Promise<ApiResultType<ProductDetailDTO>> {
    try {
      const response = await productApi.get<ProductDetailDTO>("product");
      return new Success(response.data, response.headers);
    } catch (error: any) {
      return new Failure(error.message);
    }
  }

  async getProductListSmallSet(): Promise<ApiResultType<ProductListDTO>> {
    try {
      const response = await productApi.get<ProductListDTO>(
        "product-list-lite"
      );
      return new Success(response.data, response.headers);
    } catch (error: any) {
      return new Failure(error.message);
    }
  }

  async getProductListLargeSet(): Promise<ApiResultType<ProductListDTO>> {
    try {
      const response = await productApi.get<ProductListDTO>(
        "product-list-large"
      );
      return new Success(response.data, response.headers);
    } catch (error: any) {
      return new Failure(error.message);
    }
  }
}

const productRemoteDataSource: IProductRemoteDataSource =
  new ProductRemoteDataSource();
export { productRemoteDataSource };
