import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
  Button,
  I18nManager,
  Platform,
  Pressable,
} from "react-native";
import { WebView } from "react-native-webview";
import { ProductStore } from "./presentation/stores/product_store";
import { router, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import Carousel from "react-native-reanimated-carousel";
import { observer } from "mobx-react-lite";
import { Colors } from "./utils/styles";
import AnimatedDotsCarousel from "react-native-animated-dots-carousel";
import { MediaGalleryEntry, SimpleProduct } from "./data/models/product_detail";
import Ionicons from "@expo/vector-icons/Ionicons";

const ProductDetails = () => {
  const { productId } = useLocalSearchParams();
  const store = new ProductStore();
  store.fetchProduct(productId as string);
  return <ProductDetailsComponent store={store} />;
};

const ProductDetailsComponent: React.FC<{ store: ProductStore }> = observer(
  ({ store }) => {
    const width = Dimensions.get("window").width;

    const renderItem = useCallback(
      ({ item }: { item: MediaGalleryEntry }) => (
        <Pressable
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            // open gallery
          }}
        >
          <View>
            <Image
              width={width - 30}
              height={width - 30}
              resizeMode="contain"
              source={{
                uri: store.product?.baseUrl + item.file,
              }}
            />
            {shouldShowYalla(store.product) && (
              <Text style={styles.yalla}>{"Yalla"}</Text>
            )}
            {shouldShowReview(store.product) && (
              <Text style={styles.review}>{
                //mocking
                `4.1★ - 9k`
              }</Text>
            )}
          </View>
        </Pressable>
      ),
      []
    );

    return (
      <>
        {store.product ? (
          <View style={styles.container}>
            <View style={styles.actionBar}>
              <Pressable
                onPress={() => {
                  router.back();
                }}
              >
                <Ionicons name="arrow-back" size={25} style={{}} />
              </Pressable>
              <View style={styles.titleContainer}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.title}
                >
                  {store.product.name}
                </Text>
              </View>
            </View>
            <Carousel
              pagingEnabled={true}
              width={width - 20}
              height={width - 20}
              data={store.product.media_gallery_entries}
              scrollAnimationDuration={250}
              loop={false}
              onScrollBegin={() => {}}
              renderItem={renderItem}
            />
          </View>
        ) : (
          <ActivityIndicator />
        )}
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
  },
  actionBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 4, // Android elevation
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "100%",
    height: 50,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    marginRight: 10,
  },
  yalla: {
    fontWeight: "bold",
    fontStyle: "italic",
    backgroundColor: "yellow",
    paddingHorizontal: 6,
    borderRadius: 8,
    color: Colors.semantic_fg_text.color,
    position: "absolute",
    marginEnd: 8,
    marginTop: 8,
    end: 0,
  },

  review: {
    fontWeight: "bold",
    backgroundColor: Colors.semantic_fg_accent.color,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    color: Colors.white.color,
    position: "absolute",
    marginEnd: 8,
    marginBottom: 8,
    end: 0,
    bottom: 0,
  },
});

export default ProductDetails;
function shouldShowYalla(product?: SimpleProduct): boolean {
  // mocking value
  return true;

  // actual business logic
  return (
    (product?.is_yalla?.length ?? 0) > 0 &&
    (product?.stock_status == `IN_STOCK` ?? false)
  );
}
function shouldShowReview(product?: SimpleProduct): boolean {
  // mocking value
  return true;

  // actual business logic
  const rating = product?.rating_summary ?? 0;
  return rating > 4.0;
}
