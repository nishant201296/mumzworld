// import { Model } from "@nozbe/watermelondb";
// import { field, text, relation, json } from "@nozbe/watermelondb/decorators";
// import Brand from "./brand";
// import Category from "./category";

// export default class Product extends Model {
//   static table = "products";

//   @field("brand_id") brandId!: number;
//   @field("category_id") categoryId!: number;
//   @field("product_id") productId!: number;
//   @text("name") name!: string;
//   @text("brand_name") brandName!: string;
//   @text("sku") sku!: string;
//   @field("price") price!: number;
//   @text("currency") currency!: string;
//   @field("discount_amount_off") discountAmountOff!: number;
//   @field("discount_percent_off") discountPercentOff!: number;
//   @field("final_price") finalPrice!: number;
//   @field("usd_final_price") usdFinalPrice!: number;
//   @text("product_label_active_from") productLabelActiveFrom!: string;
//   @text("product_label_active_to") productLabelActiveTo!: string;
//   @text("product_label_background_color") productLabelBackgroundColor!: string;
//   @text("product_label_text") productLabelText!: string;
//   @text("product_label_text_color") productLabelTextColor!: string;
//   @text("small_image_url") smallImageUrl!: string;
//   @text("stock_status") stockStatus!: string;
//   @text("type_id") typeId!: string;
//   @text("uid") uid!: string;
//   @text("url_key") urlKey!: string;
//   @text("url_suffix") urlSuffix!: string;
//   @json("is_yalla", (v) => v) isYalla!: any;
//   @field("low_stock_qty") lowStockQty!: number;
//   // @relation("brands", "brand_id") brand!: Brand;
//   // @relation("categories", "category_id") category!: Category;
// }
