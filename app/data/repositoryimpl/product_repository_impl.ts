import { Index } from "@/app/domain/models/entities";
import { IProductRepository } from "@/app/domain/repository/product_respository";
import { ApiResult } from "@/app/utils/utils";
import {
  LARGE_LIST_KEY,
  SMALL_LIST_KEY,
  productLocalDataSource,
} from "../datasources/products_local_data_source";
import { productRemoteDataSource } from "../datasources/products_remote_data_source";
import { ProductListDTO } from "../models/product_list";

export class ProductRepository implements IProductRepository {
  indexes: Index = {
    products: {},
    byBrand: {},
    byCategory: {},
  };

  supportedLangs = ["ar", "en"];
  defaultLang = "en";

  getCurrentLang = async (): Promise<string> => {
    let lang = await productLocalDataSource.getCurrentLang();
    if (!lang) {
      lang = this.defaultLang;
      await this.setCurrentLang(this.defaultLang);
      return lang;
    }
    if (this.supportedLangs.includes(lang)) {
      return lang;
    } else {
      await this.setCurrentLang(this.defaultLang);
      return this.defaultLang;
    }
  };

  setCurrentLang = async (lang: string): Promise<void> => {
    await productLocalDataSource.setCurrentLang(lang);
  };

  setIndexes = (indexes: Index): void => {
    this.indexes = indexes;
  };

  getIndexes = (): Index => {
    return this.indexes;
  };

  async getProductListSmall(): Promise<ProductListDTO | null> {
    const head = await productRemoteDataSource.getProductListSmallHead();
    if (ApiResult.isError(head)) {
      return null;
    }
    const currentEtag = await productLocalDataSource.getCurrentEtag(
      SMALL_LIST_KEY
    );
    const remoteEtag = head.headers.etag.replace(/"/g, "");
    if (remoteEtag === currentEtag) {
      const localData = await productLocalDataSource.getProductListSmall(
        remoteEtag
      );
      if (localData) {
        return localData;
      }
      return await this.getRemoteSmallAndSaveLocal();
    } else {
      return await this.getRemoteSmallAndSaveLocal();
    }
  }

  async getProductListLarge(): Promise<ProductListDTO | null> {
    const head = await productRemoteDataSource.getProductListLargeHead();
    if (ApiResult.isError(head)) {
      return null;
    }
    const currentEtag = await productLocalDataSource.getCurrentEtag(
      LARGE_LIST_KEY
    );
    const remoteEtag = head.headers.etag.replace(/"/g, "");
    if (remoteEtag === currentEtag) {
      const localData = await productLocalDataSource.getProductListLarge(
        remoteEtag
      );
      if (localData) {
        return localData;
      }
      return await this.getRemoteLargeAndSaveLocal();
    } else {
      return await this.getRemoteLargeAndSaveLocal();
    }
  }

  getRemoteSmallAndSaveLocal = async (): Promise<ProductListDTO | null> => {
    const remoteData = await productRemoteDataSource.getProductListSmallSet();
    if (ApiResult.isError(remoteData)) {
      return null;
    }
    const newEtag = remoteData.headers.etag.replace(/"/g, "");
    await productLocalDataSource.setProductListSmall(newEtag, remoteData.data);
    await productLocalDataSource.setCurrentEtag(SMALL_LIST_KEY, newEtag);
    return remoteData.data;
  };

  getRemoteLargeAndSaveLocal = async (): Promise<ProductListDTO | null> => {
    const remoteData = await productRemoteDataSource.getProductListLargeSet();
    if (ApiResult.isError(remoteData)) {
      return null;
    }
    const newEtag = remoteData.headers.etag.replace(/"/g, "");
    await productLocalDataSource.setProductListLarge(newEtag, remoteData.data);
    await productLocalDataSource.setCurrentEtag(LARGE_LIST_KEY, newEtag);
    return remoteData.data;
  };
}

const productRepository: IProductRepository = new ProductRepository();
export default productRepository;
