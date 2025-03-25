import LoginNavigator from './components/login-section/login-navigator';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navbar from './components/navbar';
import { NativeBaseProvider, extendTheme, StorageColorModeManager } from "native-base";

const config = {
  initialColorMode: 'light'
};

const extendedTheme = extendTheme({ config });

const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NativeBaseProvider theme={extendedTheme} colorModeManager={StorageColorModeManager}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="User" component={LoginNavigator} />
            <Stack.Screen name="Home" component={Navbar} />
          </Stack.Navigator>
        </NavigationContainer>
    </NativeBaseProvider>
  );
}