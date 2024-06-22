import React from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import productStoreIns, {
  ProductStore,
} from "./presentation/stores/product_store";
import { router } from "expo-router";
import { observer } from "mobx-react-lite";
import { ProductList } from "./presentation/ui/components/product_list";

const SearchResult = () => {
  return <SearchResultComponent store={productStoreIns} />;
};

const SearchResultComponent: React.FC<{ store: ProductStore }> = observer(
  ({ store }) => {
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
              params: { productId: product.id },
            });
          }}
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
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SearchResult;
