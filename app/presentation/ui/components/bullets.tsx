import { t } from "i18next";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface BulletPointsProps {
  points: string[];
  initialCount: number;
}
export const BulletPoints = ({ points, initialCount }: BulletPointsProps) => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const visiblePoints = showAll ? points : points.slice(0, initialCount);

  return (
    <View style={styles.container}>
      {visiblePoints.map((point, index) => {
        const isLastVisiblePoint =
          !showAll &&
          index === initialCount - 1 &&
          points.length > initialCount;
        return (
          <View style={{ flexDirection: "row" }} key={point + index}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>• </Text>
            <Text key={index} style={styles.bulletPoint}>
              {isLastVisiblePoint ? `${point}...` : point}
            </Text>
          </View>
        );
      })}
      <TouchableOpacity onPress={toggleShowAll}>
        <Text style={styles.readMore}>
          {showAll ? t("read_less") : t("read_more")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  bulletPoint: {
    fontSize: 12,
    marginVertical: 2,
    textAlignVertical: "center",
  },
  readMore: {
    color: "blue",
    marginTop: 8,
    textDecorationLine: "underline",
  },
});
