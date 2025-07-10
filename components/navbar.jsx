import React, { createContext, useCallback, useState } from "react";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Modal, Pressable, View } from "react-native";
import {
  CreateIcon,
  HomeIconOutline,
  HomeIconSolid,
  SearchIconOutline,
  SearchIconSolid,
} from "./icons";
import { LinearGradient } from "expo-linear-gradient";
import Create from "./createpage/create";
import Home from "./homeScreen/home";
import Search from "./searchScreen/search";
import RootBottomSheet from "./rootBottomSheet";

const Tab = createBottomTabNavigator();

export const RefreshValue = createContext();
export const GrowthTraceContext = createContext();

const Navbar = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const [growthTrace, setGrowthTrace] = useState(true);

  const textColor = "white";

  const outlineTextColor = "white";

  const [refreshValue, setRefreshValue] = useState(0);

  const iconSize = 24;

  const gradients = [
    "rgba(18,18,18,1)",
    "rgba(18,18,18,1)",
    "rgba(18,18,18,0.95)",
    "rgba(18,18,18,0.95)",
    "rgba(18,18,18,0.8)",
    "rgba(18,18,18,0.7)",
    "rgba(18,18,18,0.2)",
    "rgba(18,18,18,0.2)",
    "rgba(18,18,18,0)",
    "rgba(18,18,18,0)",
  ];

  return (
    <View style={{ height: "100%" }}>
      <RefreshValue.Provider value={{ refreshValue, setRefreshValue }}>
        <GrowthTraceContext.Provider value={{ growthTrace, setGrowthTrace }}>
          <Tab.Navigator
            tabBar={(
              props //tabBar prop is a given prop to fully customize the bottom navbar
            ) => (
              <>
                <LinearGradient
                  pointerEvents="none"
                  colors={gradients}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 200,
                  }}
                />

                <BottomTabBar {...props} />
              </>
            )}
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: true,
              tabBarLabelStyle: {
                paddingRight: -10,
                textAlign: "center",
                color: "white",
                marginTop: 2,
              },
              tabBarStyle: {
                position: "absolute",
                backgroundColor: "transparent",
                elevation: 0,
                paddingTop: 6,
                borderTopWidth: 0,
                borderTopColor: "transparent",
              },
            }}
          >
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    <HomeIconSolid size={iconSize} color={textColor} />
                  ) : (
                    <HomeIconOutline size={iconSize} color={outlineTextColor} />
                  ),
              }}
            />

            <Tab.Screen
              name="Search"
              component={Search}
              options={{
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    <SearchIconSolid size={iconSize} color={textColor} />
                  ) : (
                    <SearchIconOutline
                      size={iconSize}
                      color={outlineTextColor}
                    />
                  ),
              }}
            />
            <Tab.Screen
              name="Create"
              component={Home}
              options={{
                tabBarIcon: (props) => (
                  <Pressable
                    {...props}
                    onPress={() => setIsBottomSheetOpen(true)}
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <CreateIcon size={iconSize + 2} color={outlineTextColor} />
                  </Pressable>
                ),
              }}
            />
          </Tab.Navigator>
          <RootBottomSheet
            snapHeight="100%"
            isBottomSheetOpen={isBottomSheetOpen}
            setIsBottomSheetOpen={setIsBottomSheetOpen}
            enablePanDownToClose={false}
            ifHandleComponent={true}
          >
            <Create
              isBottomSheetOpen={isBottomSheetOpen}
              onClose={() => setIsBottomSheetOpen(false)}
            />
          </RootBottomSheet>
        </GrowthTraceContext.Provider>
      </RefreshValue.Provider>
    </View>
  );
};

export default Navbar;
