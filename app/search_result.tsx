import { router, useLocalSearchParams } from "expo-router";
import { observer } from "mobx-react-lite";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { ProductStore } from "./presentation/stores/product_store";
import { ProductList } from "./presentation/ui/components/product_list";

const SearchResult = () => {
  const { searchQuery, searchIn } = useLocalSearchParams();
  const store = new ProductStore();
  if (searchIn === "brands") {
    store.performBrandSearch(searchQuery as string);
  } else if (searchIn === "categories") {
    store.performCategorySearch(searchQuery as string);
  } else {
    store.performKeywordSearch(searchQuery as string);
  }

  return (
    <SearchResultComponent store={store} searchQuery={searchQuery as string} />
  );
};

const SearchResultComponent: React.FC<{
  store: ProductStore;
  searchQuery: string;
}> = observer(({ store, searchQuery }) => {
  if (!store.products.length) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }
  return (
    <View style={styles.container}>
      <ProductList
        products={store.products}
        onProductClick={(product) => {
          router.push({
            pathname: "/product_detail",
            params: {
              productId: product.id,
              headerTitle: `${product.productTitle}`,
            },
          });
        }}
        onAddToCart={(product) => {
          Alert.alert("Added", `${product.productTitle} is added to the cart`, [
            {
              text: "Done",
            },
          ]);
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SearchResult;
