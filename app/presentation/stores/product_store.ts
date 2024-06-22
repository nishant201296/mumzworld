import { productLocalDataSource } from "@/app/data/datasources/products_local_data_source";
import { productRemoteDataSource } from "@/app/data/datasources/products_remote_data_source";
import { SimpleProduct } from "@/app/data/models/product_detail";
import productRepository from "@/app/data/repositoryimpl/product_repository_impl";
import { ApiResult } from "@/app/utils/utils";
import { makeAutoObservable, runInAction } from "mobx";
import { UIProduct } from "../models/view_entities";
import createIndexUseCase from "@/app/domain/usecases/create_index_usecase";
import searchProductsUseCase from "@/app/domain/usecases/search_products_usecase";
import uiProductMapper from "../mappers/ui_product_mapper";
export class ProductStore {
  products: UIProduct[] = [];
  searchHistoryItems: string[] = [];
  product?: SimpleProduct = undefined;
  categories: string[] = [];
  brands: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchProduct = async (productId: string) => {
    //API should return product based on product {productId}
    const productDetails = await productRemoteDataSource.getProduct();
    if (ApiResult.isSuccess(productDetails)) {
      let lang = await productLocalDataSource.getCurrentLang();
      if (!lang) {
        lang = "en";
      }
      const product = productDetails.data.data.product.find((item) => {
        return item.language === lang;
      });
      product &&
        (product.baseUrl =
          "https://www.mumzworld.com/media/catalog/product/cache/8bf0fdee44d330ce9e3c910273b66bb2");
      this.setProduct(product);
    }
  };

  setProduct = (product?: SimpleProduct) => {
    runInAction(() => {
      this.product = product;
    });
  };

  fetchProducts = async () => {
    const productListLarge = await productRepository.getProductListLarge();
    if (!productListLarge) {
      productRepository.setIndexes({
        products: {},
        byBrand: {},
        byCategory: {},
      });
      return;
    }
    const indexes = createIndexUseCase.createIndexes(productListLarge);
    productRepository.setIndexes(indexes);
  };

  fetchSearchHistoryItems = async () => {
    const items = await productLocalDataSource.getSearchHistoryItems();
    this.setHistoryItems(items);
  };

  fetchBrandList = async () => {
    const brands = Object.keys(productRepository.getIndexes().byBrand).map(
      (brandName) => brandName
    );
    this.setBrands(brands);
  };

  setBrands(brands: string[]) {
    runInAction(() => {
      this.brands = brands;
    });
  }

  fetchCategoryList = async () => {
    const categories = Object.keys(
      productRepository.getIndexes().byCategory
    ).map((categoryName) => categoryName);
    this.setCategories(categories);
  };

  setCategories(categories: string[]) {
    runInAction(() => {
      this.categories = categories;
    });
  }

  updateSearchHistoryItem = async (searchText: string) => {
    let updatedHistory = [
      searchText,
      ...this.searchHistoryItems.filter((item) => item !== searchText),
    ];
    updatedHistory = updatedHistory.slice(0, 5);
    await productLocalDataSource.updateSearchHistoryItems(updatedHistory);
    this.setHistoryItems(updatedHistory);
  };

  clearSearchHistoryItem = async () => {
    await productLocalDataSource.updateSearchHistoryItems([]);
    this.setHistoryItems([]);
  };

  performKeywordSearch = async (searchText: string) => {
    const searchResult = searchProductsUseCase.searchProducts(searchText);
    const productsToShow = uiProductMapper.map(searchResult);
    this.setProductsToShow(productsToShow);
  };

  clearSearch = () => {
    this.setProductsToShow([]);
  };

  setProductsToShow = (productsToShow: UIProduct[]) => {
    runInAction(() => {
      this.products = productsToShow;
    });
  };

  setHistoryItems = (historyItems: string[]) => {
    runInAction(() => {
      this.searchHistoryItems = historyItems;
    });
  };
}

const productStoreShared = new ProductStore();
export default productStoreShared;
