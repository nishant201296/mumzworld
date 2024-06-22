import { router } from "expo-router";
import { observer } from "mobx-react-lite";
import { Dimensions, View, FlatList, Text, StyleSheet } from "react-native";
import { ProductStore } from "../../stores/product_store";
import { Card } from "./card";
import { Colors } from "@/app/utils/styles";
import { ActivityIndicator } from "react-native-paper";

const { width } = Dimensions.get("window");
const newNumColumns = width > 1200 ? 6 : width > 800 ? 5 : 3;
const itemWidth = (width - 10) / newNumColumns;
const itemHeight = itemWidth;

export const CategoryBrandListComponent: React.FC<{
  data: string[];
  title: string;
}> = observer(({ data, title }) => {
  if (!data.length) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  const keyExtractor = (item: string, index: number) => `${item}-${index}`;

  const onCardClick = (title: string) => {
    router.push({
      pathname: "/search_result",
      params: {
        searchQuery: title,
      },
    });
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text style={styles.title}>{title}</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        data={data}
        numColumns={newNumColumns}
        removeClippedSubviews={true}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        renderItem={({ item }) => (
          <Card title={item} onClick={onCardClick} style={styles.cardStyle} />
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  cardStyle: {
    height: itemHeight,
    width: itemWidth,
  },
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 1,
    backgroundColor: Colors.semantic_bg_subtle.color,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginVertical: 8,
    color: Colors.semantic_fg_text.color,
  },
});
