import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DialogComponent from "./dialog";
import { Language } from "../language";
import { Colors } from "@/app/utils/styles";

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
  const [dialogVisible, setDialogVisible] = useState(false);

  const openDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

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
          <Ionicons
            name="chevron-back"
            size={24}
            color={Colors.semantic_fg_accent.color}
          />
        </TouchableOpacity>
      )}

      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <TouchableOpacity onPress={openDialog} style={styles.languageButton}>
        <Ionicons
          name="language-sharp"
          size={24}
          color={Colors.semantic_fg_accent.color}
        />
      </TouchableOpacity>
      <DialogComponent
        visible={dialogVisible}
        onClose={closeDialog}
        child={<Language />}
      />
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
    start: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  languageButton: {
    position: "absolute",
    end: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  titleContainer: {
    flex: 1,
    marginHorizontal: 32,
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
