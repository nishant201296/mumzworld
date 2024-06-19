import { Slot, SplashScreen } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "./utils/styles";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAppReady, setAppReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
        setAppReady(true);
      }
    }

    prepare();
  }, []);
  if (!isAppReady) {
    return null;
  }

  return (
    <SafeAreaView style={styles.appContainer}>
      <Slot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: Colors.white.color,
    flex: 1,
  },
});
