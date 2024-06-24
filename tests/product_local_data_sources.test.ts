import { productLocalDataSource } from "../app/data/datasources/products_local_data_source";
import { ProductListDTO } from "../app/data/models/product_list";
import fileService from "../app/domain/services/file_service";
import storage from "../app/domain/services/persistent_storage_service";
import { productListMock } from "./mock";

// jest.mock("expo-secure-store");
// jest.mock("expo-file-system");

describe("ProductLocalDataSource", () => {
  const mockProductListDTO: ProductListDTO = productListMock;
  const eTag = "testETag";
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return ProductListDTO for getProductListLarge when fileService reads data successfully", async () => {
    jest
      .spyOn(fileService, "readDataFromFile")
      .mockResolvedValue(JSON.stringify(mockProductListDTO));
    const result = await productLocalDataSource.getProductListLarge(eTag);
    expect(result).toEqual(mockProductListDTO);
  });

  it("should return null for getProductListLarge when fileService fails to read data", async () => {
    jest
      .spyOn(fileService, "readDataFromFile")
      .mockRejectedValue(new Error("File not found"));
    const result = await productLocalDataSource.getProductListLarge(eTag);
    expect(result).toBeNull();
  });

  it("should return true for setProductListLarge when fileService saves data successfully", async () => {
    jest.spyOn(fileService, "saveDataToFile").mockResolvedValue(undefined);
    const result = await productLocalDataSource.setProductListLarge(
      eTag,
      mockProductListDTO
    );
    expect(result).toBe(true);
  });

  it("should return false for setProductListLarge when fileService fails to save data", async () => {
    jest
      .spyOn(fileService, "saveDataToFile")
      .mockRejectedValue(new Error("Save failed"));
    const result = await productLocalDataSource.setProductListLarge(
      eTag,
      mockProductListDTO
    );
    expect(result).toBe(false);
  });

  it("should return ProductListDTO for getProductListSmall when fileService reads data successfully", async () => {
    jest
      .spyOn(fileService, "readDataFromFile")
      .mockResolvedValue(JSON.stringify(mockProductListDTO));
    const result = await productLocalDataSource.getProductListSmall(eTag);
    expect(result).toEqual(mockProductListDTO);
  });

  it("should return null for getProductListSmall when fileService fails to read data", async () => {
    jest
      .spyOn(fileService, "readDataFromFile")
      .mockRejectedValue(new Error("File not found"));
    const result = await productLocalDataSource.getProductListSmall(eTag);
    expect(result).toBeNull();
  });

  it("should return true for setProductListSmall when fileService saves data successfully", async () => {
    jest.spyOn(fileService, "saveDataToFile").mockResolvedValue(undefined);
    const result = await productLocalDataSource.setProductListSmall(
      eTag,
      mockProductListDTO
    );
    expect(result).toBe(true);
  });

  it("should return false for setProductListSmall when fileService fails to save data", async () => {
    jest
      .spyOn(fileService, "saveDataToFile")
      .mockRejectedValue(new Error("Save failed"));
    const result = await productLocalDataSource.setProductListSmall(
      eTag,
      mockProductListDTO
    );
    expect(result).toBe(false);
  });

  it("should return the current language when storage gets data successfully", async () => {
    const lang = "en";
    jest.spyOn(storage, "getItemAsync").mockResolvedValue(lang);
    const result = await productLocalDataSource.getCurrentLang();
    expect(result).toBe(lang);
  });

  it("should return an empty string for getCurrentLang when storage fails to get data", async () => {
    jest
      .spyOn(storage, "getItemAsync")
      .mockRejectedValue(new Error("Get failed"));
    const result = await productLocalDataSource.getCurrentLang();
    expect(result).toBe("");
  });

  it("should successfully set the current language", async () => {
    jest.spyOn(storage, "setItemAsync").mockResolvedValue(undefined);
    await productLocalDataSource.setCurrentLang("en");
    expect(storage.setItemAsync).toHaveBeenCalledWith("CURRENT_LANG", "en");
  });

  it("should return search history items when storage gets data successfully", async () => {
    const items = ["item1", "item2"];
    jest
      .spyOn(storage, "getItemAsync")
      .mockResolvedValue(JSON.stringify(items));
    const result = await productLocalDataSource.getSearchHistoryItems();
    expect(result).toEqual(items);
  });

  it("should return an empty array for getSearchHistoryItems when storage fails to get data", async () => {
    jest
      .spyOn(storage, "getItemAsync")
      .mockRejectedValue(new Error("Get failed"));
    const result = await productLocalDataSource.getSearchHistoryItems();
    expect(result).toEqual([]);
  });

  it("should successfully update search history items", async () => {
    jest.spyOn(storage, "setItemAsync").mockResolvedValue(undefined);
    const items = ["item1", "item2"];
    await productLocalDataSource.updateSearchHistoryItems(items);
    expect(storage.setItemAsync).toHaveBeenCalledWith(
      "SEARCH_HISTORY_ITEM_KEY",
      JSON.stringify(items)
    );
  });

  it("should return the current etag when storage gets data successfully", async () => {
    const etag = "12345";
    jest.spyOn(storage, "getItemAsync").mockResolvedValue(etag);
    const result = await productLocalDataSource.getCurrentEtag("key");
    expect(result).toBe(etag);
  });

  it("should return an empty string for getCurrentEtag when storage fails to get data", async () => {
    jest
      .spyOn(storage, "getItemAsync")
      .mockRejectedValue(new Error("Get failed"));
    const result = await productLocalDataSource.getCurrentEtag("key");
    expect(result).toBe("");
  });

  it("should successfully set the current etag", async () => {
    jest.spyOn(storage, "setItemAsync").mockResolvedValue(undefined);
    const etag = "12345";
    await productLocalDataSource.setCurrentEtag("key", etag);
    expect(storage.setItemAsync).toHaveBeenCalledWith(
      "PRODUCT_LIST_ETAGkey",
      etag
    );
  });
});
