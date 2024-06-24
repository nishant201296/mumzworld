import { Colors } from "@/app/utils/styles";
import { capitalizeFirstLetter } from "@/app/utils/utils";
import { router } from "expo-router";
import { observer } from "mobx-react-lite";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Brand, Category } from "../../models/view_entities";
import { Card } from "./card";

const { width } = Dimensions.get("window");
const newNumColumns = width > 1200 ? 6 : width > 800 ? 5 : 3;
const itemWidth = (width - 10) / newNumColumns;
const itemHeight = itemWidth;

export const CategoryBrandListComponent: React.FC<{
  data: Category[] | Brand[];
  type: "brands" | "categories";
}> = observer(({ data, type }) => {
  if (!data.length) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  const keyExtractor = (item: Category | Brand, index: number) =>
    `${item}-${index}`;

  const onCardClick = (title: string) => {
    router.push({
      pathname: "/search_result",
      params: {
        searchQuery: title,
        searchIn: type,
        headerTitle: `${title}`,
      },
    });
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        data={data}
        numColumns={newNumColumns}
        removeClippedSubviews={true}
        getItemLayout={(_, index) => ({
          length: itemHeight - 10,
          offset: itemHeight * index,
          index,
        })}
        renderItem={({ item }) => (
          <Card
            imgUrl={item.imgUrl}
            title={capitalizeFirstLetter(item.name)}
            onClick={onCardClick}
            style={styles.cardStyle}
          />
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  cardStyle: {
    height: itemHeight - 10,
    width: itemWidth - 10,
    margin: 5,
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
