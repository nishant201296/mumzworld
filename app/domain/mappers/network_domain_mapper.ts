// import { ProductListDTO } from "@/app/data/models/product_list";
// import database from "../models/db";
// import Product from "../models/product";
// import Brand from "../models/brand";
// import Category from "../models/category";
// import ProductCategory from "../models/product_category";
// import { Q } from "@nozbe/watermelondb";

// async function mapAndInsertProducts(apiData: ProductListDTO) {
//   try {
//     await database.action(async () => {
//       await database.unsafeResetDatabase();
//     });
//   } catch (error: any) {}
//   const productCollection = database.collections.get<Product>("products");
//   const brandCollection = database.collections.get<Brand>("brands");
//   const categoryCollection = database.collections.get<Category>("categories");
//   const productCategoryCollection =
//     database.collections.get<ProductCategory>("product_categories");

//   const batchOperations = [];

//   for (const product of apiData.data.products.items) {
//     const brandTitle = product.brand_info.title;
//     const brandId = product.brand;

//     // add brand
//     const savedBrands = await brandCollection
//       .query(Q.where("bid", brandId))
//       .fetch();
//     if (savedBrands[0].bid != brandId) {
//       const brand = await brandCollection.create((brandRecord) => {
//         brandRecord.title = brandTitle;
//         brandRecord.bid = brandId;
//       });
//       batchOperations.push(brand);
//     }

//     // add category
//     product.categories.forEach(async (cat) => {
//       const categoryName = cat.name;
//       const categoryId = cat.name;
//       const savedCategories = await categoryCollection
//         .query(Q.where("cid", categoryId))
//         .fetch();

//       if (savedCategories[0].cid != categoryId) {
//         const categoryRecord = await categoryCollection.create(
//           (categoryRec) => {
//             categoryRec.name = categoryName;
//             categoryRec.cid = categoryId;
//           }
//         );
//         batchOperations.push(categoryRecord);
//       }
//     });
//   }

//   for (const product of apiData.data.products.items) {
//     const newProduct = await productCollection.create((productRecord) => {
//       productRecord.brandId = product.brand;
//       productRecord.productId = product.id;
//       productRecord.brandName = product.brand_info.title;
//       //   productRecord.isYalla = product.is_yalla.join(",");
//       //   productRecord.low_stock_qty = product.low_stock_qty
//       //     ? parseFloat(product.low_stock_qty)
//       //     : null;
//       //   productRecord.name = product.name;
//       //   productRecord.currency = product.price.regularPrice.amount.currency;
//       //   productRecord.price = product.price.regularPrice.amount.value;
//       //   productRecord.discount_amount_off =
//       //     product.price_range.minimum_price.discount?.amount_off || 0;
//       //   productRecord.discount_percent_off =
//       //     product.price_range.minimum_price.discount?.percent_off || 0;
//       //   productRecord.final_price =
//       //     product.price_range.minimum_price.final_price.value;
//       //   productRecord.usd_final_price =
//       //     product.usd_price_range.minimum_price.final_price.value;
//       //   productRecord.product_label_active_from =
//       //     product.product_label.active_from || "";
//       //   productRecord.product_label_active_to =
//       //     product.product_label.active_to || "";
//       //   productRecord.product_label_background_color =
//       //     product.product_label.background_color || "";
//       //   productRecord.product_label_text = product.product_label.label_text || "";
//       //   productRecord.product_label_text_color =
//       //     product.product_label.text_color || "";
//       //   productRecord.sku = product.sku;
//       //   productRecord.small_image_url = product.small_image.url;
//       //   productRecord.stock_status = product.stock_status;
//       //   productRecord.type_id = product.type_id;
//       //   productRecord.uid = product.uid;
//       //   productRecord.url_key = product.url_key;
//       //   productRecord.url_suffix = product.url_suffix;
//     });
//     batchOperations.push(newProduct);
//   }

//   await database.batch(...batchOperations);
// }

// // for every product
// //     get brand and create entry
// //     for every Category
// //         get Category and create entry

// // for (const category of product.categories) {
// //     const productCategoryRecord = await productCategoryCollection.create(
// //       (productCategoryRec) => {
// //         productCategoryRec.productId = product.id;
// //         productCategoryRec.categoryId = category.name;
// //       }
// //     );
// //     batchOperations.push(productCategoryRecord);
// //   }
