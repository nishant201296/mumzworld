import { productLocalDataSource } from "@/app/data/datasources/products_local_data_source";
import { productRemoteDataSource } from "@/app/data/datasources/products_remote_data_source";
import { SimpleProduct } from "@/app/data/models/product_detail";
import { ProductLabel, ProductPrice } from "@/app/data/models/product_list";
import productRepository from "@/app/data/repositoryimpl/product_repository_impl";
import { ApiResult } from "@/app/utils/utils";
import { makeAutoObservable, runInAction } from "mobx";
export class ProductStore {
  products: UIProduct[] = [];
  searchHistoryItems: string[] = [];
  product?: SimpleProduct = undefined;

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
      return;
    }

    const productsToShow = productListLarge.data.products.items.map((item) => {
      const uiProduct: UIProduct = {
        id: item.id,
        imageUrl: item.small_image.url,
        productTitle: item.name,
        finalPrice:
          item.price_range.minimum_price.final_price.currency +
          " " +
          item.price_range.minimum_price.final_price.value.toFixed(2),
        isYalla: item.is_yalla.length > 0,
        inStock: item.stock_status == "IN_STOCK",
      };
      this.getDiscountValue(uiProduct, item.price_range.minimum_price);
      this.getLabelValue(uiProduct, item.product_label);
      return uiProduct;
    });
    this.setProducts(productsToShow);
  };

  getDiscountValue = (uiProduct: UIProduct, minimumPrice: ProductPrice) => {
    const percentOff = minimumPrice.discount?.percent_off;
    if (percentOff) {
      uiProduct.discountPercent = `-${Math.round(percentOff)}%`;
      uiProduct.basePrice = minimumPrice.regular_price?.value.toFixed(2);
    }
  };

  getLabelValue = (uiProduct: UIProduct, productLabel: ProductLabel) => {
    if (!productLabel.label_id) {
      return;
    }
    const fromDate = new Date(productLabel.active_from);
    const toDate = new Date(productLabel.active_to);
    const currentDate = new Date();

    const isLabelActive = currentDate >= fromDate && currentDate <= toDate;

    if (!isLabelActive) {
      return;
    }

    uiProduct.tag = {
      textColor: productLabel.text_color,
      textBgColor: productLabel.background_color,
      text: productLabel.label_text,
      isActive: true,
    };
  };

  fetchSearchHistoryItems = async () => {
    const items = await productLocalDataSource.getSearchHistoryItems();
    this.setHistoryItems(items);
  };

  updateSearchHistoryItem = async (searchText: string) => {
    const updatedHistory = [
      searchText,
      ...this.searchHistoryItems.filter((item) => item !== searchText),
    ];
    await productLocalDataSource.updateSearchHistoryItems(updatedHistory);
    this.setHistoryItems(updatedHistory);
  };

  performKeywordSearch = (searchText: string) => {
    this.updateSearchHistoryItem(searchText);
  };

  setProducts = (productsToShow: UIProduct[]) => {
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

export interface UIProduct {
  id: number;
  imageUrl: string;
  productTitle: string;
  discountPercent?: string;
  basePrice?: string;
  finalPrice: string;
  isYalla: boolean;
  tag?: ProductTag;
  inStock: boolean;
}

export interface ProductTag {
  textColor: string;
  textBgColor: string;
  text: string;
  isActive: Boolean;
}
