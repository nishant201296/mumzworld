import { Item } from "@/app/data/models/product_list";
import productRepository from "@/app/data/repositoryimpl/product_repository_impl";

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

const searchProductsUseCase = new SearchProductsUseCase();
export default searchProductsUseCase;
