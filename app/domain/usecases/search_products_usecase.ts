import productRepository from "@/app/data/repositoryimpl/product_repository_impl";
import { SearchResultV2 } from "../models/entities";

class SearchProductsUseCase {
  searchProducts = (query: string) => {
    const indexes = productRepository.getIndexes();
    const queryWords = query.toLowerCase().split(" ");

    const matchQuery = (text: string) =>
      queryWords.some((word) => text.includes(word));

    const byBrand: number[] = [];
    Object.keys(indexes.byBrand)
      .filter((brand) => matchQuery(brand))
      .forEach((brand) => byBrand.push(...indexes.byBrand[brand]));

    const byCategory: number[] = [];
    Object.keys(indexes.byCategory)
      .filter((category) => matchQuery(category))
      .forEach((category) => byCategory.push(...indexes.byCategory[category]));

    const byProduct: number[] = [];
    Object.keys(indexes.products)
      .filter((pid) => matchQuery(indexes.products[parseInt(pid)].name))
      .forEach((pid) => byProduct.push(parseInt(pid)));
    const results = [...byProduct, ...byBrand, ...byCategory];

    const uniqueResults = Array.from(new Set(results)).map(
      (pid) => indexes.products[pid]
    );

    return uniqueResults;
  };
}

class SearchProductsUseCaseV2 {
  searchProducts = (query: string): SearchResultV2 => {
    const indexes = productRepository.getIndexes();
    const queryWords = query.toLowerCase().split(" ");

    let totalProduct: number[] = [];

    const matchQuery = (text: string) =>
      queryWords.some((word) => text.includes(word));

    const byBrand: Record<string, number[]> = {};
    Object.keys(indexes.byBrand).forEach((brand) => {
      if (matchQuery(brand)) {
        byBrand[brand] = indexes.byBrand[brand];
        totalProduct = totalProduct.concat(indexes.byBrand[brand]);
      }
    });

    const byCategory: Record<string, number[]> = {};
    Object.keys(indexes.byCategory).forEach((category) => {
      if (matchQuery(category)) {
        byCategory[category] = indexes.byCategory[category];
        totalProduct = totalProduct.concat(indexes.byCategory[category]);
      }
    });

    const byProduct: Record<string, number> = {};
    Object.keys(indexes.products).forEach((pid) => {
      const productName = indexes.products[parseInt(pid)].name;
      if (matchQuery(productName)) {
        byProduct[productName] = parseInt(pid);
        totalProduct.push(parseInt(pid));
      }
    });

    const results: SearchResultV2 = {
      brandsMatched: byBrand,
      categoryMatched: byCategory,
      productsMatched: byProduct,
      totalProductCount: Array.from(new Set(totalProduct)).length,
    };

    return results;
  };
}

const searchProductsUseCase = new SearchProductsUseCase();

const searchProductsUseCaseV2 = new SearchProductsUseCaseV2();

export { searchProductsUseCase, searchProductsUseCaseV2 };
