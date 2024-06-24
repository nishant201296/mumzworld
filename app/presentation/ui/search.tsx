import { router } from "expo-router";
import { observer } from "mobx-react-lite";
import React, { useRef, useState } from "react";
import {
  I18nManager,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ProductStore } from "../stores/product_store";
import { SearchBar } from "./components/search_bar";
import { Colors } from "@/app/utils/styles";
import { capitalizeFirstLetter } from "@/app/utils/utils";
import Ionicons from "@expo/vector-icons/Ionicons";

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
      store.performKeywordSearchV2(searchText);
      searchTextRef.current = searchText;
    };

    const onTextChange = (searchText: string) => {
      searchTextRef.current = searchText;
      if (searchText) {
        store.performKeywordSearchV2(searchText);
      } else {
        store.clearSearch();
      }
    };

    const onShowSearchResult = (searchQuery: string, searchIn?: string) => {
      router.push({
        pathname: "/search_result",
        params: {
          searchQuery,
          headerTitle: searchQuery,
          searchIn,
        },
      });
    };

    const ResultSummary = () => {
      return (
        <View style={styles.searchResultContainer}>
          {store.searchResultV2.totalProducts ? <AllProducts /> : <></>}
          {store.searchResultV2.brandNames.length ? <Brands /> : <></>}
          {store.searchResultV2.categoryNames.length ? <Categories /> : <></>}
        </View>
      );
    };

    const AllProducts = () => {
      return (
        <View style={styles.brandCategoryContainer}>
          <Text style={styles.brandCategoryTitle}>{`ALL PRODUCTS`}</Text>
          <Pressable
            onPress={() => {
              onShowSearchResult(searchTextRef.current);
            }}
          >
            <View style={styles.brandCategory}>
              <Text
                numberOfLines={1}
                style={styles.productCount}
              >{`Found ${store.searchResultV2.totalProducts} match for "${searchTextRef.current}"`}</Text>
              <Ionicons
                name={I18nManager.isRTL ? "chevron-back" : "chevron-forward"}
                size={24}
                color={Colors.semantic_fg_accent.color}
              />
            </View>
          </Pressable>
        </View>
      );
    };

    const Brands = () => {
      return (
        <View style={styles.brandCategoryContainer}>
          <Text style={styles.brandCategoryTitle}>BRANDS</Text>
          {store.searchResultV2.brandNames.map((brandName, index) => {
            return (
              <Pressable
                key={brandName + index}
                onPress={() => {
                  onShowSearchResult(brandName, "brands");
                }}
              >
                <View style={styles.brandCategory}>
                  <HighlightSubstring
                    mainString={capitalizeFirstLetter(brandName)}
                    subString={searchTextRef.current}
                  />
                  <Ionicons
                    name={
                      I18nManager.isRTL ? "chevron-back" : "chevron-forward"
                    }
                    size={24}
                    color={Colors.semantic_fg_accent.color}
                  />
                </View>
              </Pressable>
            );
          })}
        </View>
      );
    };

    const Categories = () => {
      return (
        <View style={styles.brandCategoryContainer}>
          <Text style={styles.brandCategoryTitle}>CATEGORIES</Text>
          {store.searchResultV2.categoryNames.map((categoryName, index) => {
            return (
              <Pressable
                key={categoryName + index}
                onPress={() => {
                  onShowSearchResult(categoryName, "categories");
                }}
              >
                <View style={styles.brandCategory}>
                  <HighlightSubstring
                    mainString={capitalizeFirstLetter(categoryName)}
                    subString={searchTextRef.current}
                  />
                  <Ionicons
                    name={
                      I18nManager.isRTL ? "chevron-back" : "chevron-forward"
                    }
                    size={24}
                    color={Colors.semantic_fg_accent.color}
                  />
                </View>
              </Pressable>
            );
          })}
        </View>
      );
    };

    const NoResults = () => {
      return (
        <Text style={styles.noResult}>
          {`No results found for\n"${searchTextRef.current}"`}
        </Text>
      );
    };

    const HighlightSubstring = ({
      mainString,
      subString,
    }: {
      mainString: string;
      subString: string;
    }) => {
      if (!mainString || !subString) return <Text>{mainString}</Text>;

      const parts = mainString.split(new RegExp(`(${subString})`, "gi"));

      return (
        <Text>
          {parts.map((part, index) =>
            part.toLowerCase() === subString.toLowerCase() ? (
              <Text key={index} style={styles.highlight}>
                {part}
              </Text>
            ) : (
              <Text key={index}>{part}</Text>
            )
          )}
        </Text>
      );
    };

    return (
      <View style={styles.searchContainer}>
        <SearchBar
          onClearHistory={store.clearSearchHistoryItem}
          historyItems={store.searchHistoryItems}
          onSearchClick={onSearch}
          onTextChange={onTextChange}
        />
        {store.searchResultV2.totalProducts ? (
          <ScrollView>
            <TouchableWithoutFeedback>
              <ResultSummary />
            </TouchableWithoutFeedback>
          </ScrollView>
        ) : (
          searchTextRef.current.length > 0 && <NoResults />
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
  },
  highlight: {
    fontWeight: "bold",
    color: Colors.semantic_fg_accent.color,
  },
  searchResult: {
    margin: 20,
    fontSize: 16,
    textAlign: "center",
  },
  brandCategoryContainer: {
    marginTop: 16,
  },
  searchResultContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  productCount: {
    textAlign: "left",
    maxWidth: 300,
    textDecorationStyle: "solid",
  },
  brandCategoryTitle: {
    fontWeight: "bold",
    textAlign: "left",
  },
  brandCategory: {
    elevation: 5,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 6,
    paddingHorizontal: 8,
    flexDirection: "row",
    height: 40,
    backgroundColor: Colors.semantic_bg_muted.color,
  },
  noResult: {
    textAlign: "center",
    marginTop: 100,
    fontSize: 20,
    fontWeight: "bold",
  },
});
