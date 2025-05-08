import React, { createContext, useState } from "react";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { useColorMode } from "native-base";
import { Modal, Pressable, View } from "react-native";
import {
  CreateIcon,
  CreateIconOutline,
  CreateIconSolid,
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
import Create from "./createpage/create";

const Tab = createBottomTabNavigator();

export const RefreshValue = createContext();

const Navbar = () => {
  const [viewPostVisible, setViewPostVisible] = useState(false);

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
                intensity={100}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 80,
                  backgroundColor: "rgba(255,255,255,0.85)",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  shadowColor: "black",
                  shadowOffset: { width: 6, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 30,
                  elevation: 6,
                  overflow: "hidden",
                }}
              />

              <BottomTabBar {...props} />
            </>
          )}
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarLabelStyle: {
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
                  <HomeIconSolid size={26} color={textColor} />
                ) : (
                  <HomeIconOutline size={26} color={outlineTextColor} />
                ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={Search}
            options={{
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <SearchIconSolid size={26} color={textColor} />
                ) : (
                  <SearchIconOutline size={26} color={outlineTextColor} />
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
                  onPress={() => setViewPostVisible(true)}
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <CreateIcon size={28} color={outlineTextColor} />
                </Pressable>
              ),
            }}
          />
        </Tab.Navigator>
        <Modal
          visible={viewPostVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setViewPostVisible(false)}
        >
          <Create
            visible={viewPostVisible}
            onClose={() => setViewPostVisible(false)}
          />
        </Modal>
      </RefreshValue.Provider>
    </View>
  );
};

export default Navbar;
