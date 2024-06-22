import { View, StyleSheet, Text, Pressable } from "react-native";
import productStoreIns, { ProductStore } from "../stores/product_store";
import { observer } from "mobx-react-lite";
import { SearchBar } from "./components/search_bar";
import React from "react";
import { router } from "expo-router";

export const Search = () => {
  productStoreIns.fetchSearchHistoryItems();
  return <SearchComponent store={productStoreIns} />;
};

const SearchComponent: React.FC<{ store: ProductStore }> = observer(
  ({ store }) => {
    return (
      <View style={styles.searchContainer}>
        <SearchBar
          onClearHistory={store.clearSearchHistoryItem}
          historyItems={store.searchHistoryItems}
          onSearch={(searchText) => {
            store.performKeywordSearch(searchText);
          }}
        />
        {store.products.length > 0 && (
          <Pressable
            onPress={() => {
              router.push("/search_result");
            }}
          >
            <Text
              style={{ backgroundColor: "red", textAlign: "center" }}
            >{`Showing ${store.products.length} products`}</Text>
          </Pressable>
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
