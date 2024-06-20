import storage from "../services/persistent_storage_service";

export interface IProductLocalDataSource {
  getSearchHistoryItems(): Promise<string[]>;
  updateSearchHistoryItems(items: string[]): Promise<void>;
  getCurrentEtag(): Promise<string | null>;
  setCurrentEtag(etag: string): Promise<void>;
}

class ProductLocalDataSource implements IProductLocalDataSource {
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
  getCurrentEtag = async () => {
    try {
      const result = await storage.getItemAsync(PRODUCT_LIST_ETAG);
      return result;
    } catch (error) {
      return "";
    }
  };

  setCurrentEtag = async (etag: string) => {
    try {
      await storage.setItemAsync(PRODUCT_LIST_ETAG, etag);
    } catch (error) {}
  };
}
const SEARCH_HISTORY_ITEM_KEY = "SEARCH_HISTORY_ITEM_KEY";
const PRODUCT_LIST_ETAG = "PRODUCT_LIST_ETAG";

const productLocalDataSource = new ProductLocalDataSource();
export { productLocalDataSource };
