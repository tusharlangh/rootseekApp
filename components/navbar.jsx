import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorMode } from "native-base";
import {
  CreateIconOutline,
  CreateIconSolid,
  HomeIconOutline,
  HomeIconSolid,
  SearchIconOutline,
  SearchIconSolid,
} from "./icons";
import Home from "./home";
import Search from "./search";
import { View } from "react-native";
import Create from "./createpage/create";

const Tab = createBottomTabNavigator();

const Navbar = () => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "#F2F1F5" : "black";

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel: "",
        tabBarStyle: {
          height: 80,
          borderColor: colorMode === "light" ? "#D1D1D1" : "#2E2E36",
          paddingTop: 10,
          backgroundColor: bgColor,
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
      <Tab.Screen
        name="Creatpage"
        component={Create}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <CreateIconSolid size={30} color={textColor} />
            ) : (
              <CreateIconOutline size={30} color={textColor} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navbar;
