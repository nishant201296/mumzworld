import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CustomHeaderProps {
  title: string;
  navigation: NavigationProp<ParamListBase>;
  showBackIcon: boolean;
  showHeader: boolean;
}

const CustomHeader = ({
  title,
  navigation,
  showBackIcon = true,
  showHeader = true,
}: CustomHeaderProps) => {
  if (!showHeader) {
    return <></>;
  }
  return (
    <View style={styles.header}>
      {navigation.canGoBack() && showBackIcon && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#007BFF" />
        </TouchableOpacity>
      )}

      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    position: "absolute",
    left: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
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
});

export default CustomHeader;
