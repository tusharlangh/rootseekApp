import React, { createContext, useState } from "react";
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
import Library from "./libraryPage/library";
import { BlurView } from "expo-blur";

const Tab = createBottomTabNavigator();

export const RefreshValue = createContext();

const Navbar = () => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const outlineTextColor =
    colorMode === "light"
      ? "rgba(49, 49, 49, 0.8)"
      : "rgba(220, 220, 220, 0.8)";
  const bgColor =
    colorMode === "light"
      ? ["transparent", "rgba(242,241,245,0.1)", "rgb(242,241,245)"]
      : ["transparent", "rgba(0,0,0,0.9)", "black"];

  const [refreshValue, setRefreshValue] = useState(0);

  return (
    <View style={{ height: "100%" }}>
      <RefreshValue.Provider value={{ refreshValue, setRefreshValue }}>
        <Tab.Navigator
          tabBar={(props) => (
            <>
              <BlurView
                intensity={20}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 80,
                  backgroundColor:
                    colorMode === "light"
                      ? "rgba(247,247,249,0.95)"
                      : "rgba(0,0,0,0.86)",
                }}
              />

              <BottomTabBar {...props} />
            </>
          )}
          screenOptions={{
            headerShown: false,
            tabBarLabelStyle: {
              color: textColor,
              paddingRight: -10,
              textAlign: "center",
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
                  <HomeIconSolid size={24} color={textColor} />
                ) : (
                  <HomeIconOutline size={24} color={outlineTextColor} />
                ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={Search}
            options={{
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <SearchIconSolid size={24} color={textColor} />
                ) : (
                  <SearchIconOutline size={24} color={outlineTextColor} />
                ),
            }}
          />
          <Tab.Screen
            name="Library"
            component={Library}
            options={{
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <LibrarySolid size={24} color={textColor} />
                ) : (
                  <LibraryOutline size={24} color={outlineTextColor} />
                ),
            }}
          />
        </Tab.Navigator>
      </RefreshValue.Provider>
    </View>
  );
};

export default Navbar;
