import React from "react";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
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
  const outlineBgColor =
    colorMode === "light" ? "rgba(0, 0, 0, 0.8)" : "rgba(220, 220, 220, 0.8)";
  const bgColor =
    colorMode === "light"
      ? [
          "rgba(242,241,245, 0)",
          "rgba(242,241,245, 0.40)",
          "rgba(242,241,245, 0.85)",
          "rgba(242,241,245, 0.99)",
          "rgba(242,241,245, 0.99)",
          "rgba(242,241,245, 0.99)",
          "rgb(242,241,245)",
        ]
      : [
          "rgba(0,0,0, 0)",
          "rgba(0,0,0, 0.40)",
          "rgba(0,0,0, 0.85)",
          "rgba(0,0,0, 0.90)",
          "rgba(0,0,0, 0.94)",
          "rgba(0,0,0, 0.99)",
          "rgb(0,0,0)",
        ];

  return (
    <View style={{ height: "100%" }}>
      <Tab.Navigator
        tabBar={(props) => (
          <>
            <LinearGradient
              colors={bgColor}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 100,
              }}
            />

            <BottomTabBar {...props} />
          </>
        )}
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: {
            color: textColor,
            paddingTop: 5,
          },
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "transparent",
            elevation: 0,
            borderTopWidth: 0,
            paddingTop: 10,
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
                <HomeIconOutline size={30} color={outlineBgColor} />
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
                <SearchIconOutline size={30} color={outlineBgColor} />
              ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Navbar;
