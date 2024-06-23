import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { ArrayData, PhotoGallery } from "react-native-photos-gallery";
import { Colors } from "./utils/styles";

const Gallery = () => {
  const { data } = useLocalSearchParams();

  return (
    <PhotoGallery
      data={JSON.parse(data as string) as ArrayData[]}
      onImageExpand={({ visible }) => console.log(visible)}
      animatedImageDelay={60}
      scaledImageResizeMode="contain"
      modalBackgroundStyle={styles.modalBackgroundStyle}
    />
  );
};

export default Gallery;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  modalBackgroundStyle: {
    backgroundColor: Colors.semantic_bg_white.color,
  },
});
