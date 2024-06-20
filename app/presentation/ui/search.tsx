import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { ProductStore } from "../stores/product_store";
import { observer } from "mobx-react-lite";
import { SearchBar } from "./components/search_bar";
import { SearchResult } from "./components/search_result";
import React from "react";

export const Search = () => {
  const store = new ProductStore();
  store.fetchProducts();
  store.fetchSearchHistoryItems();
  return <SearchComponent store={store} />;
};

const SearchComponent: React.FC<{ store: ProductStore }> = observer(
  ({ store }) => {
    return (
      <View style={styles.searchContainer}>
        <SearchBar
          historyItems={store.searchHistoryItems}
          onSearch={(searchText) => {
            store.performKeywordSearch(searchText);
          }}
        />
        {store.products.length ? (
          <SearchResult
            products={store.products}
            onProductClick={(product) => {}}
            onAddToCart={(product) => {
              Alert.alert(
                "Added",
                `${product.productTitle} is added to the cart`,
                [
                  {
                    text: "Done",
                  },
                ]
              );
            }}
          />
        ) : (
          <ActivityIndicator />
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
  },
});
