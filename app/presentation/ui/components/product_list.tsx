import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Text,
  Dimensions,
  Pressable,
  ViewToken,
} from "react-native";
import { Colors } from "@/app/utils/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { UIProduct } from "../../models/view_entities";

interface ProductListProps {
  products: UIProduct[];
  onProductClick: (productUIProduct: UIProduct) => void;
  onAddToCart: (product: UIProduct) => void;
}

const { width } = Dimensions.get("window");
const newNumColumns = width > 1200 ? 4 : width > 800 ? 3 : 2;
const itemWidth = (width - 10) / newNumColumns;
const itemHeight = (itemWidth * 7) / 5;

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onProductClick,
  onAddToCart,
}) => {
  const [itemsViewed, setItemsViewed] = useState("");

  const keyExtractor = (item: UIProduct, index: number) =>
    `${item.id}-${index}`;

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<UIProduct>[];
  }) => {
    const newViewedItemsIndices = viewableItems.map((item) => item.index);
    let count = newViewedItemsIndices[newViewedItemsIndices.length - 1];
    if (count) {
      count++;
      setItemsViewed(`${count}`);
    }
  };

  const renderItem = ({ item }: { item: UIProduct }) => {
    return (
      <Pressable
        onPress={() => {
          onProductClick(item);
        }}
      >
        <View style={styles.productContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          {item.discountPercent && (
            <Text style={styles.discount}>{item.discountPercent}</Text>
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              {item.productTitle}
            </Text>
            <Pressable
              onPress={() => {
                onAddToCart(item);
              }}
            >
              <Ionicons
                name="cart-outline"
                size={25}
                style={styles.addToCart}
              />
            </Pressable>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.finalPrice}>{item.finalPrice}</Text>
            {item.basePrice && (
              <Text style={styles.basePrice}>{item.basePrice}</Text>
            )}
          </View>
          <View style={styles.tagContainer}>
            {!item.inStock && (
              <Text style={styles.outOfStock}>{"Out of stock"}</Text>
            )}
            {item.isYalla && item.inStock && (
              <Text style={styles.yalla}>{"Yalla"}</Text>
            )}
            {item.tag?.isActive && item.inStock && (
              <Text
                style={{
                  ...styles.tag,
                  backgroundColor: item.tag.textBgColor,
                  color: item.tag.textColor,
                }}
              >
                {item.tag.text}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        numColumns={newNumColumns}
        keyExtractor={keyExtractor}
        data={products}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        initialNumToRender={8}
        windowSize={5}
        getItemLayout={(data, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        renderItem={renderItem}
      />
      <View style={styles.viewedItemsContainer}>
        <Text
          style={styles.viewedItemsText}
        >{`Viewing ${itemsViewed}/${products.length}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewedItemsContainer: {
    start: 0,
    marginTop: 20,
    end: 0,
    flexDirection: "row",
    position: "absolute",
    justifyContent: "center",
  },
  viewedItemsText: {
    padding: 4,
    color: Colors.white.color,
    borderRadius: 8,
    backgroundColor: "#00000080",
  },
  discount: {
    alignSelf: "baseline",
    fontWeight: "bold",
    backgroundColor: Colors.semantic_fg_accent.color,
    paddingHorizontal: 6,
    borderRadius: 8,
    color: Colors.white.color,
    position: "absolute",
    start: 8,
    top: 8,
  },

  tag: {
    paddingHorizontal: 6,
    borderRadius: 8,
    fontSize: 12,
  },
  yalla: {
    fontWeight: "bold",
    fontStyle: "italic",
    backgroundColor: "yellow",
    paddingHorizontal: 6,
    borderRadius: 8,
    color: Colors.semantic_fg_text.color,
    marginEnd: 16,
  },
  outOfStock: {
    fontWeight: "bold",
    backgroundColor: Colors.semantic_fg_accent.color,
    paddingHorizontal: 6,
    borderRadius: 8,
    color: Colors.white.color,
    marginEnd: 16,
  },
  tagContainer: {
    marginTop: 8,
    flexDirection: "row",
  },
  basePrice: {
    color: Colors.semantic_fg_text_weak.color,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  finalPrice: {
    fontWeight: "bold",
    color: Colors.semantic_fg_text.color,
    marginEnd: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  addToCart: {
    paddingHorizontal: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  list: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    color: Colors.semantic_fg_text.color,
    flex: 1,
    textAlign: "left",
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
    backgroundColor: Colors.semantic_bg_subtle.color,
  },
  productContainer: {
    width: itemWidth,
    height: itemHeight,
    margin: 1,
    borderRadius: 8,
    padding: 8,
    backgroundColor: "white",
  },
});