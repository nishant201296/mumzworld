import Ionicons from "@expo/vector-icons/build/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TabRoutes } from "./presentation/routes";
import { Colors } from "./utils/styles";

const Tab = createBottomTabNavigator();

const Index = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName={TabRoutes.categories.name}
        screenOptions={() => ({
          headerShown: false,
          tabBarActiveTintColor: Colors.semantic_fg_accent.color,
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            height: 60,
            elevation: 5,
            paddingBottom: 5,
          },
        })}
      >
        {Object.entries(TabRoutes).map((entry) => {
          return (
            <Tab.Screen
              name={entry[1].name}
              component={entry[1].route}
              key={entry[0]}
              options={{
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName: string = "";
                  iconName = focused
                    ? entry[1].tabIcon.focused
                    : entry[1].tabIcon.unfocused;
                  return (
                    <Ionicons
                      name={iconName as keyof typeof Ionicons.glyphMap}
                      size={size}
                      color={color}
                    />
                  );
                },
              }}
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
