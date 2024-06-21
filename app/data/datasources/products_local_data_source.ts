import storage from "../services/persistent_storage_service";
import fileService from "../services/file_service";
import { ProductListDTO } from "../models/product_list";

export interface IProductLocalDataSource {
  getSearchHistoryItems(): Promise<string[]>;
  updateSearchHistoryItems(items: string[]): Promise<void>;

  getCurrentEtag(key: string): Promise<string | null>;
  setCurrentEtag(key: string, etag: string): Promise<void>;

  getCurrentLang(): Promise<string | null>;
  setCurrentLang(lang: string): Promise<void>;

  getProductListLarge(eTag: string): Promise<ProductListDTO | null>;
  setProductListLarge(eTag: string, products: ProductListDTO): Promise<boolean>;

  getProductListSmall(eTag: string): Promise<ProductListDTO | null>;
  setProductListSmall(eTag: string, products: ProductListDTO): Promise<boolean>;
}

class ProductLocalDataSource implements IProductLocalDataSource {
  async getProductListLarge(eTag: string): Promise<ProductListDTO | null> {
    try {
      const data = await fileService.readDataFromFile(
        `${eTag}/`,
        `${LARGE_LIST_KEY}.json`
      );
      return JSON.parse(data) as ProductListDTO;
    } catch (error) {
      return null;
    }
  }

  async setProductListLarge(
    eTag: string,
    products: ProductListDTO
  ): Promise<boolean> {
    try {
      const data = JSON.stringify(products);
      await fileService.saveDataToFile(
        `${eTag}/`,
        `${LARGE_LIST_KEY}.json`,
        data
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async getProductListSmall(eTag: string): Promise<ProductListDTO | null> {
    try {
      const data = await fileService.readDataFromFile(
        `${eTag}/`,
        `${SMALL_LIST_KEY}.json`
      );
      return JSON.parse(data) as ProductListDTO;
    } catch (error) {
      return null;
    }
  }

  async setProductListSmall(
    eTag: string,
    products: ProductListDTO
  ): Promise<boolean> {
    try {
      const data = JSON.stringify(products);
      await fileService.saveDataToFile(
        `${eTag}/`,
        `${SMALL_LIST_KEY}.json`,
        data
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async getCurrentLang(): Promise<string | null> {
    try {
      return await storage.getItemAsync(CURRENT_LANG_KEY);
    } catch (error) {
      return "";
    }
  }

  async setCurrentLang(lang: string): Promise<void> {
    try {
      await storage.setItemAsync(CURRENT_LANG_KEY, lang);
    } catch (error) {}
  }

  getSearchHistoryItems = async (): Promise<string[]> => {
    try {
      const result = await storage.getItemAsync(SEARCH_HISTORY_ITEM_KEY);
      if (!result) {
        return [];
      }
      return JSON.parse(result);
    } catch (error) {
      return [];
    }
  };

  async updateSearchHistoryItems(items: string[]): Promise<void> {
    try {
      await storage.setItemAsync(
        SEARCH_HISTORY_ITEM_KEY,
        JSON.stringify(items)
      );
    } catch (error) {}
  }

  getCurrentEtag = async (key: string) => {
    try {
      return await storage.getItemAsync(PRODUCT_LIST_ETAG_KEY + key);
    } catch (error) {
      return "";
    }
  };

  setCurrentEtag = async (key: string, etag: string) => {
    try {
      await storage.setItemAsync(PRODUCT_LIST_ETAG_KEY + key, etag);
    } catch (error) {}
  };
}
const SEARCH_HISTORY_ITEM_KEY = "SEARCH_HISTORY_ITEM_KEY";
const PRODUCT_LIST_ETAG_KEY = "PRODUCT_LIST_ETAG";
const CURRENT_LANG_KEY = "CURRENT_LANG";
export const LARGE_LIST_KEY = "_LARGE_LIST";
export const SMALL_LIST_KEY = "_SMALL_LIST_KEY";

const productLocalDataSource: IProductLocalDataSource =
  new ProductLocalDataSource();
export { productLocalDataSource };
