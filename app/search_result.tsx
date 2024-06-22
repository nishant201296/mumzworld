import React from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import { ProductStore } from "./presentation/stores/product_store";
import { router, useLocalSearchParams } from "expo-router";
import { observer } from "mobx-react-lite";
import { ProductList } from "./presentation/ui/components/product_list";
import { Colors } from "./utils/styles";
import { ActivityIndicator } from "react-native-paper";

const SearchResult = () => {
  const { searchQuery } = useLocalSearchParams();
  const store = new ProductStore();
  store.performKeywordSearch(searchQuery as string);
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
      <Text style={styles.header}>{searchQuery}</Text>
      <ProductList
        products={store.products}
        onProductClick={(product) => {
          router.push({
            pathname: "/product_detail",
            params: { productId: product.id },
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
  header: {
    textAlign: "center",
    fontSize: 18,
    marginVertical: 8,
    color: Colors.semantic_fg_text.color,
  },
});

export default SearchResult;
