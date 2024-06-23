import { Colors } from "@/app/utils/styles";
import { router } from "expo-router";
import { observer } from "mobx-react-lite";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Card } from "./card";
import { capitalizeFirstLetter } from "@/app/utils/utils";

const { width } = Dimensions.get("window");
const newNumColumns = width > 1200 ? 6 : width > 800 ? 5 : 3;
const itemWidth = (width - 10) / newNumColumns;
const itemHeight = itemWidth;

export const CategoryBrandListComponent: React.FC<{
  data: string[];
}> = observer(({ data }) => {
  if (!data.length) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  const keyExtractor = (item: string, index: number) => `${item}-${index}`;

  const onCardClick = (title: string) => {
    router.push({
      pathname: "/search_result",
      params: {
        searchQuery: title,
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
          length: itemHeight - 20,
          offset: itemHeight * index,
          index,
        })}
        renderItem={({ item }) => (
          <Card
            title={capitalizeFirstLetter(item)}
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
    height: itemHeight - 20,
    width: itemWidth - 20,
    margin: 10,
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
