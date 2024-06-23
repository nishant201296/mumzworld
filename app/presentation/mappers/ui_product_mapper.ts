import {
  Item,
  ProductLabel,
  ProductPrice,
} from "@/app/data/models/product_list";
import { UIProduct, UISearchResult } from "../models/view_entities";
import { SearchResultV2 } from "@/app/domain/models/entities";

class UiProductMapper {
  map = (items: Item[]) => {
    return items.map((item) => {
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
}

class SearchResultMapper {
  map = (result: SearchResultV2): UISearchResult => {
    const uISearchResult: UISearchResult = {
      brandNames: Object.keys(result.brandsMatched)
        .slice(0, 3) // limited to three
        .map((key) => key),
      categoryNames: Object.keys(result.categoryMatched)
        .slice(0, 3) // limited to three
        .map((key) => key),
      totalProducts: result.totalProductCount,
    };
    return uISearchResult;
  };
}
const searchResultMapper = new SearchResultMapper();
const uiProductMapper = new UiProductMapper();
export { searchResultMapper, uiProductMapper };
