import { View, StyleSheet, Text, Pressable } from "react-native";
import { ProductStore } from "../stores/product_store";
import { observer } from "mobx-react-lite";
import { SearchBar } from "./components/search_bar";
import React, { useRef } from "react";
import { router } from "expo-router";

export const Search = () => {
  const store = new ProductStore();
  store.fetchSearchHistoryItems();
  return <SearchComponent store={store} />;
};

const SearchComponent: React.FC<{ store: ProductStore }> = observer(
  ({ store }) => {
    const searchTextRef = useRef("");

    const onSearch = (searchText: string) => {
      store.updateSearchHistoryItem(searchText);
      store.performKeywordSearch(searchText);
      searchTextRef.current = searchText;
    };

    const onShowSearchResult = () => {
      router.push({
        pathname: "/search_result",
        params: {
          searchQuery: searchTextRef.current,
        },
      });
    };

    return (
      <View style={styles.searchContainer}>
        <SearchBar
          onClearHistory={store.clearSearchHistoryItem}
          historyItems={store.searchHistoryItems}
          onSearch={onSearch}
        />
        {store.products.length > 0 && (
          <Pressable onPress={onShowSearchResult}>
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
