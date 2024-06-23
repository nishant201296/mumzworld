import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, router, useLocalSearchParams } from "expo-router";
import { t } from "i18next";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  I18nManager,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { WebView } from "react-native-webview";
import {
  MediaGalleryEntry,
  ProductPrice,
  SimpleProduct,
} from "./data/models/product_detail";
import { ProductStore } from "./presentation/stores/product_store";
import { BulletPoints } from "./presentation/ui/components/bullets";
import { Colors } from "./utils/styles";
import { ArrayData } from "react-native-photos-gallery";

const ProductDetails = () => {
  const { productId } = useLocalSearchParams();
  const store = new ProductStore();
  store.fetchProduct(productId as string);
  return <ProductDetailsComponent store={store} />;
};

const ProductDetailsComponent: React.FC<{ store: ProductStore }> = observer(
  ({ store }) => {
    const width = Dimensions.get("window").width;

    const ActionBar = ({ name }: { name: string }) => {
      return (
        <View style={styles.actionBar}>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {name}
            </Text>
          </View>
        </View>
      );
    };

    const renderItem = useCallback(
      ({ item }: { item: MediaGalleryEntry }) => (
        <Pressable
          onPress={() => {
            router.push({
              pathname: "/gallery",
              params: {
                data: JSON.stringify(
                  store.product?.media_gallery_entries.map((media) => {
                    return {
                      id: media.id,
                      source: { uri: store.product?.baseUrl + media.file },
                    } as ArrayData;
                  }) ?? []
                ),
              },
            });
          }}
        >
          <View>
            <Image
              width={width}
              height={width}
              resizeMode="contain"
              source={{ uri: store.product?.baseUrl + item.file }}
            />
            {shouldShowYalla(store.product) && (
              <Text style={styles.yalla}>{"Yalla"}</Text>
            )}
            {shouldShowReview(store.product) && (
              <Text style={styles.review}>{
                //mocking
                `4.1★  9k`
              }</Text>
            )}
          </View>
        </Pressable>
      ),
      []
    );
    const flatListRef = useRef<FlatList>(null);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
      if (!store.product) {
        return;
      }

      const startPage = I18nManager.isRTL
        ? store?.product.media_gallery_entries.length - 1
        : 0;
      setCurrentPage(startPage);
    }, [store.product]);

    const scrollBack = () => {
      if (currentPage === 0) {
        return;
      }
      if (!store.product) {
        return;
      }
      let nextPage = currentPage - 1;
      const totalLength = store?.product.media_gallery_entries.length - 1;
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: I18nManager.isRTL ? totalLength - nextPage : nextPage,
        viewPosition: 0.5,
      });

      setCurrentPage(nextPage);
    };

    const scrollForward = () => {
      if (!store.product) {
        return;
      }

      if (currentPage === store.product?.media_gallery_entries.length - 1)
        return;

      let nextPage = currentPage + 1;
      const totalLength = store?.product.media_gallery_entries.length - 1;
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: I18nManager.isRTL ? totalLength - nextPage : nextPage,
        viewPosition: 0.5,
      });

      setCurrentPage(nextPage);
    };

    if (!store.product) {
      return <ActivityIndicator style={{ flex: 1 }} />;
    }

    const ProductPrice = ({ price }: { price: ProductPrice }) => {
      const finalPrice = `${
        price.final_price.currency
      } ${price.final_price.value.toFixed(2)}`;

      const discount =
        price.discount.amount_off > 0
          ? `-${price.discount.percent_off}%`
          : undefined;

      return (
        <View style={{ flexDirection: "column", marginTop: 8 }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
              }}
            >{`${finalPrice}`}</Text>

            {discount && (
              <Text
                style={{
                  backgroundColor: Colors.semantic_fg_accent.color,
                  marginStart: 8,
                  paddingHorizontal: 6,
                  alignSelf: "baseline",
                  paddingBottom: 2,
                  borderRadius: 8,
                  color: Colors.white.color,
                  fontWeight: "bold",
                }}
              >
                {`${discount}`}
              </Text>
            )}
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {discount && (
              <Text
                style={{
                  fontSize: 12,
                  textDecorationLine: "line-through",
                  textDecorationStyle: "solid",
                  marginEnd: 8,
                  color: Colors.semantic_fg_text_weak.color,
                }}
              >{`${price.regular_price.value.toFixed(2)}`}</Text>
            )}

            <Text
              style={{
                fontSize: 12,
                color: Colors.semantic_fg_text_weak.color,
              }}
            >
              {t(`vat`)}
            </Text>
          </View>
        </View>
      );
    };

    const ProductInfo = () => {
      const points = store.product?.features
        .trim()
        .split("\n")
        .map((point) => point.trim())
        .filter((point) => point);

      return (
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{`${t(
            "product_details_title"
          )}`}</Text>
          <View style={{ marginStart: 8, marginTop: 8 }}>
            <Text style={{ fontWeight: "bold" }}>{`${t(
              "feature_title"
            )}`}</Text>
            {points && (
              <BulletPoints points={points} initialCount={points.length / 2} />
            )}
          </View>
          <View style={{ marginStart: 8, marginTop: 16 }}>
            <Text style={{ fontWeight: "bold" }}>{`${t(
              "description_title"
            )}`}</Text>
            {
              <WebView
                source={{
                  html: `<html><body>${store.product?.description.html}</body></html>`,
                }}
                style={{
                  flex: 1,
                  width: "100%",
                  height: 250,
                }}
              />
            }
          </View>
        </View>
      );
    };

    return (
      <View>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollViewContentStyle}
        >
          <TouchableWithoutFeedback>
            <View>
              <ActionBar name={store.product.name} />

              <View style={{ flex: 1 }}>
                <FlatList
                  data={store.product.media_gallery_entries}
                  pagingEnabled
                  renderItem={renderItem}
                  horizontal
                  ref={flatListRef}
                  showsHorizontalScrollIndicator={false}
                  onMomentumScrollEnd={(event) => {
                    const newIndex = Math.round(
                      event.nativeEvent.contentOffset.x / width
                    );
                    setCurrentPage(newIndex);
                  }}
                  style={{ marginTop: 10 }}
                />
                <View
                  style={{
                    position: "absolute",
                    end: 0,
                    top: width / 2,
                    elevation: 3,
                    marginEnd: 20,
                    borderRadius: 35 / 2,
                    backgroundColor: Colors.semantic_bg_muted.color,
                  }}
                >
                  <Pressable
                    onPress={I18nManager.isRTL ? scrollBack : scrollForward}
                  >
                    <Ionicons
                      name={I18nManager.isRTL ? "arrow-back" : "arrow-forward"}
                      size={35}
                    />
                  </Pressable>
                </View>

                <View
                  style={{
                    position: "absolute",
                    start: 0,
                    top: width / 2,
                    elevation: 3,
                    marginStart: 20,
                    borderRadius: 35 / 2,
                    backgroundColor: Colors.semantic_bg_muted.color,
                  }}
                >
                  <Pressable
                    onPress={I18nManager.isRTL ? scrollForward : scrollBack}
                  >
                    <Ionicons
                      name={I18nManager.isRTL ? "arrow-forward" : "arrow-back"}
                      size={35}
                    />
                  </Pressable>
                </View>
              </View>

              <View
                style={{
                  height: 1,
                  backgroundColor: Colors.semantic_bg_muted.color,
                  width: "100%",
                  flex: 1,
                  margin: 8,
                }}
              />
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  paddingHorizontal: 16,
                  marginTop: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={styles.productTitle}>
                      {store.product.name}
                    </Text>
                    <ProductPrice
                      price={store.product.price_range.minimum_price}
                    />
                  </View>
                  <Link
                    style={{
                      color: Colors.semantic_fg_link.color,
                      fontWeight: "600",
                    }}
                    push
                    href={{
                      pathname: "/search_result",
                      params: {
                        searchQuery: "ivi", // no products for this brands from the products list, hence mocking brand name
                      },
                    }}
                  >
                    {t(`explore_brand`)}
                  </Link>
                </View>
                <ProductInfo />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            elevation: 1,
            height: 60,
          }}
        >
          <Pressable
            onPress={() => {
              Alert.alert(t("added_title"), t("added_desc"), [
                { text: t("added_done") },
              ]);
            }}
          >
            <Text
              style={{
                color: Colors.white.color,
                backgroundColor: Colors.semantic_fg_icon.color,
                fontWeight: "bold",
                margin: 8,
                justifyContent: "center",
                height: 60,
                alignItems: "center",
                alignContent: "center",
                elevation: 1,
                borderTopRightRadius: 12,
                borderTopLeftRadius: 12,
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              {t("add_to_cart_title")}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  productTitle: {
    fontSize: 16,
    width: "100%",
    textAlign: "left",
    fontWeight: "bold",
    flex: 1,
  },
  scrollViewContentStyle: {
    alignItems: "center",
  },
  container: {
    paddingTop: 10,
    backgroundColor: Colors.white.color,
  },
  actionBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 4,
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
