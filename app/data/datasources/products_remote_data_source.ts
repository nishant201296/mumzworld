import { ApiResultType, Failure, Success } from "../../utils/utils";
import { productApi } from "../services/api_service";
import { ProductListDTO } from "../models/product_list";
import { ProductDetailDTO } from "../models/product_detail";

export interface IProductRemoteDataSource {
  getProductListSmallSet(): Promise<ApiResultType<ProductListDTO>>;
  getProductListLargeSet(): Promise<ApiResultType<ProductListDTO>>;
  getProduct(): Promise<ApiResultType<ProductDetailDTO>>;
}

class ProductRemoteDataSource implements IProductRemoteDataSource {
  async getProduct(): Promise<ApiResultType<ProductDetailDTO>> {
    try {
      const response = await productApi.get<ProductDetailDTO>("product");
      return new Success(response.data);
    } catch (error: any) {
      return new Failure(error.message);
    }
  }

  async getProductListSmallSet(): Promise<ApiResultType<ProductListDTO>> {
    try {
      const response = await productApi.get<ProductListDTO>(
        "product-list-lite"
      );
      return new Success(response.data);
    } catch (error: any) {
      return new Failure(error.message);
    }
  }

  async getProductListLargeSet(): Promise<ApiResultType<ProductListDTO>> {
    try {
      const response = await productApi.get<ProductListDTO>(
        "product-list-large"
      );
      return new Success(response.data);
    } catch (error: any) {
      return new Failure(error.message);
    }
  }
}

const productRemoteDataSource: IProductRemoteDataSource =
  new ProductRemoteDataSource();
export { productRemoteDataSource };
