import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeIconOutline,
  HomeIconSolid,
  SearchIconOutline,
  SearchIconSolid,
} from "./icons";
import Home from "./home";
import Search from "./search";

const Tab = createBottomTabNavigator();

const Navbar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel: "",
        tabBarStyle: {
          height: 70, // Adjust height as needed
          backgroundColor: "transparent",
          borderColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="Homepage"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <HomeIconSolid size={30} color="black" />
            ) : (
              <HomeIconOutline size={30} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Searchpage"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SearchIconSolid size={30} color="black" />
            ) : (
              <SearchIconOutline size={30} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navbar;
