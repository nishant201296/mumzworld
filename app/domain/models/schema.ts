// import { appSchema, tableSchema } from "@nozbe/watermelondb";

// const schema = appSchema({
//   version: 2, // Incremented version due to schema changes
//   tables: [
//     tableSchema({
//       name: "brands",
//       columns: [
//         { name: "title", type: "string" },
//         { name: "bid", type: "number" },
//       ],
//     }),
//     tableSchema({
//       name: "categories",
//       columns: [{ name: "name", type: "string" }],
//     }),
//     tableSchema({
//       name: "products",
//       columns: [
//         { name: "brand_id", type: "number", isIndexed: true },
//         { name: "brand_title", type: "string" },
//         { name: "categories", type: "string" },
//         { name: "product_id", type: "number", isIndexed: true },
//         { name: "is_yalla", type: "string" },
//         { name: "low_stock_qty", type: "number", isOptional: true },
//         { name: "name", type: "string" },
//         { name: "currency", type: "string" },
//         { name: "price", type: "number" },
//         { name: "discount_amount_off", type: "number" },
//         { name: "discount_percent_off", type: "number" },
//         { name: "final_price", type: "number" },
//         { name: "usd_final_price", type: "number" },
//         { name: "product_label_active_from", type: "string" },
//         { name: "product_label_active_to", type: "string" },
//         { name: "product_label_background_color", type: "string" },
//         { name: "product_label_text", type: "string" },
//         { name: "product_label_text_color", type: "string" },
//         { name: "sku", type: "string" },
//         { name: "small_image_url", type: "string" },
//         { name: "stock_status", type: "string" },
//         { name: "type_id", type: "string" },
//         { name: "uid", type: "string" },
//         { name: "url_key", type: "string" },
//         { name: "url_suffix", type: "string" },
//       ],
//     }),
//     tableSchema({
//       name: "product_categories",
//       columns: [
//         { name: "product_id", type: "number", isIndexed: true },
//         { name: "category_id", type: "number", isIndexed: true },
//       ],
//     }),
//   ],
// });

// export default schema;
