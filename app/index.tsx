import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Brands } from "./presentation/ui/brands";
import { Categories } from "./presentation/ui/categories";
import { Search } from "./presentation/ui/search";

const Tab = createBottomTabNavigator();

const Index = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="Search"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = "";

            switch (route.name) {
              case "Categories": {
                iconName = focused ? "cog" : "home";
              }
              case "Search": {
                iconName = focused ? "cog" : "home";
              }
              case "Brands": {
                iconName = focused ? "cog" : "home";
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
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            height: 60,
            elevation: 5,
            paddingBottom: 5,
          },
        })}
      >
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Categories" component={Categories} />
        <Tab.Screen name="Brands" component={Brands} />
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
