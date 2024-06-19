import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Text,
  Dimensions,
} from "react-native";
import { UIProduct } from "../../stores/product_store";

interface SearchResultProps {
  products: UIProduct[];
  onProductClick: (productId: number) => void;
}
const { width } = Dimensions.get("window");
const itemWidth = (width - 30) / 2;

export const SearchResult: React.FC<SearchResultProps> = ({
  products,
  onProductClick,
}) => {
  const { width } = Dimensions.get("window");
  console.log(width);
  const newNumColumns = width < 600 ? 2 : 3;

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        numColumns={newNumColumns}
        keyExtractor={(item, index) => `${item}-${index}`}
        data={products}
        renderItem={(item) => {
          return (
            <View style={styles.productContainer}>
              <Image
                source={{ uri: item.item.imageUrl }}
                style={styles.image}
              />
              <Text style={styles.title}>{item.item.productTitle}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  title: {
    fontSize: 12,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 1,
    backgroundColor: "white",
  },
  productContainer: {
    width: itemWidth,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    margin: 5,
    elevation: 1,
  },
});
