import { Slot, SplashScreen, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "./utils/styles";
import { ScreenRoutes } from "./presentation/routes";
import "../localization/i18n";
import { configureI18 } from "../localization/i18n";
import productStoreShared from "./presentation/stores/product_store";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAppReady, setAppReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await productStoreShared.fetchProducts();
        await configureI18();
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.appContainer}>
        <Stack
          initialRouteName={ScreenRoutes.home.route}
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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: Colors.white.color,
    flex: 1,
  },
});
