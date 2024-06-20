import { Slot, SplashScreen, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "./utils/styles";
import { ScreenRoutes } from "./presentation/routes";
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
      <Stack
        screenOptions={{
          headerShown: Platform.OS === "ios",
        }}
      >
        {Object.entries(ScreenRoutes).map((route) => {
          return (
            <Stack.Screen
              key={route[0]}
              options={{ title: route[1].name }}
              name={route[1].route}
            />
          );
        })}
      </Stack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: Colors.white.color,
    flex: 1,
  },
});
