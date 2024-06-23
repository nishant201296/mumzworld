import { Colors } from "@/app/utils/styles";
import { t } from "i18next";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
          <View style={styles.bulletPointContainer} key={point + index}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text key={index} style={styles.bulletPointText}>
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
  bulletPointContainer: {
    flexDirection: "row",
  },
  bulletPoint: {
    marginEnd: 6,
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    padding: 8,
  },
  bulletPointText: {
    fontSize: 12,
    marginVertical: 2,
    textAlignVertical: "center",
  },
  readMore: {
    color: Colors.semantic_fg_link.color,
    marginTop: 8,
    textDecorationLine: "underline",
  },
});
