import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./home";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ThemeThread from "./themeThread/themeThread";

const HomeNavbar = () => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="theme_thread" component={ThemeThread} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default HomeNavbar;
