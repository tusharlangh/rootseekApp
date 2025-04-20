import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorMode } from "native-base";
import { View } from "react-native";
import {
  HomeIconOutline,
  HomeIconSolid,
  LibraryOutline,
  LibrarySolid,
  SearchIconOutline,
  SearchIconSolid,
  ShuffleIcon,
} from "./icons";
import Home from "./home";
import Search from "./search";
import { LinearGradient } from "expo-linear-gradient";

const Tab = createBottomTabNavigator();

const Navbar = () => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "#F2F1F5" : "black";

  return (
    <View style={{ height: "100%" }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: {
            color: textColor,
          },
          tabBarStyle: {
            height: 80,
            paddingTop: 10,
            backgroundColor: bgColor,
          },
        }}
      >
        <Tab.Screen
          name="Home"
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
          name="Search"
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
    </View>
  );
};

export default Navbar;
