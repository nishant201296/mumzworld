import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  ViewToken,
} from "react-native";
import Pagination from "./pagination";

interface SliderProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactElement | null;
  showPagingDots: boolean;
  style?: StyleProp<ViewStyle> | undefined;
}

const Slider = <T,>({
  data,
  renderItem,
  showPagingDots,
  style,
}: SliderProps<T>) => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      setIndex(viewableItems[0]?.index ?? 0);
    }
  ).current;

  const viewConfigRef = useRef({ itemVisiblePercentThreshold: 50 }).current;

  return (
    <View style={style}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => renderItem(item, index)}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewConfigRef}
      />
      {showPagingDots && (
        <Pagination size={data.length} scrollX={scrollX} index={index} />
      )}
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});
