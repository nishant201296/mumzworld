import storage from "../services/persistent_storage_service";

interface IProductLocalDataSource {
  getSearchHistoryItems(): Promise<string[]>;
  updateSearchHistoryItems(items: string[]): Promise<void>;
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
}
const SEARCH_HISTORY_ITEM_KEY = "SEARCH_HISTORY_ITEM_KEY";

const productLocalDataSource = new ProductLocalDataSource();
export { productLocalDataSource };
