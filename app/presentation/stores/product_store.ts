import { productLocalDataSource } from "@/app/data/datasources/products_local_data_source";
import { productRemoteDataSource } from "@/app/data/datasources/products_remote_data_source";
import { SimpleProduct } from "@/app/data/models/product_detail";
import productRepository from "@/app/data/repositoryimpl/product_repository_impl";
import createIndexUseCase from "@/app/domain/usecases/create_index_usecase";
import {
  searchProductsUseCase,
  searchProductsUseCaseV2,
} from "@/app/domain/usecases/search_products_usecase";
import { ApiResult } from "@/app/utils/utils";
import { makeAutoObservable, runInAction } from "mobx";
import {
  uiProductMapper,
  searchResultMapper,
} from "../mappers/ui_product_mapper";
import {
  Brand,
  Category,
  UIProduct,
  UISearchResult,
} from "../models/view_entities";
import { SearchResultV2 } from "@/app/domain/models/entities";
export class ProductStore {
  products: UIProduct[] = [];
  searchHistoryItems: string[] = [];
  product?: SimpleProduct = undefined;
  categories: Category[] = [];
  brands: Brand[] = [];
  searchResultV2: UISearchResult = {
    brandNames: [],
    categoryNames: [],
    totalProducts: 0,
  };

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
    const brandList = productRepository.getIndexes().byBrand;
    const brands: Brand[] = Object.keys(brandList).map((name) => {
      return {
        name,
        imgUrl:
          productRepository.getIndexes().products[brandList[name][0]]
            .small_image.url,
      };
    });
    this.setBrands(brands);
  };

  setBrands(brands: Brand[]) {
    runInAction(() => {
      this.brands = brands;
    });
  }

  fetchCategoryList = async () => {
    const categoryList = productRepository.getIndexes().byCategory;
    const categories: Category[] = Object.keys(categoryList).map((name) => {
      return {
        name,
        imgUrl:
          productRepository.getIndexes().products[categoryList[name][0]]
            .small_image.url,
      };
    });
    this.setCategories(categories);
  };

  setCategories(categories: Category[]) {
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

  performKeywordSearchV2 = async (searchText: string) => {
    const searchResult = searchProductsUseCaseV2.searchProducts(searchText);
    const uiSearchResult = searchResultMapper.map(searchResult);
    this.setProductsV2ToShow(uiSearchResult);
  };

  clearSearch = () => {
    this.setProductsToShow([]);
    this.setProductsV2ToShow({
      brandNames: [],
      categoryNames: [],
      totalProducts: 0,
    });
  };

  setProductsToShow = (productsToShow: UIProduct[]) => {
    runInAction(() => {
      this.products = productsToShow;
    });
  };

  setProductsV2ToShow = (searchResult: UISearchResult) => {
    runInAction(() => {
      this.searchResultV2 = searchResult;
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
