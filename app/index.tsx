import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Brands } from "./presentation/ui/brands";
import { Categories } from "./presentation/ui/categories";
import { Search } from "./presentation/ui/search";
import { Colors } from "./utils/styles";
import { Routes } from "./presentation/routes";

const Tab = createBottomTabNavigator();

const Index = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName={Routes.categories.name}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = "";
            switch (route.name) {
              case "Categories": {
                iconName = focused ? "grid-sharp" : "grid-outline";
                break;
              }
              case "Search": {
                iconName = focused ? "search-circle" : "search-circle-outline";
                break;
              }
              case "Brands": {
                iconName = focused ? "pricetags-sharp" : "pricetags-outline";
                break;
              }
            }

            return (
              <Ionicons
                name={iconName as keyof typeof Ionicons.glyphMap}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: Colors.semantic_fg_accent.color,
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            height: 60,
            elevation: 5,
            paddingBottom: 5,
          },
        })}
      >
        {Object.entries(Routes).map((entry) => {
          return (
            <Tab.Screen
              name={entry[1].name}
              component={entry[1].route}
              key={entry[0]}
            />
          );
        })}
      </Tab.Navigator>
    </View>
  );
};
export default Index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
