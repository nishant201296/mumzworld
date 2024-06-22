import { Colors } from "@/app/utils/styles";
import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
interface CardProps {
  title: string;
  onClick: (cardTitle: string) => void;
  style: StyleProp<ViewStyle> | undefined;
}
export const Card = ({ title, onClick, style }: CardProps) => {
  const onCardClick = () => {
    onClick(title);
  };

  return (
    <Pressable onPress={onCardClick}>
      <View style={[styles.container, style]}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
    borderRadius: 8,
    padding: 8,
    backgroundColor: Colors.white.color,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.semantic_fg_text.color,
    textAlign: "center",
  },
});
