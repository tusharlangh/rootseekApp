import LoginNavigator from './components/login-section/login-navigator';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navbar from './components/navbar';
import { Box, NativeBaseProvider, extendTheme } from "native-base";
import { useState, useEffect } from 'react';
import { Appearance } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  const [theme, setTheme] = useState({ mode: Appearance.getColorScheme() || "light" });

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme({ mode: colorScheme || "light" });
    });

    return () => subscription.remove();
  }, []);

  const nativeBaseTheme = extendTheme({
    config: { initialColorMode: theme.mode },
  });

  return (
    <NativeBaseProvider theme={nativeBaseTheme}>
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="User" component={LoginNavigator} />
            <Stack.Screen name="Navbar" component={Navbar} />
          </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
