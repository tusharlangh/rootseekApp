import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorMode } from "native-base";
import {
  HomeIconOutline,
  HomeIconSolid,
  SearchIconOutline,
  SearchIconSolid,
} from "./icons";
import Home from "./home";
import Search from "./search";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

const Navbar = () => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "white" : "#121212";

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel: "",
        tabBarStyle: {
          height: 70,
          backgroundColor: bgColor,
          borderColor: bgColor,
        },
      }}
    >
      <Tab.Screen
        name="Homepage"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <HomeIconSolid size={30} color={textColor} />
            ) : (
              <HomeIconOutline size={30} color={textColor} />
            ),
        }}
      />
      <Tab.Screen
        name="Searchpage"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SearchIconSolid size={30} color={textColor} />
            ) : (
              <SearchIconOutline size={30} color={textColor} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navbar;
