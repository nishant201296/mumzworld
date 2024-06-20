import { productLocalDataSource } from "@/app/data/datasources/products_local_data_source";
import { productRemoteDataSource } from "@/app/data/datasources/products_remote_data_source";
import { ProductLabel, ProductPrice } from "@/app/data/models/product_list";
import { ApiResult } from "@/app/utils/utils";
import { makeAutoObservable } from "mobx";
export class ProductStore {
  products: UIProduct[] = [];
  searchHistoryItems: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchProducts = async () => {
    const productListLarge =
      await productRemoteDataSource.getProductListLargeSet();

    if (ApiResult.isSuccess(productListLarge)) {
      this.products = productListLarge.data.data.products.items.map((item) => {
        const uiProduct: UIProduct = {
          id: item.id,
          imageUrl: item.small_image.url,
          productTitle: item.name,
          finalPrice:
            item.price_range.minimum_price.final_price.currency +
            " " +
            item.price_range.minimum_price.final_price.value.toFixed(2),
          isYalla: item.is_yalla.length > 0,
        };
        this.getDiscountValue(uiProduct, item.price_range.minimum_price);
        this.getLabelValue(uiProduct, item.product_label);
        return uiProduct;
      });
    }
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
    this.searchHistoryItems =
      await productLocalDataSource.getSearchHistoryItems();
  };

  updateSearchHistoryItem = async (searchText: string) => {
    const updatedHistory = [
      searchText,
      ...this.searchHistoryItems.filter((item) => item !== searchText),
    ];
    await productLocalDataSource.updateSearchHistoryItems(updatedHistory);
    this.searchHistoryItems = updatedHistory;
  };

  performKeywordSearch = (searchText: string) => {
    this.updateSearchHistoryItem(searchText);
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
}

export interface ProductTag {
  textColor: string;
  textBgColor: string;
  text: string;
  isActive: Boolean;
}
