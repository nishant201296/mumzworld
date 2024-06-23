import { SplashScreen, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../localization/i18n";
import { configureI18 } from "../localization/i18n";
import { ScreenRoutes } from "./presentation/routes";
import productStoreShared from "./presentation/stores/product_store";
import CustomHeader from "./presentation/ui/components/header";
import { Colors } from "./utils/styles";
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
            header: (props) => {
              const routeName = props.route.name;
              const title =
                (props.route.params as { headerTitle?: string })?.headerTitle ??
                routeName;

              return (
                <CustomHeader
                  title={title}
                  navigation={props.navigation}
                  showBackIcon={true}
                  showHeader={routeName !== "index" && routeName !== "gallery"}
                />
              );
            },
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
