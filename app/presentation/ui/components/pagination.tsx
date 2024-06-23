import { Colors } from "@/app/utils/styles";
import React from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("screen");
interface PaginationProps<T> {
  size: number;
  scrollX: Animated.Value;
  index: number;
}
const Pagination = <T,>({ size, scrollX, index }: PaginationProps<T>) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: size }).map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: "clamp",
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ["#ccc", Colors.semantic_fg_icon.color, "#ccc"],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[styles.dot, { width: dotWidth, backgroundColor }]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 3,
    backgroundColor: "#ccc",
  },
  dotActive: {
    backgroundColor: Colors.semantic_fg_icon.color,
  },
});
