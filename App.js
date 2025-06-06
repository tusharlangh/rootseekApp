import LoginNavigator from "./components/login-section/login-navigator";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navbar from "./components/navbar";
import { Box, NativeBaseProvider, extendTheme } from "native-base";
import { useState, useEffect, createContext } from "react";
import { Appearance } from "react-native";

const Stack = createNativeStackNavigator();

export const PhoneContext = createContext();

export default function App() {
  const [theme, setTheme] = useState({
    mode: "light",
  });

  const [usePhone, setUsePhone] = useState(true);

  const nativeBaseTheme = extendTheme({
    config: { initialColorMode: theme.mode },
  });

  return (
    <NativeBaseProvider theme={nativeBaseTheme}>
      <PhoneContext.Provider value={{ usePhone }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="User" component={LoginNavigator} />
            <Stack.Screen name="Navbar" component={Navbar} />
          </Stack.Navigator>
        </NavigationContainer>
      </PhoneContext.Provider>
    </NativeBaseProvider>
  );
}
